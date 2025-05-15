import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SocialProof = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partner Logos */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.h2 
            className="text-2xl font-bold text-center text-gray-900 mb-8"
            variants={fadeInUpVariants}
          >
            From the Students of
          </motion.h2>
          <div className="flex justify-center items-center space-x-12">
            <motion.div 
              className="relative w-64 h-32 group"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/partners/monash-logo-png.svg"
                alt="Monash University"
                fill
                style={{ objectFit: 'contain' }}
                className="filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
            <motion.div 
              className="relative w-64 h-32 group"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/partners/eship_portfolio_logo.jpeg"
                alt="Entrepreneurship Portfolio"
                fill
                style={{ objectFit: 'contain' }}
                className="filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof; 