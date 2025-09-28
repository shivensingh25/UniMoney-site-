import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signIn, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { FaGoogle, FaArrowRight } from 'react-icons/fa';

type Intake = 'Feb' | 'Jul';

export default function LoanCompare() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showAuthOptions, setShowAuthOptions] = useState(true);
  const [userAuth, setUserAuth] = useState<{isAuthenticated: boolean, isAdmin: boolean, user?: any}>({
    isAuthenticated: false,
    isAdmin: false
  });
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    university: '',
    course: '',
    loanAmount: '',
    hasCollateral: false,
    hasCosigner: false,
    annualFamilyIncome: '',
    intake: '' as '' | Intake,
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication status
  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (session) {
      const user = session.user as any;
      
      setUserAuth({
        isAuthenticated: true,
        isAdmin: user.isAdmin || false,
        user: session.user
      });
      
      setShowAuthOptions(false);
      
      // If user is admin, redirect to admin dashboard
      if (user.isAdmin) {
        router.push('/admin/dashboard');
        return;
      }
      
      // Pre-fill form with user data for regular users
      setForm(prev => ({
        ...prev,
        fullName: session.user?.name || '',
        email: session.user?.email || ''
      }));
    }
  }, [session, status, router]);

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      // Use NextAuth to sign in with Google
      const result = await signIn('google', {
        redirect: false, // Don't redirect immediately
        callbackUrl: '/loan-compare'
      });
      
      if (result?.error) {
        if (result.error === 'Configuration') {
          setError('Google OAuth is not configured yet. Please contact support or use "Skip Sign In" for now.');
        } else {
          setError('Google Sign-In failed. Please try again or use "Skip Sign In".');
        }
      }
      // The useEffect will handle the redirect after successful sign-in
      
    } catch (error) {
      setError('Google OAuth is not available. Please use "Skip Sign In" to continue.');
      console.error('Google Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipSignIn = () => {
    setShowAuthOptions(false);
    setUserAuth({
      isAuthenticated: false,
      isAdmin: false
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const loan = Number(form.loanAmount);
    const income = form.annualFamilyIncome ? Number(form.annualFamilyIncome) : 0;
    if (!form.university) return setError('University is required');
    if (!form.loanAmount || Number.isNaN(loan) || loan <= 0) return setError('Enter a valid positive loan amount');
    if (income < 0) return setError('Income cannot be negative');

    const query = new URLSearchParams({
      fullName: form.fullName,
      email: form.email,
      university: form.university,
      course: form.course,
      loanAmount: String(loan),
      hasCollateral: String(form.hasCollateral),
      hasCosigner: String(form.hasCosigner),
      annualFamilyIncome: String(income),
      intake: form.intake || '',
    }).toString();
    // Show animated transition before navigating
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/loan-results?${query}`);
    }, 5000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-32 pb-10">
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [ -10, 10, -10 ] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="w-20 h-20 relative mb-4"
          >
            <Image src="/brand/logo/Logo.png" alt="UniMoney" fill className="object-contain" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-medium text-gray-800"
          >
            Finding matches...
          </motion.div>
          <motion.div
            className="mt-2 h-1 w-48 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ x: '-100%' }}
              animate={{ x: ['-100%', '0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{ width: '40%' }}
            />
          </motion.div>
        </div>
      )}
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Student Loans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized loan recommendations based on your profile and requirements
          </p>
        </div>
      </div>

      {/* Authentication Options */}
      {showAuthOptions && (
        <div className="max-w-md mx-auto mb-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
              <p className="text-gray-600">Sign in for a personalized experience or continue as guest</p>
            </div>

            <div className="space-y-4">
              {/* Google Sign In Button */}
              <motion.button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaGoogle className="text-red-500 text-lg" />
                Continue with Google
              </motion.button>

              {/* Skip Sign In Button */}
              <motion.button
                onClick={handleSkipSignIn}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Skip Sign In
                <FaArrowRight className="text-sm" />
              </motion.button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      )}

      {/* Form Section - Only show after authentication choice */}
      {!showAuthOptions && (
        <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Tell us about yourself</h2>
            <p className="text-indigo-100 mt-2">Help us find the best loan options for you</p>
          </div>
          
          <form onSubmit={submit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name (optional)</label>
                  <input 
                    name="fullName" 
                    value={form.fullName} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Academic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">University *</label>
                  <input 
                    name="university" 
                    value={form.university} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Enter university name"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <input 
                    name="course" 
                    value={form.course} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Enter course name"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Financial Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (INR) *</label>
                  <input 
                    name="loanAmount" 
                    type="number" 
                    min={1} 
                    step="10000" 
                    value={form.loanAmount} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Enter loan amount"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Family Income (INR)</label>
                  <input 
                    name="annualFamilyIncome" 
                    type="number" 
                    min={0} 
                    step="10000" 
                    value={form.annualFamilyIncome} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Enter family income"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Intake</label>
                  <select 
                    name="intake" 
                    value={form.intake} 
                    onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="">Select intake</option>
                    <option value="Feb">February</option>
                    <option value="Jul">July</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Additional Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    name="hasCollateral" 
                    checked={form.hasCollateral} 
                    onChange={handleChange} 
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Has Collateral</span>
                    <p className="text-sm text-gray-500">I have assets that can be used as collateral</p>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    name="hasCosigner" 
                    checked={form.hasCosigner} 
                    onChange={handleChange} 
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Has Cosigner</span>
                    <p className="text-sm text-gray-500">I have someone who can cosign the loan</p>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <div className="flex justify-end pt-6">
              <button 
                type="submit" 
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Find My Loan Matches
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      )}
      </div>
    </Layout>
  );
}


