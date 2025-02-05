
from fastapi import FastAPI, File, UploadFile, HTTPException
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from nomic.embed import EmbedText
from langchain.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from typing import List

# Initialize FastAPI
app = FastAPI(title="RAG API Service", version="0.1.0")

# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize embeddings
embed_model = EmbedText(
    model_name="nomic-embed-text-v1.5",
    embedding_dim=768
)

# Global vector store instance
vector_store = None

def get_pdf_text(pdf_files: List[UploadFile]):
    """Extracts text from uploaded PDF files."""
    text = ""
    for pdf_file in pdf_files:
        pdf_reader = PdfReader(pdf_file.file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text: str):
    """Splits extracted text into manageable chunks."""
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def create_vector_store(text_chunks: List[str]):
    """Creates and stores a FAISS vector store from text chunks"""
    global vector_store
    embeddings = [embed_model.embed(chunk) for chunk in text_chunks]
    vector_store = FAISS.from_texts(text_chunks, embeddings)
    return vector_store

def get_conversational_chain():
    """Sets up conversational chain using Groq LLM"""
    prompt_template = """
    Answer the question as detailed as possible from the provided context. If the answer is not in
    the provided context, just say, "answer is not available in the context." Do not provide incorrect answers.

    Context:
    {context}

    Question:
    {question}

    Answer:
    """
    
    model = ChatGroq(
        temperature=0.3,
        model_name="deepseek-r1-distill-llama-70b",
        groq_api_key=groq_api_key
    )
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    return load_qa_chain(model, chain_type="stuff", prompt=prompt)

@app.post("/upload-pdfs/")
async def process_pdfs(files: List[UploadFile] = File(...)):
    """Endpoint for processing PDF files"""
    try:
        # Validate PDF files
        for file in files:
            if file.content_type != "application/pdf":
                raise HTTPException(400, "Only PDF files are accepted")
        
        # Process PDFs
        raw_text = get_pdf_text(files)
        text_chunks = get_text_chunks(raw_text)
        create_vector_store(text_chunks)
        
        return {
            "status": "success",
            "message": f"Processed {len(files)} PDF(s)",
            "chunks": len(text_chunks)
        }
        
    except Exception as e:
        raise HTTPException(500, f"Processing failed: {str(e)}")

@app.post("/ask/")
async def ask_question(question: str):
    """Endpoint for handling questions"""
    global vector_store
    if not vector_store:
        raise HTTPException(400, "No processed documents available. Upload PDFs first.")
    
    try:
        # Search for relevant documents
        docs = vector_store.similarity_search(question)
        
        # Get answer
        chain = get_conversational_chain()
        response = chain(
            {"input_documents": docs, "question": question},
            return_only_outputs=True
        )
        
        return {
            "question": question,
            "answer": response['output_text'],
            "sources": [doc.metadata for doc in docs[:3]]
        }
        
    except Exception as e:
        raise HTTPException(500, f"Error generating answer: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
