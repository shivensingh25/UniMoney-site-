import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    
    // Get password from environment variable or use default
    const correctPassword = process.env.METRICS_PASSWORD || 'unimoney2024';
    
    if (password === correctPassword) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).json({ error: 'Failed to verify password' });
  }
} 