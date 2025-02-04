import Navigation from "@/components/Navigation";
import { ArrowRight, BookOpen, Search, Zap } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      
      <main className="pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary dark:text-white mb-8">
            How DocsAI Works
          </h1>
          
          <div className="grid gap-8">
            <div className="p-6 rounded-lg border border-border dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-primary dark:text-white">1. Document Processing</h2>
              </div>
              <p className="text-secondary dark:text-gray-300">
                Upload your PDF documents through our intuitive interface. Our AI system processes and analyzes the content, breaking it down into meaningful segments.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-8 w-px bg-border dark:bg-gray-800" />
              <ArrowRight className="absolute left-1/2 -translate-x-1/2 top-8 text-accent" />
            </div>

            <div className="p-6 rounded-lg border border-border dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-primary dark:text-white">2. AI Understanding</h2>
              </div>
              <p className="text-secondary dark:text-gray-300">
                Our advanced AI models understand the context and relationships within your documents, creating a knowledge base that can be easily queried.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 h-8 w-px bg-border dark:bg-gray-800" />
              <ArrowRight className="absolute left-1/2 -translate-x-1/2 top-8 text-accent" />
            </div>

            <div className="p-6 rounded-lg border border-border dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Search className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-primary dark:text-white">3. Interactive Queries</h2>
              </div>
              <p className="text-secondary dark:text-gray-300">
                Ask questions naturally, and receive accurate answers drawn directly from your documents. The AI provides relevant context and citations for every response.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;