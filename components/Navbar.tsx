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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/100 shadow-lg' : 'bg-transparent'
    }`}>
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
          
          <div className="flex items-center">
            <Link href="/loan-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              Payments
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 