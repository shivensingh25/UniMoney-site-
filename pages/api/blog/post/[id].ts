// Get individual blog post by ID from MongoDB
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb'

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
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const client = await connectToDatabase();
    const db = client.db('unimoney_db');
    const blogCollection = db.collection('blog_posts');
    
    // Find post by ID
    const post = await blogCollection.findOne({
      _id: new ObjectId(id),
      status: 'published'
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
    
  } catch (error) {
    console.error('MongoDB Blog Post API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}