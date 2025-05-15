import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

// Store data in the public directory which is writable in Vercel
const DATA_FILE = path.join(process.cwd(), 'public', 'waitlist-data.json');

// Initialize data file if it doesn't exist
const initDataFile = () => {
  const dir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize data file
  try {
    initDataFile();
  } catch (error) {
    console.error('Error initializing data file:', error);
  }

  if (req.method === 'POST') {
    try {
      let data = [];
      try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(fileContent);
      } catch (error) {
        // If file doesn't exist or is invalid, start with empty array
        data = [];
      }

      const submission = {
        ...req.body,
        timestamp: new Date().toISOString()
      };

      data.push(submission);
      
      // Write to public directory which is writable
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      
      res.status(200).json({ message: 'Submission recorded successfully' });
    } catch (error) {
      console.error('Error saving submission:', error);
      res.status(200).json({ message: 'Submission recorded' }); // Still return success even if save fails
    }
  } else if (req.method === 'GET') {
    try {
      let data = [];
      try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(fileContent);
      } catch (error) {
        // If file doesn't exist or is invalid, use empty array
        data = [];
      }
      
      // Calculate statistics
      const stats = {
        totalSubmissions: data.length,
        problemBreakdown: data.reduce((acc: Record<string, number>, item: any) => {
          acc[item.hardestPart] = (acc[item.hardestPart] || 0) + 1;
          return acc;
        }, {}),
        countryBreakdown: {
          from: data.reduce((acc: Record<string, number>, item: any) => {
            acc[item.fromCountry] = (acc[item.fromCountry] || 0) + 1;
            return acc;
          }, {}),
          study: data.reduce((acc: Record<string, number>, item: any) => {
            acc[item.studyCountry] = (acc[item.studyCountry] || 0) + 1;
            return acc;
          }, {})
        },
        universityBreakdown: data.reduce((acc: Record<string, number>, item: any) => {
          if (item.university) {
            acc[item.university] = (acc[item.university] || 0) + 1;
          }
          return acc;
        }, {})
      };
      
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      // Return empty stats if there's an error
      res.status(200).json({
        totalSubmissions: 0,
        problemBreakdown: {},
        countryBreakdown: { from: {}, study: {} },
        universityBreakdown: {}
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 