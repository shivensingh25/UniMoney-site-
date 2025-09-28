// API to get individual blog post by slug from MongoDB
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

let cachedClient: MongoClient | null = null;

async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }
  
  const client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { slug } = req.query

    console.log('API: Requested slug:', slug);

    if (!slug || typeof slug !== 'string') {
      console.log('API: Invalid slug provided');
      return res.status(400).json({ error: 'Invalid slug' })
    }

    const client = await connectToDatabase();
    const db = client.db('unimoney_db');
    const blogCollection = db.collection('blog_posts');
    
    // Debug: Log all slugs in the database
    const allPosts = await blogCollection.find({}, { projection: { slug: 1, title: 1, status: 1 } }).toArray();
    console.log('API: All posts in database:', allPosts);
    
    // Find post by slug (published only)
    const post = await blogCollection.findOne({ 
      slug: slug, 
      status: 'published' 
    });
    
    console.log('API: Found post:', post ? post.title : 'Not found');
    
    if (!post) {
      console.log('API: Post not found, returning 404');
      return res.status(404).json({ error: 'Post not found' })
    }

    return res.status(200).json(post)
    
  } catch (error) {
    console.error('Blog post API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}