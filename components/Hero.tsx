import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import WaitlistForm from './WaitlistForm';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const TypewriterText = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const hasCompletedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (hasCompletedRef.current) return;

    let currentIndex = 0;
    setCurrentText('');
    
    intervalRef.current = setInterval(() => {
      if (currentIndex <= text.length) {
        setCurrentText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, onComplete]);

  return (
    <span>
      {currentText}
      <span className="border-r-2 border-indigo-600 animate-cursor" />
    </span>
  );
};

const Hero = () => {
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Subtle animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] -top-32 -left-32 bg-[#81c784] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute w-[500px] h-[500px] -bottom-32 -right-32 bg-[#66bb6a] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center space-y-12">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                <TypewriterText 
                  text="Facing problems securing loans to study abroad?"
                  onComplete={() => setIsTypingDone(true)}
                />
              </h1>
            </div>

            <div className={`text-xl sm:text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto transition-all duration-1000 ${
              isTypingDone ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-center">Find the loan tailored to</span>
                  <motion.div 
                    className="relative w-12 h-12 inline-block"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Image
                      src={imgError ? "/brand/logo/logo.png" : "/brand/logo/Logo.png"}
                      alt="UniMoney Logo"
                      fill
                      className="object-contain"
                      priority
                      onError={() => setImgError(true)}
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${
              isTypingDone ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}>
              <button 
                id="cta-button"
                onClick={() => {
                  setIsWaitlistOpen(true);
                }}
                className="group relative inline-flex items-center justify-center bg-indigo-600 text-white font-medium py-4 px-8 rounded-full text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <span className="relative z-10">Join the waitlist</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <WaitlistForm 
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </div>
  );
};

export default Hero; 