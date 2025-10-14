import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { 
  FaClock, 
  FaCalendarAlt, 
  FaTag, 
  FaChevronLeft
} from 'react-icons/fa';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
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

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load blog post from MongoDB based on slug
  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        console.log('Frontend: Loading post with slug:', slug);
        const response = await fetch(`/api/blog/${slug}`);
        
        if (response.ok) {
          const postData = await response.json();
          console.log('Frontend: Loaded post:', postData.title);
          setPost(postData);
        } else if (response.status === 404) {
          console.log('Frontend: Post not found');
          setError('Blog post not found');
        } else {
          console.log('Frontend: Failed to load post');
          setError('Failed to load blog post');
        }
      } catch (error) {
        console.error('Frontend: Error loading blog post:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading blog post...</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error || 'Blog post not found'}
            </h1>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaChevronLeft />
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} - UniMoney Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <FaChevronLeft />
              Back to Blog
            </Link>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative h-64 md:h-96">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={post.author?.avatar || '/founders/Praditha.jpeg'}
                      alt={post.author?.name || 'Author'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {post.author?.name || 'Admin'}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt />
                  <span>
                    {post.publishedAt 
                      ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : post.date 
                        ? new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'Recently published'
                    }
                  </span>
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-8 blog-content">
                <div 
                  className="whitespace-pre-wrap blog-content"
                  style={{ 
                    color: '#1f2937',
                    lineHeight: '1.75',
                    fontSize: '1.125rem',
                    fontWeight: '400'
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <FaTag className="text-gray-600" />
                    <span className="text-gray-900 font-medium">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.article>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;