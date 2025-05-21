import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface DocumentUpload {
  name: string;
  file: File | null;
  required: boolean;
  description: string;
}

const UploadDocuments = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      name: 'passport',
      file: null,
      required: true,
      description: 'Valid passport with at least 6 months validity'
    },
    {
      name: 'admissionLetter',
      file: null,
      required: true,
      description: 'University admission letter or enrollment confirmation'
    },
    {
      name: 'bankStatements',
      file: null,
      required: true,
      description: 'Last 6 months of bank statements'
    },
    {
      name: 'proofOfIncome',
      file: null,
      required: true,
      description: 'Proof of income or employment (if applicable)'
    },
    {
      name: 'cosignerDocuments',
      file: null,
      required: true,
      description: 'Co-signer financial documents and ID proof'
    },
    {
      name: 'academicTranscripts',
      file: null,
      required: true,
      description: 'Academic transcripts from previous education'
    },
    {
      name: 'recommendationLetters',
      file: null,
      required: false,
      description: 'Letters of recommendation (optional)'
    },
    {
      name: 'statementOfPurpose',
      file: null,
      required: false,
      description: 'Statement of purpose for the loan'
    },
    {
      name: 'proofOfAddress',
      file: null,
      required: true,
      description: 'Proof of address (utility bill or bank statement)'
    },
    {
      name: 'visaDocuments',
      file: null,
      required: false,
      description: 'Student visa documents (if already available)'
    }
  ]);

  const handleFileChange = (index: number, file: File | null) => {
    setError(null); // Clear any previous errors
    const newDocuments = [...documents];
    newDocuments[index].file = file;
    setDocuments(newDocuments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    
    // Check if all required documents are uploaded
    const missingRequired = documents.filter(doc => doc.required && !doc.file);
    
    if (missingRequired.length > 0) {
      const missingDocs = missingRequired.map(doc => 
        doc.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      ).join(', ');
      setError(`Please upload the following required documents: ${missingDocs}`);
      // Scroll to the top where error message is displayed
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Show tick animation
    setShowAnimation(true);

    // Wait for animation and then redirect
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        router.push('/loan-sanctioned');
      }, 500);
    }, 1500);
  };

  if (showAnimation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
        <div className="relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center"
          >
            <motion.svg
              className="w-16 h-16 text-white"
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
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          </motion.div>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-full mt-4 text-center w-full text-lg font-medium text-green-700"
            >
              Documents Verified Successfully!
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 font-display tracking-tight text-center">Required Documents</h2>
          <p className="text-gray-600 mb-8 text-center">Please upload all required documents for your international student loan application.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {documents.map((doc, index) => (
              <div key={doc.name} className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <label className="block font-medium text-gray-700">
                      {doc.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                      className="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                               file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 
                               hover:file:bg-indigo-100 transition-all cursor-pointer"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
                {doc.file && (
                  <div className="mt-2 text-sm text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {doc.file.name}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 
                         transition-colors text-base tracking-wide flex items-center justify-center min-w-[200px]"
              >
                Submit Documents
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments; 