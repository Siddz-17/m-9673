import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import RAGInterface from "@/components/RAGInterface";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const navigate = useNavigate();
  
  const phrases = [
    "Summarizing Documents",
    "Extracting Key Insights",
    "Answering Your Questions",
    "Understanding Content",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      
      <main className="pt-16">
        <section className="relative overflow-hidden px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary dark:text-white mb-6">
              Understand your documents
              <br />
              <span className="bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            <div className="h-8 overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateY(-${currentPhraseIndex * 2}rem)`,
                }}
              >
                {phrases.map((phrase, index) => (
                  <p
                    key={index}
                    className="h-8 text-lg text-secondary dark:text-gray-300"
                  >
                    {phrase}
                  </p>
                ))}
              </div>
            </div>
            <RAGInterface />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;