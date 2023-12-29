import { DM_Sans } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import Head from 'next/head'

const inter = DM_Sans({ subsets: ['latin'], weight: '400' });

export const metadata = {
    title: 'Taskr',
    description: 'Taskr is a task management application',
    author: '@taskrapp',
};

export default function RootLayout({ children }) {
    return (
        <>
        <Head>
            <title>Taskr</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={twMerge('bg-background', inter.className)}>
            {children}
        </div>
        </>
    )
}
