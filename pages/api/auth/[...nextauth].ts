import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { MongoClient } from 'mongodb'

// Debugging: Log environment variables
console.log('🔍 NextAuth Environment Check:')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID)
console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET)
console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET)
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)

// MongoDB setup for user storage
let clientPromise: Promise<MongoClient>

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (mongoUri) {
  const client = new MongoClient(mongoUri)
  clientPromise = client.connect()
  console.log('✅ MongoDB client promise created')
} else {
  console.error('❌ MONGODB_URI not found. Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO') || key.includes('DATABASE')))
  throw new Error('MONGODB_URI or DATABASE_URL environment variable is required')
}

// Admin emails that get admin access
const ADMIN_EMAILS = [
  'unimoney2025@gmail.com',
  'sshiven72@gmail.com', 
  'pnar0013@student.monash.edu'
]

console.log('⚙️ Setting up NextAuth with debug mode enabled')

export const authOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  
  // Disable MongoDB adapter for now - use JWT strategy instead
  // adapter: MongoDBAdapter(clientPromise),
  
  session: {
    strategy: 'jwt' as const,
  },
  
  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log('🔐 Sign in attempt:', { 
        email: user.email, 
        provider: account?.provider,
        callbackUrl: account?.callbackUrl 
      })
      return true
    },
    
    async redirect({ url, baseUrl }: any) {
      console.log('🔀 Redirect callback:', { url, baseUrl })
      
      // Ensure we always redirect to the correct base URL
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`
        console.log('📍 Redirecting to relative URL:', redirectUrl)
        return redirectUrl
      }
      
      // If the URL is on the same origin, allow it
      if (new URL(url).origin === baseUrl) {
        console.log('📍 Redirecting to same origin:', url)
        return url
      }
      
      // Default redirect to loan-compare
      const defaultUrl = `${baseUrl}/loan-compare`
      console.log('📍 Default redirect to:', defaultUrl)
      return defaultUrl
    },
    
    async session({ session, token }: any) {
      console.log('📋 Session callback (JWT):', { email: session.user?.email })
      
      if (session.user?.email) {
        const sessionUser = session.user as any;
        sessionUser.isAdmin = ADMIN_EMAILS.includes(session.user.email);
        sessionUser.id = token.sub; // Use token.sub for JWT strategy
        console.log('👤 User session created:', { 
          email: session.user.email, 
          isAdmin: sessionUser.isAdmin 
        })
      }
      return session
    }
  },
  
  pages: {
    signIn: '/loan-compare',
    error: '/loan-compare',
  },
  
  events: {
    async signIn({ user, isNewUser }: any) {
      console.log(`✅ User signed in: ${user.email} (New user: ${isNewUser})`)
    },
    async signOut({ token }: any) {
      console.log('👋 User signed out')
    },
    async createUser({ user }: any) {
      console.log('👶 New user created:', user.email)
    }
  },
  
  // Add these for better production support
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)