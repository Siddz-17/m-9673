import Navigation from "@/components/Navigation";
import RAGInterface from "@/components/RAGInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <section className="relative overflow-hidden px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
              Understand your documents
              <br />
              <span className="bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] bg-clip-text text-transparent animate-pulse">
                with AI
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-secondary mb-8 animate-fade-in">
              Upload your PDFs and get instant answers to your questions using advanced AI technology.
            </p>
            <RAGInterface />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;