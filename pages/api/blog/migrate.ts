// One-time migration script to move blog posts from JSON file to MongoDB
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local')
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if user is admin
    const session = await getServerSession(req, res, authOptions);
    if (!session || !(session.user as any)?.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const client = await connectToDatabase();
    const db = client.db('unimoney_db');
    const blogCollection = db.collection('blog_posts');

    // Check if blog posts already exist in MongoDB
    const existingCount = await blogCollection.countDocuments();
    if (existingCount > 0) {
      return res.status(200).json({ 
        message: 'Blog posts already exist in MongoDB', 
        count: existingCount 
      });
    }

    // Read JSON file if it exists
    if (!fs.existsSync(BLOG_DATA_FILE)) {
      // Initialize with sample blog posts
      const samplePosts = [
        {
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
          readingTime: 8,
          tags: ['Australia', 'Student Loans', 'International Education'],
          featured: true,
          status: 'published',
          createdAt: new Date('2025-09-25'),
          updatedAt: new Date('2025-09-25'),
          publishedAt: new Date('2025-09-25')
        },
        {
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
          readingTime: 5,
          tags: ['Interest Rates', 'Financial Planning', 'Loans'],
          featured: false,
          status: 'published',
          createdAt: new Date('2025-09-22'),
          updatedAt: new Date('2025-09-22'),
          publishedAt: new Date('2025-09-22')
        }
      ];

      await blogCollection.insertMany(samplePosts);
      return res.status(200).json({ 
        message: 'Sample blog posts created in MongoDB', 
        count: samplePosts.length 
      });
    }

    // Migrate existing posts from JSON file
    const data = fs.readFileSync(BLOG_DATA_FILE, 'utf8');
    const posts = JSON.parse(data);

    // Add MongoDB-specific fields
    const postsWithTimestamps = posts.map((post: any) => ({
      ...post,
      createdAt: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      updatedAt: new Date(),
      publishedAt: post.status === 'published' && post.publishedAt ? new Date(post.publishedAt) : null
    }));

    // Insert all posts into MongoDB
    if (postsWithTimestamps.length > 0) {
      await blogCollection.insertMany(postsWithTimestamps);
    }

    return res.status(200).json({ 
      message: 'Blog posts migrated to MongoDB successfully', 
      count: postsWithTimestamps.length 
    });
    
  } catch (error) {
    console.error('Migration error:', error);
    return res.status(500).json({ error: 'Migration failed' });
  }
}