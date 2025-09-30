import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import NewsletterForm from '../components/NewsletterForm';
import { FaSearch, FaClock, FaUser, FaCalendarAlt } from 'react-icons/fa';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  publishedAt?: string;
  readTime: string;
  tags?: string[];
  status: 'published' | 'draft';
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Load blog posts from MongoDB
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts-mongo');
        if (response.ok) {
          const posts = await response.json();
          setBlogPosts(posts);
        } else {
          console.error('Failed to load blog posts');
          setBlogPosts([]);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const categories = useMemo(() => {
    return ['All Categories', 'Loan Insights', 'Student Finance', 'Application Process', 'UniMoney News'];
  }, []);

  const authors = useMemo(() => {
    // Only show Shiven and Praditha as author options
    const availableAuthors = ['All Authors'];
    
    // Check if we have posts by Shiven
    if (blogPosts.some(post => post.author?.name === 'Shiven')) {
      availableAuthors.push('Shiven');
    }
    
    // Check if we have posts by Praditha
    if (blogPosts.some(post => post.author?.name === 'Praditha')) {
      availableAuthors.push('Praditha');
    }
    
    return availableAuthors;
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
      const matchesAuthor = selectedAuthor === 'All Authors' || (post.author?.name || 'Unknown') === selectedAuthor;
      
      return matchesSearch && matchesCategory && matchesAuthor && post.status === 'published';
    });
  }, [blogPosts, searchQuery, selectedCategory, selectedAuthor]);

  const featuredPost = useMemo(() => {
    return filteredPosts[0] || null;
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    return filteredPosts.slice(1);
  }, [filteredPosts]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading blog posts...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              UniMoney Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights, tips, and guides to help you navigate your education financing journey
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div className="md:w-48">
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {authors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={featuredPost.featuredImage || '/logo.svg'}
                          alt={featuredPost.title}
                          fill
                          className={`object-cover ${!featuredPost.featuredImage ? 'opacity-20 object-contain p-12' : ''}`}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                            {featuredPost.category}
                          </span>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <FaClock />
                            {featuredPost.readTime}
                          </div>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          <Link 
                            href={`/blog/${featuredPost.slug}`}
                            className="hover:text-indigo-600 transition-colors"
                          >
                            {featuredPost.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={featuredPost.author?.avatar || '/founders/Praditha.jpeg'}
                              alt={featuredPost.author?.name || 'Author'}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-gray-700 text-sm font-medium">
                              {featuredPost.author?.name || 'Admin'}
                            </span>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <FaCalendarAlt />
                              {featuredPost.publishedAt 
                                ? new Date(featuredPost.publishedAt).toLocaleDateString()
                                : featuredPost.date 
                                  ? new Date(featuredPost.date).toLocaleDateString()
                                  : 'Recent'
                              }
                            </div>
                          </div>
                        </div>
                        
                        <Link 
                          href={`/blog/${featuredPost.slug}`}
                          className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Regular Posts Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.featuredImage || '/logo.svg'}
                        alt={post.title}
                        fill
                        className={`object-cover ${!post.featuredImage ? 'opacity-20 object-contain p-8' : ''}`}
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <FaClock />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="hover:text-indigo-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors inline-flex items-center gap-1 mb-4"
                      >
                        Read more →
                      </Link>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                            <Image
                              src={post.author?.avatar || '/founders/Praditha.jpeg'}
                              alt={post.author?.name || 'Author'}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-gray-700 text-sm font-medium">
                            {post.author?.name || 'Admin'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <FaCalendarAlt />
                          {post.publishedAt 
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : post.date 
                              ? new Date(post.date).toLocaleDateString()
                              : 'Recent'
                          }
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </>
          )}

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 opacity-90">
              Get the latest insights on education financing delivered to your inbox
            </p>
            <NewsletterForm />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;