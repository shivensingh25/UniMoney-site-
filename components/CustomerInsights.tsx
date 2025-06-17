import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const CustomerInsights = () => {
  const insights = [
    {
      title: "Deep frustration with current banking experience",
      description: "Students face numerous challenges with traditional banking systems that aren't designed for international education financing."
    },
    {
      title: "Forex loss is a common burden",
      description: "We lose both ways - while sending and receiving money, making education even more expensive."
    },
    {
      title: "Fast, digital, and transparent processes",
      description: "Students value modern, streamlined processes that keep them informed at every step."
    },
    {
      title: "Flexible repayment with clear terms",
      description: "Most want repayment flexibility & visibility on total payable amount upfront."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
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
            className="text-4xl font-bold text-center text-gray-900 mb-4"
            variants={fadeInUpVariants}
          >
            What International Students on Loans Are Saying
          </motion.h2>
          <motion.p 
            className="text-xl text-center text-gray-600 mb-16"
            variants={fadeInUpVariants}
          >
            Real experiences from students navigating international education financing
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <motion.div 
              className="relative"
              variants={fadeInUpVariants}
            >
              <div className="relative h-96 w-full">
                <Image
                  src="/insights/student-quote.png"
                  alt="Student Quote"
                  fill
                  priority
                  style={{ objectFit: 'contain' }}
                  className="rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-transparent to-gray-50 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.div>

            {/* Right side - Insights */}
            <div className="space-y-8">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-600">
                    {insight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerInsights; 