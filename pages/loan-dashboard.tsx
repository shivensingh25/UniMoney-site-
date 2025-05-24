import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  FaWallet,
  FaChartLine,
  FaCalendarAlt,
  FaCreditCard,
  FaHistory,
  FaDownload,
  FaFileInvoiceDollar,
  FaChartPie,
  FaArrowLeft,
  FaUser
} from 'react-icons/fa';
import { useRouter } from 'next/router';

const LoanDashboard = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [imgError, setImgError] = useState(false);

  const loanDetails = {
    totalAmount: 50000,
    interestRate: 8.00,
    remainingBalance: 45000,
    nextPayment: 345,
    nextPaymentDate: '2024-04-15',
    totalPaid: 5000,
    paymentHistory: [
      { date: '2024-03-15', amount: 345, status: 'Paid' },
      { date: '2024-02-15', amount: 345, status: 'Paid' },
      { date: '2024-01-15', amount: 345, status: 'Paid' },
    ]
  };

  const expenses = [
    { category: 'Tuition', amount: 40000, color: '#4355FF' },
    { category: 'Books', amount: 2000, color: '#31D15A' },
    { category: 'Housing', amount: 6000, color: '#FF6B6B' },
    { category: 'Other', amount: 2000, color: '#FFD93D' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb] p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Account Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Remaining Balance</p>
                    <h3 className="text-2xl font-bold text-gray-900">${loanDetails.remainingBalance.toLocaleString()}</h3>
                    <p className="text-sm text-green-600">90% of loan remaining</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaWallet className="text-blue-600 text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Next Payment</p>
                    <h3 className="text-2xl font-bold text-gray-900">${loanDetails.nextPayment}</h3>
                    <p className="text-sm text-gray-600">Due {loanDetails.nextPaymentDate}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaCalendarAlt className="text-green-600 text-xl" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Repayment Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Repayment Progress</h3>
              <div className="h-4 bg-gray-200 rounded-full mb-4">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(loanDetails.totalPaid / loanDetails.totalAmount) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Paid: ${loanDetails.totalPaid.toLocaleString()}</span>
                <span>Total Loan: ${loanDetails.totalAmount.toLocaleString()}</span>
              </div>
            </motion.div>

            {/* Payment History */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
              <div className="space-y-4">
                {loanDetails.paymentHistory.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FaHistory className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">${payment.amount}</p>
                        <p className="text-sm text-gray-600">{payment.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Loan Details & Expenses */}
          <div className="space-y-6">
            {/* Loan Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium text-gray-900">{loanDetails.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Term</span>
                  <span className="font-medium text-gray-900">15 Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grace Period</span>
                  <span className="font-medium text-gray-900">4 Years</span>
                </div>
              </div>
            </motion.div>

            {/* Expense Breakdown */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
              <div className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: expense.color }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">{expense.category}</span>
                        <span className="font-medium text-gray-900">
                          ${expense.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(expense.amount / loanDetails.totalAmount) * 100}%`,
                            backgroundColor: expense.color 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <FaCreditCard className="text-2xl text-indigo-600 mb-2" />
                  <span className="text-sm text-gray-600">Make Payment</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <FaFileInvoiceDollar className="text-2xl text-indigo-600 mb-2" />
                  <span className="text-sm text-gray-600">View Statement</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDashboard; 