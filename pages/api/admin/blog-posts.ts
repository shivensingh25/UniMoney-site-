// API to get all blog posts for admin dashboard (including drafts)
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

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

    const client = await connectToDatabase();
    const db = client.db('unimoney_db');
    const blogCollection = db.collection('blog_posts');

    if (req.method === 'GET') {
      // Get all blog posts (including drafts) for admin dashboard
      const posts = await blogCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      // Create a new blog post
      const {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        featuredImage,
        author,
        readTime,
        status,
        publishedAt
      } = req.body;

      // Validate required fields
      if (!title || !content || !slug) {
        return res.status(400).json({ error: 'Title, content, and slug are required' });
      }

      // Check if slug already exists
      const existingPost = await blogCollection.findOne({ slug });
      if (existingPost) {
        return res.status(400).json({ error: 'A post with this slug already exists' });
      }

      // Create new blog post document
      const newPost = {
        title,
        slug,
        excerpt: excerpt || '',
        content,
        category: category || 'Loan Insights',
        tags: tags || [],
        featuredImage: featuredImage || '',
        author: author || { name: 'Admin User', avatar: '/founders/Praditha.jpeg' },
        readTime: readTime || '5 min read',
        status: status || 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: status === 'published' ? (publishedAt ? new Date(publishedAt) : new Date()) : null
      };

      // Insert the new post
      const result = await blogCollection.insertOne(newPost);
      
      // Return the created post
      const createdPost = await blogCollection.findOne({ _id: result.insertedId });
      
      return res.status(201).json({
        message: `Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully`,
        post: createdPost
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('MongoDB Admin Blog API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}