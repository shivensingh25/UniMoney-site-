// API endpoint to see current session data (for testing)
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  // Return current user session data
  return res.status(200).json({
    user: session.user,
    isAdmin: (session.user as any)?.isAdmin,
    sessionInfo: {
      strategy: 'jwt', // Since no database is configured
      expires: session.expires
    }
  })
}