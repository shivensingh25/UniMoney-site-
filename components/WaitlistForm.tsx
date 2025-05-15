import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistForm = ({ isOpen, onClose }: WaitlistFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    hardestPart: '',
    fromCountry: '',
    university: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      onClose();
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Join the Waitlist
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="hardestPart" className="block text-lg font-medium text-gray-900 mb-2">
                  What's been the hardest part of getting a student loan?
                </label>
                <select
                  id="hardestPart"
                  name="hardestPart"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.hardestPart}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="eligibility">Strict eligibility requirements</option>
                  <option value="forex">Forex and currency volatility</option>
                  <option value="interest">High interest rates</option>
                  <option value="process">Complex and slow processes</option>
                  <option value="limited">Limited options for countries/courses</option>
                  <option value="repayment">Repayment pressure</option>
                </select>
              </div>

              <div>
                <label htmlFor="fromCountry" className="block text-lg font-medium text-gray-900 mb-2">
                  From Country
                </label>
                <input
                  type="text"
                  id="fromCountry"
                  name="fromCountry"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.fromCountry}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="university" className="block text-lg font-medium text-gray-900 mb-2">
                  University (Current/Intended)
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-center">{submitError}</p>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistForm; 