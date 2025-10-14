import { motion } from 'framer-motion';

const SlidingBankLogos = () => {
  const bankLogos = [
    { name: 'Bank 1', logo: '/banks/image-1759926263439.png' },
    { name: 'Bank 2', logo: '/banks/image-1759926291416.png' },
    { name: 'Bank 3', logo: '/banks/image-1759926327484.png' },
    { name: 'Bank 4', logo: '/banks/image-1759926344619.png' },
    { name: 'Bank 5', logo: '/banks/image-1759926361495.png' },
    { name: 'IDFC FIRST Bank', logo: '/banks/idfc logo.png' },
  ];

  // Triple the array for seamless infinite scroll
  const duplicatedLogos = [...bankLogos, ...bankLogos, ...bankLogos];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50 py-16 overflow-hidden">
      <div className="relative">
        {/* Enhanced gradient overlays matching the main background */}
        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-blue-50 via-blue-50/80 to-transparent z-10"></div>
        
        {/* Floating background elements for extra visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-slate-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Enhanced sliding container with perspective */}
        <motion.div
          className="flex items-center gap-24 transform-gpu"
          animate={{
            x: [0, -1400], // Increased distance for smoother animation
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Slower for better viewing
              ease: "linear",
            },
          }}
          style={{
            width: 'fit-content',
            perspective: '1000px',
          }}
        >
          {duplicatedLogos.map((bank, index) => (
            <motion.div
              key={`${bank.name}-${index}`}
              className="flex-shrink-0 w-48 h-24 relative group cursor-pointer"
              animate={{
                scale: [1, 1.15, 1],
                y: [0, -12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (index % 6) * 0.7, // Updated for 6 logos with slightly faster stagger
                ease: "easeInOut",
              }}
              whileHover={{ 
                scale: 1.2,
                y: -15,
                rotateY: 5,
                z: 50
              }}
            >
              {/* Enhanced glow effect background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-xl blur-lg"
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (index % 5) * 0.8,
                  ease: "easeInOut",
                }}
              />
              
              {/* Enhanced logo container with blue glass effect */}
              <motion.div
                className="relative w-full h-full bg-gradient-to-br from-blue-100/60 via-white/80 to-indigo-100/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200/40 p-4 overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 4px 20px rgba(59, 130, 246, 0.1)",
                    "0 8px 30px rgba(59, 130, 246, 0.3)",
                    "0 4px 20px rgba(59, 130, 246, 0.1)"
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (index % 5) * 0.8,
                  ease: "easeInOut",
                }}
                whileHover={{
                  background: "linear-gradient(135deg, rgba(147, 197, 253, 0.8), rgba(255, 255, 255, 0.9), rgba(196, 181, 253, 0.8))",
                  boxShadow: "0 12px 40px rgba(59, 130, 246, 0.4)",
                }}
              >
                {/* Enhanced shimmer effect with blue tint */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent -skew-x-12"
                  animate={{
                    x: ['-100%', '200%'],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (index % 5) * 0.8,
                    ease: "easeInOut"
                  }}
                />
                
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-full h-full object-contain transition-all duration-500"
                  style={{
                    filter: 'grayscale(40%) contrast(1.1) brightness(1.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) contrast(1.3) brightness(1.2) saturate(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(40%) contrast(1.1) brightness(1.05)';
                  }}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">
                  {bank.name}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SlidingBankLogos;