import Image from 'next/image';
import { useState, useEffect } from 'react';
import WaitlistForm from './WaitlistForm';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// Particle component for background animation
const Particle = ({ delay, duration, size, color, x, y }: { delay: number; duration: number; size: number; color: string; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full opacity-20"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
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
  />
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
    size: 4 + Math.random() * 8,
    color: ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981'][Math.floor(Math.random() * 4)],
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
            color={particle.color}
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
                onClick={() => router.push('/loan-compare')}
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
                onClick={() => setIsWaitlistOpen(true)}
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
                {['Monash University', 'University of Melbourne', 'RMIT University'].map((university, index) => (
                  <motion.div 
                    key={university}
                    className="text-lg font-semibold text-gray-400 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 0.6, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 3.4 + (index * 0.2),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      opacity: 1,
                      color: "#4F46E5"
                    }}
                  >
                    {university}
                  </motion.div>
                ))}
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