import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add keyboard shortcut for metrics dashboard (Ctrl+Shift+M)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        router.push('/metrics-dashboard');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrolled, router]);

  return (
    <>
      <div className="fixed w-full z-50 bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-sm text-yellow-800 text-center">
            Disclaimer: This is a concept in development and not a licensed financial service. We are currently exploring regulatory requirements.
          </p>
        </div>
      </div>
      <nav className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/100 shadow-lg' : 'bg-transparent'
      }`} style={{ top: '34px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center group">
                <div className="relative w-12 h-12 mr-3 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={imgError ? "/brand/logo/logo.png" : "/brand/logo/Logo.png"}
                    alt="UniMoney Logo"
                    fill
                    className="object-contain"
                    priority
                    onError={() => setImgError(true)}
                  />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 transform group-hover:scale-105 transition-transform duration-300">
                  UniMoney
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/loan-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                Payments
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 