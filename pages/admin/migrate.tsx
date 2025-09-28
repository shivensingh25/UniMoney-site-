import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { FaDatabase, FaArrowRight, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const MigrateBlogs = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [migrating, setMigrating] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const [error, setError] = useState('');

  // Check if user is admin
  if (!session || !(session.user as any)?.isAdmin) {
    router.push('/');
    return null;
  }

  const handleMigration = async () => {
    setMigrating(true);
    setError('');

    try {
      const response = await fetch('/api/blog/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Migration result:', result);
        setMigrated(true);
        alert(`Success! ${result.message}`);
      } else {
        throw new Error('Migration failed');
      }
    } catch (error) {
      console.error('Migration error:', error);
      setError('Migration failed. Please try again.');
    } finally {
      setMigrating(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Migrate Blog Posts to MongoDB
            </h1>
            <p className="text-xl text-gray-600">
              Move your blog posts from file storage to MongoDB database
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FaDatabase className="text-2xl text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Blog Migration</h2>
                  <p className="text-gray-600">One-time process to upgrade your blog system</p>
                </div>
              </div>
              
              {migrated && (
                <div className="flex items-center gap-2 text-green-600">
                  <FaCheck className="text-xl" />
                  <span className="font-medium">Migrated</span>
                </div>
              )}
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">What this migration does:</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Moves blog posts from JSON files to MongoDB database</li>
                  <li>• Preserves all existing content and metadata</li>
                  <li>• Adds proper timestamps and database structure</li>
                  <li>• Creates sample posts if none exist</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Benefits after migration:</h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Better performance and scalability</li>
                  <li>• Advanced search and filtering capabilities</li>
                  <li>• Better data integrity and backup</li>
                  <li>• Professional database structure</li>
                </ul>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-900">
                    <FaExclamationTriangle />
                    <span className="font-semibold">Error:</span>
                  </div>
                  <p className="text-red-800 mt-1">{error}</p>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={handleMigration}
                disabled={migrating || migrated}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all mx-auto ${
                  migrated 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : migrating
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-105'
                }`}
              >
                {migrating ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                    Migrating...
                  </>
                ) : migrated ? (
                  <>
                    <FaCheck />
                    Migration Complete
                  </>
                ) : (
                  <>
                    <FaDatabase />
                    Start Migration
                    <FaArrowRight />
                  </>
                )}
              </button>

              {migrated && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/admin/dashboard')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Go to Admin Dashboard →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default MigrateBlogs;