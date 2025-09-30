import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from 'formidable'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { Octokit } from '@octokit/rest'

// Configure API route to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if user is admin
    const session = await getServerSession(req, res, authOptions);
    if (!session || !(session.user as any)?.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Parse the form data
    const form = new IncomingForm({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      keepExtensions: true,
    })

    // Use promise-based parsing
    const parseForm = () => {
      return new Promise<{ fields: any, files: any }>((resolve, reject) => {
        form.parse(req, (err: any, fields: any, files: any) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
    };

    const { fields, files } = await parseForm();
    const file = Array.isArray(files.image) ? files.image[0] : files.image

    if (!file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    // Validate file type
    if (!file.mimetype?.startsWith('image/')) {
      return res.status(400).json({ error: 'File must be an image' })
    }

    // Read file content
    const fileContent = await fs.readFile(file.filepath);
    const base64Content = fileContent.toString('base64');

    // Generate unique filename
    const fileExtension = path.extname(file.originalFilename || '')
    const uniqueFilename = `${uuidv4()}${fileExtension}`

    // Upload to GitHub
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const uploadResponse = await octokit.rest.repos.createOrUpdateFileContents({
      owner: 'shivensingh25', // Your GitHub username
      repo: 'UniMoney-site-', // Your repo name
      path: `public/blog-images/${uniqueFilename}`,
      message: `Add blog image: ${uniqueFilename}`,
      content: base64Content,
      branch: 'main'
    });

    // Return the GitHub raw URL for the uploaded image
    const imageUrl = `https://raw.githubusercontent.com/shivensingh25/UniMoney-site-/main/public/blog-images/${uniqueFilename}`;
    
    return res.status(200).json({ 
      success: true,
      imageUrl 
    })

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
}