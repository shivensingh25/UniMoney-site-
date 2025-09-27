import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is UniMoney and how does it work?",
      answer: "UniMoney is a platform that helps students find and compare education loans for studying abroad. We connect you with multiple lenders and provide personalized loan recommendations based on your profile, university, and financial situation."
    },
    {
      question: "Which universities and countries are supported?",
      answer: "We support loans for universities in Australia, Canada, UK, USA, and other major study destinations. Our platform works with universities like Monash University, University of Melbourne, RMIT University, and many more."
    },
    {
      question: "What types of loans are available?",
      answer: "We offer various types of education loans including secured loans (with collateral), unsecured loans, loans with cosigners, and international student loans. Each option has different interest rates, processing fees, and eligibility criteria."
    },
    {
      question: "How much can I borrow?",
      answer: "Loan amounts vary by lender and typically range from ₹5 lakhs to ₹1 crore. The exact amount depends on your course, university, family income, and whether you have collateral or a cosigner."
    },
    {
      question: "What documents do I need?",
      answer: "Common documents include university admission letter, academic transcripts, proof of income, bank statements, identity proof, and address proof. Specific requirements may vary by lender."
    },
    {
      question: "How long does the approval process take?",
      answer: "Approval times vary by lender, typically ranging from 3-15 days. Some lenders offer faster approvals for pre-approved students or those with strong profiles."
    },
    {
      question: "What are the interest rates?",
      answer: "Interest rates typically range from 9% to 16% per annum, depending on the loan type, your profile, and market conditions. Secured loans generally have lower rates than unsecured loans."
    },
    {
      question: "Is UniMoney free to use?",
      answer: "Yes, UniMoney is completely free for students. We don't charge any fees for our comparison service. Lenders may have their own processing fees and charges."
    },
    {
      question: "Can I apply for multiple loans?",
      answer: "Yes, you can apply to multiple lenders simultaneously. However, we recommend being selective and only applying to loans that best match your profile to avoid unnecessary credit inquiries."
    },
    {
      question: "What if I don't have collateral or a cosigner?",
      answer: "Many lenders offer unsecured loans for students without collateral or cosigners. These loans typically have higher interest rates but are designed specifically for students pursuing education abroad."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about education loans and our platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-indigo-100 mb-6">
            Our team is here to help you find the best loan options for your education journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-colors duration-200">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default FAQ;
