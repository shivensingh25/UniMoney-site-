import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheck, FaSpinner } from 'react-icons/fa';

interface NewsletterFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title = "Stay Updated with UniMoney",
  description = "Get the latest articles and insights on student finance delivered to your inbox.",
  buttonText = "Subscribe",
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Simulate API call - replace with actual newsletter signup endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, we'll just simulate success
      // In a real app, you'd integrate with a service like Mailchimp, ConvertKit, etc.
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      // Reset error after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <FaEnvelope className="text-white text-2xl" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">
          {title}
        </h3>
        <p className="text-indigo-100 mb-6 max-w-md mx-auto">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  status === 'error' ? 'ring-2 ring-red-400' : ''
                }`}
              />
              {status === 'success' && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaCheck className="text-green-600" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                status === 'success'
                  ? 'bg-green-500 text-white cursor-default'
                  : status === 'loading'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-indigo-600 hover:bg-gray-100'
              }`}
            >
              {status === 'loading' && <FaSpinner className="animate-spin" />}
              {status === 'success' && <FaCheck />}
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : buttonText}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm max-w-md mx-auto ${
                status === 'error' 
                  ? 'text-red-200 bg-red-500 bg-opacity-20 p-3 rounded-lg' 
                  : status === 'success'
                  ? 'text-green-200 bg-green-500 bg-opacity-20 p-3 rounded-lg'
                  : 'text-indigo-100'
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>

        <p className="text-xs text-indigo-200 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </div>
  );
};

export default NewsletterForm;