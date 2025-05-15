import Image from 'next/image';

const Founders = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          ✨ Meet the Founders
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          {/* Founders Photos */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/founders/Shiven.jpeg"
                  alt="Shiven"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Shiven</h3>
                <p className="text-sm text-gray-600">Computer Science @ Monash</p>
              </div>
            </div>
            <div className="space-y-4 mt-12">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/founders/Praditha.jpeg"
                  alt="Praditha"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">Praditha</h3>
                <p className="text-sm text-gray-600">Finance @ Monash</p>
              </div>
            </div>
          </div>

          {/* Founders Story */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              We're Shiven and Praditha — just two international students who hit "apply" and got hit back with sky-high interest rates.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              UniMoney started from our own struggle to secure fair loans to study in Australia. I'm Shiven, a Computer Science undergrad at Monash who loves building things that actually solve problems. And I'm Praditha, a Master's student in Finance at Monash who's all about making money work smarter, not scarier.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Between the endless paperwork, crazy interest rates, and feeling like the system's not built for us — we knew something had to change. So we decided to build it ourselves.
            </p>

            <div className="mt-8 flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/shivensingh25/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Connect with Shiven
              </a>
              <span className="text-gray-300">|</span>
              <a 
                href="https://www.linkedin.com/in/praditha-narayan-4488891b2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Connect with Praditha
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders; 