import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function AuthTest() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Session status:', status)
    console.log('Session data:', session)
  }, [session, status])

  if (status === 'loading') return <p>Loading...</p>

  if (session) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>✅ Signed in as {session.user?.email}</h1>
        <p><strong>Name:</strong> {session.user?.name}</p>
        <p><strong>Email:</strong> {session.user?.email}</p>
        <p><strong>Is Admin:</strong> {(session.user as any)?.isAdmin ? 'Yes' : 'No'}</p>
        
        <h2>Full Session Data:</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>❌ Not signed in</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </div>
  )
}