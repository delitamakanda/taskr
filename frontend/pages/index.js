import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage(props) {
  console.log(props);
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>;
  console.log(status);
  if (session) {
    router.push('/dashboard');
  }
  return (
    <>
        <main>
          <button onClick={() => signIn(undefined, { callbackUrl: '/dashboard'})}>Sign In</button>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </main>
    </>
  )
}
