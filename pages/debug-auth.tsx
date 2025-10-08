import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

interface DebugAuthProps {
  env: {
    NEXTAUTH_URL: string;
    NODE_ENV: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    MONGODB_URI: string;
  };
  session: any;
  authConfigCheck: {
    hasGoogleProvider: boolean;
    hasMongoAdapter: boolean;
    hasCallbacks: boolean;
  };
}

export default function DebugAuth({ env, session, authConfigCheck }: DebugAuthProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔍 NextAuth Debug Information</h1>
      
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>📋 Environment Variables Status</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div>
            <strong>NEXTAUTH_URL:</strong> 
            <span style={{ color: env.NEXTAUTH_URL === 'http://localhost:3000' ? 'green' : 'red', marginLeft: '10px' }}>
              {env.NEXTAUTH_URL || 'Missing ❌'}
            </span>
            {env.NEXTAUTH_URL !== 'http://localhost:3000' && (
              <div style={{ color: 'red', fontSize: '12px' }}>
                ⚠️ Should be: http://localhost:3000 for local development
              </div>
            )}
          </div>
          
          <div>
            <strong>NODE_ENV:</strong> 
            <span style={{ marginLeft: '10px', color: 'blue' }}>{env.NODE_ENV}</span>
          </div>
          
          <div>
            <strong>GOOGLE_CLIENT_ID:</strong> 
            <span style={{ color: env.GOOGLE_CLIENT_ID ? 'green' : 'red', marginLeft: '10px' }}>
              {env.GOOGLE_CLIENT_ID ? `Set ✅ (${env.GOOGLE_CLIENT_ID.substring(0, 20)}...)` : 'Missing ❌'}
            </span>
          </div>
          
          <div>
            <strong>GOOGLE_CLIENT_SECRET:</strong> 
            <span style={{ color: env.GOOGLE_CLIENT_SECRET ? 'green' : 'red', marginLeft: '10px' }}>
              {env.GOOGLE_CLIENT_SECRET ? `Set ✅ (${env.GOOGLE_CLIENT_SECRET.substring(0, 10)}...)` : 'Missing ❌'}
            </span>
          </div>
          
          <div>
            <strong>NEXTAUTH_SECRET:</strong> 
            <span style={{ color: env.NEXTAUTH_SECRET ? 'green' : 'red', marginLeft: '10px' }}>
              {env.NEXTAUTH_SECRET ? `Set ✅ (${env.NEXTAUTH_SECRET.substring(0, 10)}...)` : 'Missing ❌'}
            </span>
          </div>
          
          <div>
            <strong>MONGODB_URI:</strong> 
            <span style={{ color: env.MONGODB_URI ? 'green' : 'red', marginLeft: '10px' }}>
              {env.MONGODB_URI ? `Set ✅ (mongodb+srv://...)` : 'Missing ❌'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
        <h2>⚙️ NextAuth Configuration Status</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <div>
            <strong>Google Provider:</strong> 
            <span style={{ color: authConfigCheck.hasGoogleProvider ? 'green' : 'red', marginLeft: '10px' }}>
              {authConfigCheck.hasGoogleProvider ? 'Configured ✅' : 'Missing ❌'}
            </span>
          </div>
          
          <div>
            <strong>MongoDB Adapter:</strong> 
            <span style={{ color: authConfigCheck.hasMongoAdapter ? 'green' : 'red', marginLeft: '10px' }}>
              {authConfigCheck.hasMongoAdapter ? 'Configured ✅' : 'Missing ❌'}
            </span>
          </div>
          
          <div>
            <strong>Callbacks:</strong> 
            <span style={{ color: authConfigCheck.hasCallbacks ? 'green' : 'red', marginLeft: '10px' }}>
              {authConfigCheck.hasCallbacks ? 'Configured ✅' : 'Missing ❌'}
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff5f5', borderRadius: '5px' }}>
        <h2>🔐 Current Session Status</h2>
        {session ? (
          <div>
            <div style={{ color: 'green' }}>✅ User is signed in</div>
            <div><strong>Email:</strong> {session.user?.email}</div>
            <div><strong>Name:</strong> {session.user?.name}</div>
            <div><strong>Is Admin:</strong> {(session.user as any)?.isAdmin ? 'Yes' : 'No'}</div>
          </div>
        ) : (
          <div style={{ color: 'red' }}>❌ No active session</div>
        )}
      </div>

      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f0fff0', borderRadius: '5px' }}>
        <h2>🔗 Expected OAuth URLs</h2>
        <div style={{ fontSize: '14px' }}>
          <div><strong>Sign-in URL:</strong> http://localhost:3000/api/auth/signin</div>
          <div><strong>Callback URL:</strong> http://localhost:3000/api/auth/callback/google</div>
          <div><strong>Sign-out URL:</strong> http://localhost:3000/api/auth/signout</div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>🧪 Test Authentication</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <a 
            href="/api/auth/signin" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#4285f4', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Test NextAuth Sign In
          </a>
          
          <a 
            href="/api/auth/signin/google" 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#db4437', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Direct Google Sign In
          </a>
          
          {session && (
            <a 
              href="/api/auth/signout" 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#666', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '5px' 
              }}
            >
              Sign Out
            </a>
          )}
        </div>
      </div>

      <div style={{ padding: '15px', backgroundColor: '#fffbf0', borderRadius: '5px', fontSize: '12px' }}>
        <h3>📝 Troubleshooting Tips</h3>
        <ol style={{ margin: 0, paddingLeft: '20px' }}>
          <li>All environment variables should show green checkmarks</li>
          <li>NEXTAUTH_URL must be exactly: http://localhost:3000</li>
          <li>Google Console should have redirect URI: http://localhost:3000/api/auth/callback/google</li>
          <li>If still failing, check browser developer console for errors</li>
          <li>Try the direct Google sign-in link above</li>
        </ol>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Get current session
    const session = await getServerSession(context.req, context.res, authOptions);
    
    // Check auth configuration
    const authConfigCheck = {
      hasGoogleProvider: authOptions.providers?.some((p: any) => p.id === 'google') || false,
      hasMongoAdapter: !!authOptions.adapter,
      hasCallbacks: !!authOptions.callbacks
    };

    return {
      props: {
        env: {
          NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'Not set',
          NODE_ENV: process.env.NODE_ENV || 'Not set',
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
          MONGODB_URI: process.env.MONGODB_URI || '',
        },
        session: session || null,
        authConfigCheck
      }
    };
  } catch (error) {
    console.error('Debug page error:', error);
    return {
      props: {
        env: {
          NEXTAUTH_URL: 'Error loading',
          NODE_ENV: 'Error loading',
          GOOGLE_CLIENT_ID: '',
          GOOGLE_CLIENT_SECRET: '',
          NEXTAUTH_SECRET: '',
          MONGODB_URI: '',
        },
        session: null,
        authConfigCheck: {
          hasGoogleProvider: false,
          hasMongoAdapter: false,
          hasCallbacks: false
        }
      }
    };
  }
};