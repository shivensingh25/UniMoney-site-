import { useState } from 'react';

const SurveyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    hardestPart: '',
    otherReason: '',
    fromCountry: '',
    studyCountry: ''
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#98c098] p-8 rounded-2xl w-full max-w-2xl mx-4">
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
              className="w-full px-4 py-3 rounded-full bg-[#2f2b3a] text-white"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="hardestPart" className="block text-lg font-medium text-gray-900 mb-2">
              What's been the hardest part of getting or dealing with a loan for studying abroad?
            </label>
            <select
              id="hardestPart"
              name="hardestPart"
              className="w-full px-4 py-3 rounded-full bg-[#2f2b3a] text-white"
              value={formData.hardestPart}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="eligibility">Strict eligibility requirements- Collateral/Cosigner dependency</option>
              <option value="forex">Forex and currency volatility</option>
              <option value="interest">High interest rates</option>
              <option value="process">Complex and slow processes</option>
              <option value="limited">Limited options for countries/courses</option>
              <option value="repayment">Repayment pressure</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.hardestPart === 'other' && (
            <div>
              <label htmlFor="otherReason" className="block text-lg font-medium text-gray-900 mb-2">
                If selected other, please mention your reason
              </label>
              <input
                type="text"
                id="otherReason"
                name="otherReason"
                className="w-full px-4 py-3 rounded-full bg-[#2f2b3a] text-white"
                value={formData.otherReason}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label htmlFor="fromCountry" className="block text-lg font-medium text-gray-900 mb-2">
              Which country are you from?
            </label>
            <input
              type="text"
              id="fromCountry"
              name="fromCountry"
              className="w-full px-4 py-3 rounded-full bg-[#2f2b3a] text-white"
              value={formData.fromCountry}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="studyCountry" className="block text-lg font-medium text-gray-900 mb-2">
              Which country do you study/want to study?
            </label>
            <input
              type="text"
              id="studyCountry"
              name="studyCountry"
              className="w-full px-4 py-3 rounded-full bg-[#2f2b3a] text-white"
              value={formData.studyCountry}
              onChange={handleChange}
            />
          </div>

          {submitError && (
            <div className="text-red-600 text-center font-medium">
              {submitError}
            </div>
          )}

          <div className="flex justify-center pt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-semibold py-4 px-8 rounded-full text-xl transition duration-300 hover:bg-gray-600"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2f2b3a] text-white font-semibold py-4 px-12 rounded-full text-xl transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Coming Soon
          </p>
          
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Join the Waitlist
          </button>
        </div>
      </div>

      <SurveyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HowItWorks; 