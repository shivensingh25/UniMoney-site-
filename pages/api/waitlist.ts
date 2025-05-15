import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Initialize empty data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
} else {
  // Clear previous responses
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const submission = req.body;
      
      // Read existing data
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      
      // Add timestamp to submission
      const submissionWithTimestamp = {
        ...submission,
        timestamp: new Date().toISOString()
      };
      
      // Add new submission
      data.push(submissionWithTimestamp);
      
      // Write back to file
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      
      res.status(200).json({ message: 'Submission recorded successfully' });
    } catch (error) {
      console.error('Error saving submission:', error);
      res.status(500).json({ error: 'Failed to save submission' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      
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
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 