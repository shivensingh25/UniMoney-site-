import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // The actual email sending will be handled client-side with EmailJS
      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error handling form submission:', error);
      res.status(500).json({ error: 'Failed to process form submission' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 