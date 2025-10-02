import Image from 'next/image';
import { useState, useEffect } from 'react';
import WaitlistForm from './WaitlistForm';
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
                  gtag.trackButtonClick('Join Waitlist', 'Hero Section');
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
                  Join Waitlist
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Trust Indicators with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.0, ease: "easeOut" }}
              className="pt-12"
            >
              <motion.p 
                className="text-sm text-gray-500 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 3.2 }}
              >
                Trusted by students from
              </motion.p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <motion.div 
                  className="relative px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-xl shadow-lg font-bold text-indigo-700 cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    borderColor: [
                      "rgb(199, 210, 254)",
                      "rgb(129, 140, 248)",
                      "rgb(199, 210, 254)"
                    ],
                    boxShadow: [
                      "0 4px 20px rgba(79, 70, 229, 0.1)",
                      "0 8px 40px rgba(79, 70, 229, 0.3)",
                      "0 4px 20px rgba(79, 70, 229, 0.1)"
                    ]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 3.4,
                    ease: "easeOut",
                    borderColor: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    boxShadow: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -4,
                    borderColor: "rgb(99, 102, 241)",
                    boxShadow: "0 12px 50px rgba(79, 70, 229, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-0"
                    animate={{
                      opacity: [0, 0.3, 0],
                      background: [
                        "linear-gradient(90deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1), rgba(59,130,246,0.1))",
                        "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1), rgba(99,102,241,0.1))",
                        "linear-gradient(270deg, rgba(59,130,246,0.1), rgba(99,102,241,0.1), rgba(139,92,246,0.1))"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0"
                    animate={{
                      x: ['-100%', '200%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.span
                    className="relative z-10 text-lg font-bold"
                    animate={{
                      color: [
                        "rgb(67, 56, 202)",
                        "rgb(99, 102, 241)", 
                        "rgb(67, 56, 202)"
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🎓 Monash University
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
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