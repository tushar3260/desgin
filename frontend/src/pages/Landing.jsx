import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Building2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F2] text-[#1A1A1A] font-sans selection:bg-[#D9F99D] selection:text-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i % 3 === 0 ? '#D9F99D' : i % 3 === 1 ? '#000' : '#fff',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360, 720],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        <motion.div
          className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#D9F99D] rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 md:px-8 pt-20 pb-12">
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Logo */}
              <motion.div 
                className="inline-flex items-center gap-3 mb-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Zap className="text-[#D9F99D] w-9 h-9 fill-current" />
                </div>
                <span className="font-black text-6xl md:text-7xl tracking-tight">EventsHUB</span>
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium mb-6 shadow-sm">
                  <Sparkles className="w-4 h-4 text-[#D9F99D]" />
                  <span>Where Events Come Alive</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-6 uppercase"
              >
                Discover <br className="md:hidden" />
                <span className="text-gray-300">Amazing</span> Events
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 font-medium"
              >
                Join thousands of event enthusiasts and organizers creating unforgettable experiences
              </motion.p>

              {/* CTA Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              >
                {/* User Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white border-2 border-black rounded-3xl p-8 text-left shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-14 h-14 bg-[#D9F99D] rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">I'm an Attendee</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    Discover and join exciting events in your area
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/user-login"
                      data-testid="landing-user-login-link"
                      className="block w-full bg-black text-[#D9F99D] py-3 rounded-xl font-bold text-center hover:bg-gray-900 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/user-signup"
                      data-testid="landing-user-signup-link"
                      className="block w-full border-2 border-black text-black py-3 rounded-xl font-bold text-center hover:bg-gray-50 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                </motion.div>

                {/* Club Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-black text-white border-2 border-black rounded-3xl p-8 text-left shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="w-14 h-14 bg-[#D9F99D] rounded-full flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">I'm an Organizer</h3>
                  <p className="text-gray-300 mb-6 font-medium">
                    Create and manage unforgettable events
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/club-login"
                      data-testid="landing-club-login-link"
                      className="block w-full bg-[#D9F99D] text-black py-3 rounded-xl font-bold text-center hover:bg-[#c9e98d] transition-colors"
                    >
                      Club Login
                    </Link>
                    <Link
                      to="/club-signup"
                      data-testid="landing-club-signup-link"
                      className="block w-full border-2 border-[#D9F99D] text-[#D9F99D] py-3 rounded-xl font-bold text-center hover:bg-[#D9F99D] hover:text-black transition-colors"
                    >
                      Register Club
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="py-12 px-4"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-black" />
              <h4 className="font-bold text-lg mb-2">Diverse Events</h4>
              <p className="text-gray-600 text-sm">Concerts, workshops, conferences & more</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <MapPin className="w-10 h-10 mx-auto mb-3 text-black" />
              <h4 className="font-bold text-lg mb-2">Local & Global</h4>
              <p className="text-gray-600 text-sm">Events from your neighborhood to worldwide</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <Zap className="w-10 h-10 mx-auto mb-3 text-black" />
              <h4 className="font-bold text-lg mb-2">Easy Management</h4>
              <p className="text-gray-600 text-sm">Powerful tools for organizers</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Landing;
