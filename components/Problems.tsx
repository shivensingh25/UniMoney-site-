import { FaPercentage, FaExchangeAlt, FaClock, FaFileAlt, FaLinkedin, FaInstagram, FaDollarSign, FaPiggyBank, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description, delay }) => {
  return (
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
            delay: delay * 0.2
          }
        }
      }}
      whileHover={{ scale: 1.03 }}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-4xl text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Problems = () => {
  const problems = [
    {
      icon: <FaPercentage />,
      title: "High Interest Rates",
      description: "Traditional banks in many countries charge international students steep interest rates — often 11.5–14% — making education loans unaffordable for many deserving students."
    },
    {
      icon: <FaExchangeAlt />,
      title: "Currency Volatility",
      description: "Exchange rates keep changing, making it hard to predict how much you'll actually pay back — especially over long loan periods."
    },
    {
      icon: <FaFileAlt />,
      title: "Complex and Slow Process",
      description: "Applications require piles of documents, lengthy verifications, and can take weeks or even months — just to get a response."
    },
    {
      icon: <FaClock />,
      title: "Difficult Loan Repayment",
      description: "Rigid repayment schedules don't account for job delays or visa issues — students often struggle to keep up after graduating."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Current Student Loans Don't Work
          </h2>
          <p className="text-xl text-gray-600">
            Understanding the challenges international students face
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
              delay={index}
            />
          ))}
        </div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-24 text-center"
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Save on Forex</h3>
              <p className="text-lg text-gray-600">Save on forex both while getting a loan and repaying it, with our competitive exchange rates</p>
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Better Rates</h3>
              <p className="text-lg text-gray-600">Competitive interest rates that make your education more affordable and your dreams achievable</p>
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fast Process</h3>
              <p className="text-lg text-gray-600">Quick and efficient online process with minimal documentation, saving you valuable time</p>
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