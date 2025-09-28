// API to save/retrieve blog posts
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

// Ensure data directory exists
const dataDir = path.dirname(BLOG_DATA_FILE)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize with sample data if file doesn't exist
const initializeBlogData = () => {
  const samplePosts = [
    {
      id: '1',
      title: 'Complete Guide to Student Loans for International Students in Australia',
      slug: 'student-loans-australia-guide',
      excerpt: 'Everything you need to know about securing education funding for your Australian university journey.',
      content: `# Complete Guide to Student Loans for International Students in Australia

Studying in Australia as an international student is an incredible opportunity, but funding your education can be challenging. This comprehensive guide will walk you through everything you need to know about student loans and financing options.

## Understanding Australian Education Costs

International students in Australia face several costs:
- **Tuition fees**: AUD $20,000 - $45,000 per year
- **Living expenses**: AUD $21,000 - $25,000 per year  
- **Health insurance**: AUD $500 - $650 per year
- **Books and supplies**: AUD $500 - $1,000 per year

## Student Loan Options

### 1. Private Education Loans
Most international students rely on private loans from:
- Banks in your home country
- International education loan providers
- Australian private lenders

### 2. University-specific Scholarships
Many universities offer partial funding:
- Merit-based scholarships
- Need-based financial aid
- Country-specific programs

## Application Requirements

**Typical documentation needed:**
- University acceptance letter
- Financial statements
- Credit history (if available)
- Co-signer information
- Passport and visa documents

## Tips for Success

1. **Start early**: Begin your loan application process 6-12 months before enrollment
2. **Compare rates**: Shop around for the best interest rates and terms
3. **Understand repayment**: Know when repayment begins and what your monthly payments will be
4. **Budget wisely**: Create a comprehensive budget including all expenses

Your education is an investment in your future - make sure you have the right financial plan in place!`,
      featuredImage: '/insights/student-quote.png',
      category: 'Study Abroad',
      author: { name: 'Praditha', avatar: '/founders/Praditha.jpeg' },
      publishedAt: 'Sep 25, 2025',
      readingTime: 8,
      tags: ['Australia', 'Student Loans', 'International Education'],
      featured: true,
      status: 'published'
    },
    {
      id: '2',
      title: 'Understanding Interest Rates: Fixed vs Variable Loans',
      slug: 'fixed-vs-variable-interest-rates',
      excerpt: 'Learn the key differences between fixed and variable interest rates and how to choose the best option.',
      content: `# Understanding Interest Rates: Fixed vs Variable Loans

One of the most important decisions when taking out a student loan is choosing between fixed and variable interest rates. Let's explore the differences and help you make the right choice.

## Fixed Interest Rates

Fixed rates remain constant throughout your loan term.

**Advantages:**
- Predictable monthly payments
- Protection from rate increases
- Easy budgeting and financial planning

**Disadvantages:**
- Usually start higher than variable rates
- No benefit from falling market rates

## Variable Interest Rates

Variable rates fluctuate with market conditions.

**Advantages:**
- Often start lower than fixed rates
- Can benefit from declining market rates
- Potential for long-term savings

**Disadvantages:**
- Payment uncertainty
- Risk of significant rate increases
- Harder to budget long-term

## Making Your Decision

Consider these factors:
- Your risk tolerance
- Current market conditions
- Loan repayment timeline
- Financial stability

Most financial experts recommend fixed rates for students who prefer payment certainty, especially in uncertain economic times.`,
      featuredImage: '/insights/ChatGPT Image Sep 27, 2025, 02_32_08 PM.png',
      category: 'Financial Tips',
      author: { name: 'Shiven', avatar: '/founders/Shiven.jpeg' },
      publishedAt: 'Sep 22, 2025',
      readingTime: 5,
      tags: ['Interest Rates', 'Financial Planning', 'Loans'],
      featured: false,
      status: 'published'
    }
  ]

  fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(samplePosts, null, 2))
  return samplePosts
}

// Get all blog posts
const getBlogPosts = () => {
  if (!fs.existsSync(BLOG_DATA_FILE)) {
    return initializeBlogData()
  }
  
  const data = fs.readFileSync(BLOG_DATA_FILE, 'utf8')
  return JSON.parse(data)
}

// Save blog posts
const saveBlogPosts = (posts: any[]) => {
  fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(posts, null, 2))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const posts = getBlogPosts()
      const publishedPosts = posts.filter((post: any) => post.status === 'published')
      return res.status(200).json(publishedPosts)
    }

    if (req.method === 'POST') {
      const newPost = req.body
      const posts = getBlogPosts()
      
      // Add new post
      const postWithId = {
        ...newPost,
        id: Date.now().toString(),
        publishedAt: newPost.status === 'published' ? new Date().toLocaleDateString() : ''
      }
      
      posts.unshift(postWithId) // Add to beginning of array
      saveBlogPosts(posts)
      
      return res.status(201).json(postWithId)
    }

    if (req.method === 'PUT') {
      const updatedPost = req.body
      const posts = getBlogPosts()
      
      // Update existing post
      const postIndex = posts.findIndex((post: any) => post.id === updatedPost.id)
      if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' })
      }
      
      posts[postIndex] = {
        ...updatedPost,
        publishedAt: updatedPost.status === 'published' && !posts[postIndex].publishedAt 
          ? new Date().toLocaleDateString() 
          : posts[postIndex].publishedAt
      }
      
      saveBlogPosts(posts)
      return res.status(200).json(posts[postIndex])
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      const posts = getBlogPosts()
      
      // Delete post
      const filteredPosts = posts.filter((post: any) => post.id !== id)
      saveBlogPosts(filteredPosts)
      
      return res.status(200).json({ message: 'Post deleted successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
    
  } catch (error) {
    console.error('Blog API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}