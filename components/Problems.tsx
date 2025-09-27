import { FaExchangeAlt, FaLinkedin, FaInstagram, FaPiggyBank, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Problems = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.2
                  }
                }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl text-indigo-600 mb-6 flex justify-center">
                <FaExchangeAlt />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Faster process</h3>
              <p className="text-lg text-gray-600">Fill out one simple form and instantly get matched with multiple loan options.</p>
            </motion.div>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.4
                  }
                }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl text-indigo-600 mb-6 flex justify-center">
                <FaPiggyBank />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transparent comparison</h3>
              <p className="text-lg text-gray-600">Compare lenders side-by-side with clear terms and no hidden catches.</p>
            </motion.div>
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.6
                  }
                }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl text-indigo-600 mb-6 flex justify-center">
                <FaBolt />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Higher approval odds</h3>
              <p className="text-lg text-gray-600">Smart matching boosts your chances of getting approved for the right loan.</p>
            </motion.div>
        </div>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-24 flex justify-center items-center space-x-6"
        >
          <motion.a 
            href="https://www.linkedin.com/company/uni-money/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-4xl text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/unimoneyy_/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-4xl text-gray-600 hover:text-pink-600 transition-colors duration-300"
          >
            <FaInstagram />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Problems; 