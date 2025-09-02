import type { NextApiRequest, NextApiResponse } from 'next';

type WaitlistBody = {
  email?: string;
  hardestPart?: string;
  fromCountry?: string;
  university?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return res.status(500).json({ error: 'Airtable is not configured on the server' });
  }

  try {
    const body: WaitlistBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const { email, hardestPart, fromCountry, university } = body || {};

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`;

    const recordPayload = {
      records: [
        {
          fields: {
            Email: email,
            HardestPart: hardestPart || '',
            FromCountry: fromCountry || '',
            University: university || '',
          },
        },
      ],
    };

    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordPayload),
    });

    if (!airtableResponse.ok) {
      let airtableErrorBody: unknown = undefined;
      const raw = await airtableResponse.text();
      try {
        airtableErrorBody = JSON.parse(raw);
      } catch {
        airtableErrorBody = raw;
      }
      console.error('Airtable error:', airtableResponse.status, airtableErrorBody);
      return res.status(airtableResponse.status).json({
        error: 'Failed to save to Airtable',
        details: airtableErrorBody,
      });
    }

    const data = await airtableResponse.json();
    return res.status(200).json({ message: 'Saved to Airtable', data });
  } catch (error) {
    console.error('Error handling form submission:', error);
    return res.status(500).json({ error: 'Failed to process form submission' });
  }
}