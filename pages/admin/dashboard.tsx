import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Layout from '../../components/Layout';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaUsers,
  FaChartBar,
  FaBlog,
  FaCog,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  publishedAt: string;
  author: string;
  category: string;
  readingTime: number;
}

const AdminDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [adminUser, setAdminUser] = useState<any>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      // Not signed in, redirect to loan compare page
      router.push('/loan-compare');
      return;
    }

    const user = session.user as any;
    if (!user.isAdmin) {
      // User is signed in but not admin, redirect to home page
      router.push('/');
      return;
    }

    // User is admin, set admin user data
    setAdminUser(session.user);
    
    // Load blog posts
    loadBlogPosts();
    setLoading(false);
  }, [session, status, router]);

  const loadBlogPosts = () => {
    // Load real blog posts from MongoDB API
    fetch('/api/admin/blog-posts')
      .then(response => response.json())
      .then(posts => {
        setBlogPosts(posts);
      })
      .catch(error => {
        console.error('Failed to load blog posts:', error);
        setBlogPosts([]);
      });
  };

  const handleLogout = async () => {
    // Sign out using NextAuth
    await signOut({ callbackUrl: '/' });
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/blog/posts-mongo?id=${postId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove from local state
          setBlogPosts(posts => posts.filter(post => post._id !== postId));
          alert('Blog post deleted successfully!');
        } else {
          throw new Error('Failed to delete post');
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete blog post. Please try again.');
      }
    }
  };

  const stats = {
    totalPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.status === 'published').length,
    draftPosts: blogPosts.filter(p => p.status === 'draft').length,
    totalReads: 12500
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Admin Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200">
                <img
                  src={adminUser?.picture || '/favicon.ico'}
                  alt={adminUser?.name}
                  className="w-12 h-12 object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {adminUser?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHome />
                  Back to Site
                </motion.button>
              </Link>
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaSignOutAlt />
                Logout
              </motion.button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-lg mb-8">
            <div className="flex border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview', icon: FaChartBar },
                { id: 'blog', label: 'Blog Management', icon: FaBlog },
                { id: 'users', label: 'Users', icon: FaUsers },
                { id: 'settings', label: 'Settings', icon: FaCog }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Posts</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
                    </div>
                    <FaBlog className="text-2xl text-indigo-600" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Published</p>
                      <p className="text-3xl font-bold text-green-600">{stats.publishedPosts}</p>
                    </div>
                    <FaEye className="text-2xl text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Drafts</p>
                      <p className="text-3xl font-bold text-yellow-600">{stats.draftPosts}</p>
                    </div>
                    <FaEdit className="text-2xl text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Reads</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalReads.toLocaleString()}</p>
                    </div>
                    <FaChartBar className="text-2xl text-blue-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Blog Management Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
                <Link href="/admin/blog/new">
                  <motion.button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus />
                    New Blog Post
                  </motion.button>
                </Link>
              </div>

              {/* Blog Posts Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Published
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500">/blog/{post.slug}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{post.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {post.publishedAt || 'Not published'}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Link href={`/blog/${post.slug}`}>
                                <button className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                                  <FaEye />
                                </button>
                              </Link>
                              <Link href={`/admin/blog/edit/${post._id}`}>
                                <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors">
                                  <FaEdit />
                                </button>
                              </Link>
                              <button 
                                onClick={() => handleDeletePost(post._id)}
                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
              <p className="text-gray-600">User management features will be implemented in future versions.</p>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              <p className="text-gray-600">System settings and configurations will be available here.</p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;