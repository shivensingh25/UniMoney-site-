import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    label: 'Data Request',
    description: 'UniMoney requests your academic and financial data.',
    icon: '/file.svg',
  },
  {
    label: 'Upload Documents',
    description: 'Upload your documents securely for review.',
    icon: '/window.svg',
  },
  {
    label: 'Risk Assessment',
    description: 'Our model assesses your profile for eligibility.',
    icon: '/globe.svg',
  },
  {
    label: 'Loan Approved',
    description: 'Congratulations! Your loan is approved.',
    icon: '/brand/logo/Logo.png',
  },
  {
    label: 'Disbursement',
    description: 'Funds are sent directly to your university.',
    icon: '/file.svg',
  },
  {
    label: 'Repayment',
    description: 'Repay flexibly after graduation.',
    icon: '/window.svg',
  },
];

const AppDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2200);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="w-full max-w-md h-72 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full h-full flex flex-col items-center justify-center"
        >
          <div className="relative w-32 h-32 mb-6">
            <Image
              src={steps[currentStep].icon}
              alt={steps[currentStep].label}
              fill
              className="object-contain rounded-xl shadow-lg bg-white"
            />
          </div>
          <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
            {steps[currentStep].label}
          </h3>
          <p className="text-lg text-gray-700 text-center max-w-xs">
            {steps[currentStep].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AppDemo; 