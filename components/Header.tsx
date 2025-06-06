import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <p className="text-sm text-yellow-800 text-center">
            Disclaimer: This is a concept in development and not a licensed financial service. We are currently exploring regulatory requirements.
          </p>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/brand/logo/Logo.png"
                  alt="UniMoney Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#4355FF] text-xl font-semibold">UniMoney</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/loan-dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              Payments
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 