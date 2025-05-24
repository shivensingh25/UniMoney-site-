import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const LoanSanctioned = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb] p-4">
      <div className="max-w-3xl mx-auto pt-8">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-[#31D15A] rounded-full mx-auto flex items-center justify-center mb-6"
            >
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <h1 className="text-[#1A1A1A] text-3xl font-bold mb-4">
              Congratulations! Your Student Loan is Approved
            </h1>
            <p className="text-[#666666]">
              We're excited to support your educational journey with our best-in-class student loan
            </p>
          </div>

          {/* Loan Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#F8F9FF] p-6 rounded-xl">
              <h3 className="text-[#666666] text-sm mb-1">Approved Loan Amount</h3>
              <p className="text-[#4355FF] text-2xl font-bold">$50,000 USD</p>
            </div>
            <div className="bg-[#F1FFF4] border border-[#31D15A]/20 p-6 rounded-xl">
              <h3 className="text-[#1A8F35] text-sm mb-1">Special Student Rate</h3>
              <p className="text-[#1A8F35] text-2xl font-bold">8.00% p.a.</p>
              <p className="text-[#1A8F35] text-sm mt-1">vs Industry Avg: 11.5% p.a.</p>
            </div>
            <div className="bg-[#F8F9FF] p-6 rounded-xl">
              <h3 className="text-[#666666] text-sm mb-1">Flexible Loan Term</h3>
              <p className="text-[#4355FF] text-2xl font-bold">15 Years</p>
              <p className="text-[#666666] text-sm mt-1">with 4-year study period</p>
            </div>
            <div className="bg-[#F8F9FF] p-6 rounded-xl">
              <h3 className="text-[#666666] text-sm mb-1">Student-Friendly EMI</h3>
              <p className="text-[#4355FF] text-2xl font-bold">$345 USD</p>
              <p className="text-[#666666] text-sm mt-1">starts after graduation</p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-[#F8F9FF] rounded-xl p-6 mb-8">
            <h3 className="text-[#4355FF] font-semibold mb-4">Why Our Student Loan is Better:</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-4 h-4 text-[#4355FF]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 5.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 7.586l3.293-3.293a1 1 0 111.414 1.414z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#4355FF] font-medium">Lowest Interest Rate</p>
                  <p className="text-[#4355FF]/70 text-sm">Up to 3.5% lower than other lenders</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-4 h-4 text-[#4355FF]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 5.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 7.586l3.293-3.293a1 1 0 111.414 1.414z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#4355FF] font-medium">No Payments During Study</p>
                  <p className="text-[#4355FF]/70 text-sm">Focus on your education first</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-4 h-4 text-[#4355FF]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 5.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 7.586l3.293-3.293a1 1 0 111.414 1.414z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#4355FF] font-medium">No Hidden Fees</p>
                  <p className="text-[#4355FF]/70 text-sm">Zero processing or prepayment charges</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <svg className="w-4 h-4 text-[#4355FF]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.707 5.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 7.586l3.293-3.293a1 1 0 111.414 1.414z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#4355FF] font-medium">Merit Scholarships</p>
                  <p className="text-[#4355FF]/70 text-sm">Additional rate reduction for good grades</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Section */}
          <div>
            <h3 className="text-[#1A1A1A] font-semibold mb-4">Next Steps:</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#F8F9FF] text-[#4355FF] font-medium flex items-center justify-center">1</span>
                <p className="text-[#666666]">Our team will contact you within 24 hours</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#F8F9FF] text-[#4355FF] font-medium flex items-center justify-center">2</span>
                <p className="text-[#666666]">Complete loan agreement signing</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-[#F8F9FF] text-[#4355FF] font-medium flex items-center justify-center">3</span>
                <p className="text-[#666666]">Funds will be disbursed to your university</p>
              </div>
            </div>
          </div>

          {/* View Dashboard Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push('/loan-dashboard')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <FaChartLine />
              View Your Loan Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanSanctioned; 