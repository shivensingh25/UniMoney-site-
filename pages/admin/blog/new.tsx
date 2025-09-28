import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { 
  FaSave, 
  FaEye, 
  FaImage, 
  FaUpload,
  FaChevronLeft,
  FaTag,
  FaClock,
  FaUser
} from 'react-icons/fa';

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  authorAvatar: string;
  readingTime: number;
  status: 'draft' | 'published';
}

const NewBlogPost = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState<BlogPostForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Loan Insights',
    tags: [],
    featuredImage: '',
    author: 'Praditha',
    authorAvatar: '/founders/Praditha.jpeg',
    readingTime: 5,
    status: 'draft'
  });

  const categories = [
    'Loan Insights',
    'Student Finance', 
    'Application Process',
    'UniMoney News'
  ];

  const authors = [
    { name: 'Praditha', avatar: '/founders/Praditha.jpeg' },
    { name: 'Shiven', avatar: '/founders/Shiven.jpeg' },
    { name: 'Admin User', avatar: '/founders/Praditha.jpeg' }
  ];

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleAuthorChange = (authorName: string) => {
    const selectedAuthor = authors.find(author => author.name === authorName);
    setFormData(prev => ({
      ...prev,
      author: authorName,
      authorAvatar: selectedAuthor?.avatar || '/founders/Praditha.jpeg'
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const newTag = tagInput.value.trim();
      
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      tagInput.value = '';
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          featuredImage: data.imageUrl
        }));
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    setSaving(true);
    
    try {
      const blogPost = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        featuredImage: formData.featuredImage,
        author: {
          name: formData.author,
          avatar: formData.authorAvatar
        },
        readTime: `${formData.readingTime} min read`,
        status: status,
        publishedAt: status === 'published' ? new Date().toISOString() : undefined
      };

      const response = await fetch('/api/admin/blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogPost)
      });

      if (response.ok) {
        alert(`Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to save blog post'}`);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Error saving blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors mb-6"
            >
              <FaChevronLeft />
              Back to Dashboard
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
                <p className="text-gray-600 mt-1">Write and publish engaging content for your audience</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaEye />
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={() => handleSave('draft')}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50"
                >
                  <FaSave />
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave('published')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <FaUpload />
                  Publish
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                
                {!previewMode ? (
                  <div className="space-y-6">
                    
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter your blog post title..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))}
                        placeholder="url-friendly-slug"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
                        placeholder="Brief description of your post..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Content
                      </label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => handleContentChange(e.target.value)}
                        placeholder="Write your blog post content here..."
                        rows={15}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </div>

                  </div>
                ) : (
                  
                  /* Preview Mode */
                  <div className="prose prose-lg max-w-none">
                    <h1>{formData.title || 'Untitled Post'}</h1>
                    {formData.excerpt && (
                      <p className="text-xl text-gray-600 italic">{formData.excerpt}</p>
                    )}
                    {formData.featuredImage && (
                      <img src={formData.featuredImage} alt={formData.title} className="w-full rounded-lg" />
                    )}
                    <div className="whitespace-pre-wrap">
                      {formData.content || 'No content yet...'}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              
              {/* Publishing Options */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h3>
                
                {/* Category */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <FaUser className="inline mr-2" />
                    Author
                  </label>
                  <select
                    value={formData.author}
                    onChange={(e) => handleAuthorChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  >
                    {authors.map(author => (
                      <option key={author.name} value={author.name}>{author.name}</option>
                    ))}
                  </select>
                  
                  {/* Author Preview */}
                  <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={formData.authorAvatar}
                        alt={formData.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm text-gray-700">
                      {formData.author}
                    </div>
                  </div>
                </div>

                {/* Reading Time */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <FaClock className="inline mr-2" />
                    Reading Time (minutes)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={formData.readingTime}
                      onChange={(e) => setFormData(prev => ({...prev, readingTime: parseInt(e.target.value) || 1}))}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="5"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({...prev, readingTime: calculateReadingTime(formData.content)}))}
                      className="px-3 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                      title="Auto-calculate based on content"
                    >
                      Auto
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Estimated reading time in minutes (or click Auto to calculate)</p>
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <FaImage className="inline mr-2" />
                  Featured Image
                </h3>
                
                {formData.featuredImage ? (
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={formData.featuredImage} 
                        alt="Featured" 
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, featuredImage: ''}))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50"
                    >
                      <FaUpload />
                      {uploading ? 'Uploading...' : 'Change Image'}
                    </button>
                  </div>
                ) : uploading ? (
                  <div className="text-center py-8">
                    <FaUpload className="mx-auto text-4xl text-indigo-600 mb-4 animate-pulse" />
                    <p className="text-indigo-600 mb-4">Uploading image...</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full animate-pulse w-1/2"></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaImage className="mx-auto text-4xl text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">No featured image</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 mx-auto px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors disabled:opacity-50"
                    >
                      <FaUpload />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <FaTag className="inline mr-2" />
                  Tags
                </h3>
                
                <input
                  type="text"
                  placeholder="Type a tag and press Enter"
                  onKeyDown={handleTagInput}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors mb-4"
                />
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        #{tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewBlogPost;