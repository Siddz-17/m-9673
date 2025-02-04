import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

const RAGInterface = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file?.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsPdfLoaded(true);
    
    toast({
      title: "PDF processed successfully",
      description: "You can now ask questions about the document",
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    console.log("Query submitted:", query);
    toast({
      title: "Query submitted",
      description: "Processing your question...",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
          isDragActive ? "border-accent bg-accent/10" : "border-border",
          isProcessing && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {isProcessing ? (
            <>
              <Loader2 className="h-12 w-12 text-accent animate-spin" />
              <p className="text-secondary animate-pulse">Processing PDF...</p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-accent animate-bounce" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] bg-clip-text text-transparent">
                  Drop your PDF here
                </h3>
                <p className="text-secondary">
                  or click to select a file
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {isPdfLoaded && !isProcessing && (
        <form onSubmit={handleQuery} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question about your document..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="text-white">
              <Search className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RAGInterface;