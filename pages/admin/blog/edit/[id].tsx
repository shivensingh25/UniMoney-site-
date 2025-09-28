import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { 
  FaSave, 
  FaEye, 
  FaImage, 
  FaUpload,
  FaChevronLeft,
  FaTag,
  FaClock,
  FaUser,
  FaTrash
} from 'react-icons/fa';

interface BlogPostForm {
  id: string;
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
  publishedAt: string;
}

const EditBlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [autoCalculate, setAutoCalculate] = useState(true);
  
  const [formData, setFormData] = useState<BlogPostForm>({
    id: '',
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
    status: 'draft',
    publishedAt: ''
  });

  const categories = [
    'Loan Insights',
    'Student Finance', 
    'Application Process',
    'UniMoney News'
  ];

  const authors = [
    { name: 'Praditha', avatar: '/founders/Praditha.jpeg' },
    { name: 'Shiven', avatar: '/founders/Shiven.jpeg' }
  ];

  // Fetch blog post from MongoDB
  const fetchPost = async () => {
    if (!id || id === 'new') {
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`/api/blog/post/${id}`);
      if (response.ok) {
        const post = await response.json();
        const authorName = post.author?.name || 'Praditha';
        const selectedAuthor = authors.find(author => author.name === authorName);
        
        setFormData({
          id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: post.tags || [],
          featuredImage: post.featuredImage || '',
          author: authorName,
          authorAvatar: selectedAuthor?.avatar || '/founders/Praditha.jpeg',
          readingTime: post.readingTime || 5,
          status: post.status,
          publishedAt: post.publishedAt || post.date || ''
        });
      } else {
        console.error('Failed to fetch post');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [id]);

  // Auto-calculate reading time when content changes and auto-calculate is enabled
  useEffect(() => {
    if (autoCalculate && formData.content) {
      const calculatedTime = calculateReadingTime(formData.content);
      setFormData(prev => ({
        ...prev,
        readingTime: calculatedTime
      }));
    }
  }, [formData.content, autoCalculate]);

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

  const handleReadingTimeChange = (time: number) => {
    setFormData(prev => ({
      ...prev,
      readingTime: time
    }));
  };

  const handleAutoCalculateToggle = () => {
    const newAutoCalculate = !autoCalculate;
    setAutoCalculate(newAutoCalculate);
    
    if (newAutoCalculate) {
      const calculatedTime = calculateReadingTime(formData.content);
      setFormData(prev => ({
        ...prev,
        readingTime: calculatedTime
      }));
    }
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

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    setSaving(true);
    
    try {
      const postData = {
        _id: formData.id || undefined,
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
        status,
        publishedAt: status === 'published' && !formData.publishedAt ? new Date().toISOString() : formData.publishedAt
      };
      
      const method = formData.id ? 'PUT' : 'POST';
      const response = await fetch('/api/blog/posts-mongo', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Blog post ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
        
        // If it's a new post, redirect to edit with the new ID
        if (!formData.id && result._id) {
          router.push(`/admin/blog/edit/${result._id}`);
        } else {
          router.push('/admin/dashboard');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save blog post');
      }
      
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    if (!formData.id) {
      alert('Cannot delete unsaved post');
      return;
    }

    try {
      const response = await fetch('/api/blog/posts-mongo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: formData.id }),
      });
      
      if (response.ok) {
        alert('Blog post deleted successfully!');
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog post');
      }
      
    } catch (error) {
      console.error('Delete failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete blog post');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">Loading blog post...</div>
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
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                  <FaChevronLeft />
                  Back to Dashboard
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
                <p className="text-gray-600">Make changes to your article</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaEye />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={handleDelete}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showDeleteConfirm 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                <FaTrash />
                {showDeleteConfirm ? 'Confirm Delete' : 'Delete Post'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Title */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter your blog post title..."
                    disabled={previewMode}
                  />
                </div>

                {/* Slug */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 bg-gray-50 px-3 py-3 rounded-l-lg border border-r-0 border-gray-300">
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      disabled={previewMode}
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({...prev, excerpt: e.target.value}))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                    placeholder="Brief description of your blog post..."
                    disabled={previewMode}
                  />
                </div>

                {/* Content Editor */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Content *
                  </label>
                  {previewMode ? (
                    <div className="min-h-[400px] p-4 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
                        <p className="text-gray-600 italic mb-6">{formData.excerpt}</p>
                        <div className="whitespace-pre-wrap">{formData.content}</div>
                      </div>
                    </div>
                  ) : (
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      rows={20}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none font-mono text-sm"
                      placeholder="Write your blog post content here..."
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Post</h3>
                
                {/* Current Status */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      formData.status === 'published' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {formData.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {formData.publishedAt && (
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">Published:</span>
                      <span className="text-sm text-gray-800">{formData.publishedAt}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleSave('draft')}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaSave />
                    {saving ? 'Saving...' : 'Save as Draft'}
                  </button>
                  <button
                    onClick={() => handleSave('published')}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaUpload />
                    {saving ? 'Updating...' : 'Update & Publish'}
                  </button>
                </div>
              </div>

              {/* Post Settings */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
                
                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={previewMode}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center gap-2">
                    <FaUser />
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({...prev, author: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={previewMode}
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    disabled={previewMode}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center gap-2">
                    <FaUser />
                    Author
                  </label>
                  <div className="space-y-3">
                    <select
                      value={formData.author}
                      onChange={(e) => handleAuthorChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      disabled={previewMode}
                    >
                      {authors.map(author => (
                        <option key={author.name} value={author.name}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                    
                    {/* Author Preview */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={formData.authorAvatar}
                        alt={formData.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{formData.author}</p>
                        <p className="text-sm text-gray-600">Co-founder</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reading Time */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center gap-2">
                    <FaClock />
                    Reading Time
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="autoCalculate"
                        checked={autoCalculate}
                        onChange={handleAutoCalculateToggle}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        disabled={previewMode}
                      />
                      <label htmlFor="autoCalculate" className="text-sm text-gray-600">
                        Auto-calculate based on content
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.readingTime}
                        onChange={(e) => handleReadingTimeChange(parseInt(e.target.value) || 1)}
                        min="1"
                        max="60"
                        disabled={autoCalculate || previewMode}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      <span className="text-gray-600">minutes</span>
                      {autoCalculate && (
                        <span className="text-xs text-indigo-600">(auto-calculated)</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaImage />
                  Featured Image
                </h3>
                {formData.featuredImage ? (
                  <div className="space-y-3">
                    <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={formData.featuredImage} 
                        alt="Featured" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({...prev, featuredImage: ''}))}
                      className="text-sm text-red-600 hover:text-red-700"
                      disabled={previewMode}
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploading ? (
                      <div className="w-full border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center bg-indigo-50">
                        <p className="text-indigo-600 mb-4">Uploading image...</p>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                        disabled={previewMode}
                      >
                        <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {uploading ? 'Uploading...' : 'Upload Image'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaTag />
                  Tags
                </h3>
                
                {/* Tag Input */}
                {!previewMode && (
                  <input
                    type="text"
                    onKeyDown={handleTagInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all mb-3"
                    placeholder="Type tag and press Enter..."
                  />
                )}
                
                {/* Tags Display */}
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      {!previewMode && (
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-indigo-500 hover:text-indigo-700 ml-1"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {formData.tags.length === 0 && (
                  <p className="text-sm text-gray-500">No tags added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditBlogPost;