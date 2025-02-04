import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import RAGInterface from "@/components/RAGInterface";

const Index = () => {
  const [typingText, setTypingText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  const phrases = [
    "Summarizing Documents",
    "Extracting Key Insights",
    "Answering Your Questions",
    "Understanding Content",
  ];

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeText = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        currentText = currentPhrase.substring(0, currentIndex - 1);
        currentIndex--;
        typingSpeed = 50;
      } else {
        currentText = currentPhrase.substring(0, currentIndex + 1);
        currentIndex++;
        typingSpeed = 100;
      }

      setTypingText(currentText);

      if (!isDeleting && currentIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }

      setTimeout(typeText, typingSpeed);
    };

    const typingTimeout = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [currentPhraseIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <section className="relative overflow-hidden px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
              Understand your documents
              <br />
              <span className="bg-gradient-to-r from-[#9EE755] to-[#CFDD3C] bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            <p className="h-8 text-lg text-secondary mb-8">
              {typingText}
              <span className="animate-pulse">|</span>
            </p>
            <RAGInterface />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;