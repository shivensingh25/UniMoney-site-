// MongoDB Blog API - Replaces file-based storage
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb'
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
    const client = await connectToDatabase();
    const db = client.db('unimoney_db');
    const blogCollection = db.collection('blog_posts');

    if (req.method === 'GET') {
      // Get all published blog posts
      const posts = await blogCollection
        .find({ status: 'published' })
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      // Check if user is admin
      const session = await getServerSession(req, res, authOptions);
      if (!session || !(session.user as any)?.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      const newPost = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: req.body.status === 'published' ? new Date() : null
      };
      
      const result = await blogCollection.insertOne(newPost);
      const savedPost = await blogCollection.findOne({ _id: result.insertedId });
      
      return res.status(201).json(savedPost);
    }

    if (req.method === 'PUT') {
      // Check if user is admin
      const session = await getServerSession(req, res, authOptions);
      if (!session || !(session.user as any)?.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      const { _id, ...updateData } = req.body;
      
      if (!_id || !ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid post ID' });
      }
      
      const updatedPost = {
        ...updateData,
        updatedAt: new Date(),
        publishedAt: updateData.status === 'published' && !updateData.publishedAt 
          ? new Date() 
          : updateData.publishedAt
      };
      
      await blogCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updatedPost }
      );
      
      const savedPost = await blogCollection.findOne({ _id: new ObjectId(_id) });
      return res.status(200).json(savedPost);
    }

    if (req.method === 'DELETE') {
      // Check if user is admin
      const session = await getServerSession(req, res, authOptions);
      if (!session || !(session.user as any)?.isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
      }

      const { id } = req.query;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Post ID is required' });
      }

      // Validate ObjectId format
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid post ID format' });
      }

      const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json({ message: 'Post deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('MongoDB Blog API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}