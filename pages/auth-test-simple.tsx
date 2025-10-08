import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function AuthTestSimple() {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      console.log('🚀 Starting sign in process...');
      
      const result = await signIn('google', { 
        callbackUrl: '/auth-test-simple',
        redirect: false 
      });
      
      console.log('📝 Sign in result:', result);
      
      if (result?.error) {
        setError(`Sign in error: ${result.error}`);
        console.error('❌ Sign in failed:', result.error);
      }
    } catch (err) {
      console.error('❌ Exception during sign in:', err);
      setError(`Exception: ${err}`);
    }
  };

  const handleDirectSignIn = () => {
    console.log('🚀 Starting direct sign in...');
    signIn('google', { callbackUrl: '/auth-test-simple' });
  };

  if (status === 'loading') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>🔄 Loading session...</h1>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🧪 Simple Auth Test Page</h1>
      
      {session ? (
        <div style={{ backgroundColor: '#d4edda', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <h2>✅ Successfully Signed In!</h2>
          <div style={{ marginBottom: '10px' }}>
            <strong>Email:</strong> {session.user?.email}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Name:</strong> {session.user?.name}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>Admin:</strong> {(session.user as any)?.isAdmin ? 'Yes ✅' : 'No ❌'}
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/auth-test-simple' })}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#f8d7da', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <h2>❌ Not Signed In</h2>
          <p>Please sign in to test the authentication flow.</p>
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#f8d7da', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <h3>❌ Error:</h3>
          <pre style={{ color: 'red', fontSize: '14px' }}>{error}</pre>
        </div>
      )}

      {!session && (
        <div style={{ marginBottom: '30px' }}>
          <h3>🔐 Sign In Options:</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button 
              onClick={handleSignIn}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4285f4',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🔄 Sign In (No Redirect)
            </button>
            
            <button 
              onClick={handleDirectSignIn}
              style={{
                padding: '12px 24px',
                backgroundColor: '#db4437',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ➡️ Sign In (Direct)
            </button>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: '#e2e3e5', padding: '15px', borderRadius: '5px' }}>
        <h3>📋 Debug Info:</h3>
        <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
          <div><strong>Status:</strong> {status}</div>
          <div><strong>Session exists:</strong> {session ? 'Yes' : 'No'}</div>
          <div><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</div>
          <div><strong>Expected callback:</strong> http://localhost:3000/api/auth/callback/google</div>
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <h4>📝 Instructions:</h4>
        <ol>
          <li>Try "Sign In (No Redirect)" first - check browser console for errors</li>
          <li>If that fails, try "Sign In (Direct)" - this will redirect through Google</li>
          <li>Check the browser Network tab for failed requests</li>
          <li>Check the Next.js terminal console for NextAuth debug logs</li>
        </ol>
      </div>
    </div>
  );
}