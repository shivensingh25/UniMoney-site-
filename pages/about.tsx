import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const About = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-32 pb-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-96 h-96 -top-48 -right-48 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute w-80 h-80 -bottom-32 -left-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 180, 90],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Empowering
              </motion.span>
              {" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Dreams
              </motion.span>
              <br />
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Through
              </motion.span>
              {" "}
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Education
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="relative"
            >
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                We're on a mission to make international education accessible to every student by 
                simplifying the loan application process and connecting you with the best lenders.
              </p>
              
              {/* Floating Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  { number: "1000+", label: "Students Helped", icon: "🎓" },
                  { number: "50+", label: "Partner Lenders", icon: "🏦" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.6 + (index * 0.2),
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/20"
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-indigo-600 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Floating Mission Icon */}
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-white text-xl">🎯</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Mission
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Every year, thousands of Indian students dream of studying abroad but face 
                significant challenges in securing education loans. Complex application processes, 
                unclear terms, and limited options often prevent students from pursuing their dreams.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                UniMoney was born from the belief that every student deserves access to quality 
                education, regardless of their financial background. We're building the future of 
                student financing.
              </p>
              
              {/* Mission Progress Indicators */}
              <div className="space-y-4 pt-4">
                {[
                  { label: "Loan Process Simplification", progress: 95 },
                  { label: "Student Satisfaction", progress: 92 },
                  { label: "Partner Network Growth", progress: 88 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 font-medium">{item.label}</span>
                      <span className="text-indigo-600 font-semibold">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-60"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, rgb(238, 242, 255), rgb(243, 232, 255))",
                    "linear-gradient(to bottom right, rgb(243, 232, 255), rgb(238, 242, 255))",
                    "linear-gradient(to bottom right, rgb(238, 242, 255), rgb(243, 232, 255))"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Floating Vision Icon */}
              <motion.div
                className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-white text-sm">👁️</span>
              </motion.div>
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-3xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Our Vision
                </motion.h3>
                <motion.p 
                  className="text-gray-600 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  To become the leading platform for international education financing, 
                  empowering students to pursue their academic dreams without financial barriers.
                </motion.p>
                
                {/* Vision Goals */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 space-y-3"
                >
                  {[
                    "Global education accessibility",
                    "Financial inclusion for all students", 
                    "Transparent loan processes"
                  ].map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
                      className="flex items-center space-x-3"
                    >
                      <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      />
                      <span className="text-gray-700 font-medium">{goal}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Values Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                ⭐ Our Core Values
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                The principles that
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                guide everything we do
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description: "We believe in complete transparency. No hidden fees, no surprises. Every detail about your loan options is clearly presented.",
                icon: "🔍",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50"
              },
              {
                title: "Accessibility",
                description: "Education should be accessible to all. We work with lenders who understand the unique needs of international students.",
                icon: "🌍",
                color: "from-green-500 to-emerald-500",
                bgColor: "from-green-50 to-emerald-50"
              },
              {
                title: "Innovation",
                description: "We're constantly innovating to make the loan application process faster, simpler, and more user-friendly.",
                icon: "⚡",
                color: "from-purple-500 to-indigo-500",
                bgColor: "from-purple-50 to-indigo-50"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (index * 0.2),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`relative bg-gradient-to-br ${value.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center group overflow-hidden`}
              >
                {/* Animated background particles */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  initial={false}
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                      "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Floating particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${value.color} rounded-full opacity-60`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                {/* Icon container with animation */}
                <motion.div
                  className={`relative w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                  }}
                  animate={{
                    boxShadow: [
                      "0 5px 15px rgba(0, 0, 0, 0.1)",
                      "0 8px 25px rgba(0, 0, 0, 0.15)",
                      "0 5px 15px rgba(0, 0, 0, 0.1)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.span
                    className="text-4xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {value.icon}
                  </motion.span>
                  
                  {/* Ripple effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${value.color} opacity-20`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0, 0.2]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                >
                  {value.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                >
                  {value.description}
                </motion.p>
                
                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Team Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="inline-block mb-4"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
                👥 Meet Our Team
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                Passionate individuals working to
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                transform education financing
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                name: "Praditha",
                role: "Co-Founder & CEO",
                description: "Former international student with deep understanding of the challenges students face in securing education loans.",
                image: "/founders/Praditha.jpeg",
                skills: ["Leadership", "Strategy", "Student Experience"],
                color: "from-blue-500 to-purple-600",
                bgGradient: "from-blue-50 to-purple-50"
              },
              {
                name: "Shiven",
                role: "Co-Founder & CTO",
                description: "Technology enthusiast focused on building intuitive solutions that make complex financial processes simple.",
                image: "/founders/Shiven.jpeg",
                skills: ["Technology", "Product", "Innovation"],
                color: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-50"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (index * 0.3),
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`relative bg-gradient-to-br ${member.bgGradient} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 group overflow-hidden`}
              >
                {/* Animated background elements */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-transparent"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Profile Section */}
                <div className="flex items-start mb-6 relative z-10">
                  <motion.div
                    className="relative mr-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Profile picture with animated border */}
                    <motion.div
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${member.color} p-1`}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                    
                    {/* Online indicator */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-indigo-700 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      {member.name}
                    </motion.h3>
                    
                    {/* Animated role badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                      className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${member.color} text-white text-sm font-semibold shadow-lg mb-2`}
                    >
                      {member.role}
                    </motion.div>
                  </div>
                </div>
                
                <motion.p 
                  className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                >
                  {member.description}
                </motion.p>
                
                {/* Skills section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                  className="space-y-3"
                >
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.8 + (index * 0.1) + (skillIndex * 0.1) 
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm hover:shadow-md transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-10"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${member.color} rounded-full`}></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-12 text-center overflow-hidden"
        >
          {/* Animated background patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-64 h-64 -top-32 -right-32 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute w-48 h-48 -bottom-24 -left-24 bg-white/10 rounded-full"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.2, 0.1, 0.2]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm font-medium mb-4">
                <span>🚀</span>
                <span>Ready to transform your future?</span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Ready to Start
              </motion.span>
              <br />
              <motion.span
                className="inline-block"
                initial={{ rotateX: 90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Your Journey?
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Join thousands of students who have found their perfect loan match with UniMoney.
            </motion.p>
            

            
            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.button 
                onClick={() => router.push('/loan-compare')}
                className="relative group px-10 py-5 bg-white text-indigo-600 font-bold rounded-2xl text-lg shadow-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(0, 0, 0, 0.2)",
                    "0 15px 40px rgba(0, 0, 0, 0.3)",
                    "0 10px 30px rgba(0, 0, 0, 0.2)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Button ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-10"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Compare Loans Now</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      </div>
    </Layout>
  );
};

export default About;
