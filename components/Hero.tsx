import Image from 'next/image';
import { useState, useEffect } from 'react';
import WaitlistForm from './WaitlistForm';
import SlidingBankLogos from './SlidingBankLogos';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import * as gtag from '../utils/gtag';

// Particle component for background animation with UniMoney logos
const Particle = ({ delay, duration, size, x, y }: { delay: number; duration: number; size: number; x: number; y: number }) => (
  <motion.div
    className="absolute opacity-20"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <Image
      src="/brand/logo/Logo.png"
      alt="UniMoney Logo"
      fill
      className="object-contain"
    />
  </motion.div>
);

const Hero = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Track mouse movement for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 4,
    size: 16 + Math.random() * 16,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Particle System Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            size={particle.size}
            x={particle.x}
            y={particle.y}
          />
        ))}
      </div>

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 -top-48 -left-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative min-h-screen z-10">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center space-y-8">
            {/* Main Headline with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Find the perfect loan for your
                </motion.span>
                <motion.span 
                  className="block text-indigo-600"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(99, 102, 241, 0.3)"
                  }}
                >
                  study abroad journey
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subtext with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto"
            >
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.0 }}
                whileHover={{ 
                  scale: 1.02,
                  color: "#4F46E5"
                }}
              >
                Compare loans from top lenders and get quotes easily.
              </motion.p>
            </motion.div>

            {/* CTA Buttons with Magnetic Effect */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button 
                onClick={() => {
                  gtag.trackButtonClick('Compare Loans', 'Hero Section');
                  router.push('/loan-compare');
                }}
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg text-lg shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 20px rgba(99, 102, 241, 0.2)",
                    "0 15px 30px rgba(99, 102, 241, 0.3)",
                    "0 10px 20px rgba(99, 102, 241, 0.2)"
                  ]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ color: "#ffffff" }}
                >
                  Compare Loans
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button 
                onClick={() => {
                  gtag.trackButtonClick('Be a beta tester', 'Hero Section');
                  setIsWaitlistOpen(true);
                }}
                className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg text-lg border-2 border-indigo-600 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#4F46E5",
                  color: "#ffffff",
                  borderColor: "#4F46E5",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ color: "#ffffff" }}
                >
                  Be a beta tester
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Sliding Bank Logos Section - Moved here right after buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
              className="mt-16"
            >
              <SlidingBankLogos />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Section */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-purple-200/15 to-pink-200/15 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              className="relative inline-block mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 3.2 }}
            >
              {/* Glowing background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 via-purple-200/40 to-blue-200/30 rounded-lg blur-sm"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Text with gradient and shadow */}
              <motion.p 
                className="relative text-lg font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent px-4 py-2"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 100%",
                  textShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                }}
              >
                Trusted by students from
              </motion.p>
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400"
                initial={{ width: 0, x: "-50%" }}
                animate={{ 
                  width: ["0%", "80%", "0%"],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3.5
                }}
              />
              
              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full"
                animate={{
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
              />
              <motion.div
                className="absolute -top-1 -left-3 w-1.5 h-1.5 bg-indigo-400 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  y: [0, -10, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4.5
                }}
              />
            </motion.div>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <motion.div 
                className="relative px-8 py-4 bg-gradient-to-br from-white/90 via-blue-50/80 to-indigo-50/90 backdrop-blur-lg border-2 border-indigo-200/50 rounded-2xl shadow-xl font-bold text-indigo-700 cursor-pointer overflow-hidden group"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 3.4,
                  ease: "easeOut",
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -8,
                  boxShadow: "0 20px 60px rgba(79, 70, 229, 0.3)",
                  borderColor: "rgb(99, 102, 241)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/10 to-blue-500/5"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    background: [
                      "linear-gradient(90deg, rgba(99,102,241,0.05), rgba(139,92,246,0.1), rgba(59,130,246,0.05))",
                      "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05), rgba(99,102,241,0.05))",
                      "linear-gradient(270deg, rgba(59,130,246,0.05), rgba(99,102,241,0.05), rgba(139,92,246,0.1))"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Enhanced shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-200/40 to-transparent -skew-x-12"
                  animate={{
                    x: ['-150%', '250%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={{
                    borderColor: [
                      "rgba(99, 102, 241, 0.2)",
                      "rgba(99, 102, 241, 0.6)",
                      "rgba(139, 92, 246, 0.6)",
                      "rgba(99, 102, 241, 0.2)"
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.span
                  className="relative z-10 text-xl font-bold flex items-center gap-2"
                  animate={{
                    color: [
                      "rgb(67, 56, 202)",
                      "rgb(99, 102, 241)", 
                      "rgb(139, 92, 246)",
                      "rgb(67, 56, 202)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🎓
                  </motion.span>
                  Monash University
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
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