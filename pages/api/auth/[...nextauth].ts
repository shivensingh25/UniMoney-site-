import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient } from 'mongodb'

// MongoDB setup for user storage
let clientPromise: Promise<MongoClient>

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (mongoUri) {
  const client = new MongoClient(mongoUri)
  clientPromise = client.connect()
} else {
  console.error('MONGODB_URI not found. Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO') || key.includes('DATABASE')))
  throw new Error('MONGODB_URI or DATABASE_URL environment variable is required')
}

// Admin emails that get admin access
const ADMIN_EMAILS = [
  'unimoney2025@gmail.com',
  'sshiven72@gmail.com', 
  'pnar0013@student.monash.edu'
]

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  
  adapter: MongoDBAdapter(clientPromise),
  
  callbacks: {
    async session({ session, user }: any) {
      if (session.user?.email) {
        const sessionUser = session.user as any;
        sessionUser.isAdmin = ADMIN_EMAILS.includes(session.user.email);
        sessionUser.id = user.id;
      }
      return session
    }
  },
  
  pages: {
    signIn: '/loan-compare',
  },
  
  // Add these for better production support
  secret: process.env.NEXTAUTH_SECRET,
  
  events: {
    async signIn({ user, isNewUser }: any) {
      console.log(`User signed in: ${user.email} (New user: ${isNewUser})`)
      if (isNewUser) {
        console.log(`New user registered: ${user.name} (${user.email})`)
      }
    }
  }
}

export default NextAuth(authOptions)