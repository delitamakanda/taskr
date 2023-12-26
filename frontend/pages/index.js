import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from '@mui/material'
import PublicLayout from '@/components/layouts/publicLayout';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';


const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') return <div>Loading...</div>;
  if (session) {
    return router.push('/');
  }
  return (
    <>
      <Head>
        <title>Taskr</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <Button onClick={props.toggleTheme} color="info">toggle theme</Button>
        </main>
        <Button onClick={() => signIn(undefined, { callbackUrl: '/'})} color="info">Sign In</Button>
      <PublicLayout />
    </>
  )
}
