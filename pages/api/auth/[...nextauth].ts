import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient } from 'mongodb'

// MongoDB setup for user storage
let clientPromise: Promise<MongoClient>

if (process.env.MONGODB_URI) {
  const client = new MongoClient(process.env.MONGODB_URI)
  clientPromise = client.connect()
} else {
  throw new Error('Please add your MongoDB URI to .env.local')
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