import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // No metrics tracking
  }, [router]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
