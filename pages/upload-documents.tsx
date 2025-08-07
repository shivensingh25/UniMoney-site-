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

    // Simulate document upload process
    setSubmitted(true);
    setShowAnimation(true);
    
    // Simulate processing time
    setTimeout(() => {
      setShowAnimation(false);
      // Redirect to loan sanctioned page after successful upload
      setTimeout(() => {
        router.push('/loan-sanctioned');
      }, 2000);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb]">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
          {showAnimation ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
              <h2 className="text-2xl font-bold text-gray-900">Processing Documents...</h2>
              <p className="text-gray-600">Please wait while we verify your documents.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-green-500 text-6xl">✓</div>
              <h2 className="text-2xl font-bold text-gray-900">Documents Uploaded Successfully!</h2>
              <p className="text-gray-600">Redirecting to loan status...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-[#c8e6c9] to-[#b2dfdb] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Required Documents</h1>
          <p className="text-xl text-gray-600">Please upload all required documents to complete your loan application</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {doc.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h3>
                  {doc.required && (
                    <span className="text-red-500 text-sm font-medium">Required</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{doc.description}</p>
                
                <div className="space-y-2">
                  <input
                    type="file"
                    id={doc.name}
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  
                  {doc.file && (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <span>✓</span>
                      <span>{doc.file.name}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit Documents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocuments; 