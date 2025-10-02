import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendWaitlistEmail } from '@/lib/emailjs';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/router';
import * as gtag from '../utils/gtag';

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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize EmailJS (kept for sending notification emails, optional)
    emailjs.init('PYoFuUb5yNF4hZiXJ');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Save to Airtable via API route
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({} as any));
        const details = err?.details?.error?.message
          || (typeof err?.details === 'string' ? err.details : '')
          || (err?.details ? JSON.stringify(err.details) : '');
        const message = [err?.error || 'Failed to submit form', details]
          .filter(Boolean)
          .join(': ');
        throw new Error(message);
      }

      // Optionally send notification email via EmailJS (non-blocking)
      sendWaitlistEmail(formData).catch(() => {});
      
      // Track successful form submission
      gtag.trackFormSubmission('Waitlist Form');
      gtag.event({
        action: 'conversion',
        category: 'engagement',
        label: 'Waitlist Signup',
        value: 1
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
        setSubmitSuccess(false);
        // Reset form
        setFormData({
          email: '',
          hardestPart: '',
          fromCountry: '',
          university: '',
        });
        if (router.pathname !== '/hidden-cta') {
          router.push('/data-acquisition');
        }
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
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
              Initial Approval
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="hardestPart" className="block text-lg font-medium text-gray-900 mb-2">
                  What's been the hardest part of getting a student loan?
                </label>
                <select
                  id="hardestPart"
                  name="hardestPart"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white text-gray-900"
                  value={formData.hardestPart}
                  onChange={handleChange}
                >
                  <option value="" className="text-gray-500">Select an option</option>
                  <option value="eligibility" className="text-gray-900">Strict eligibility requirements</option>
                  <option value="forex" className="text-gray-900">Forex and currency volatility</option>
                  <option value="interest" className="text-gray-900">High interest rates</option>
                  <option value="process" className="text-gray-900">Complex and slow processes</option>
                  <option value="limited" className="text-gray-900">Limited options for countries/courses</option>
                  <option value="repayment" className="text-gray-900">Repayment pressure</option>
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  value={formData.fromCountry}
                  onChange={handleChange}
                  placeholder="Enter your country"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="Enter university name"
                />
              </div>

              {submitError && (
                <p className="text-red-600 text-center">{submitError}</p>
              )}

              {submitSuccess && (
                <p className="text-green-600 text-center">Thank you for joining the waitlist!</p>
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
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
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