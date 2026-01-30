import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Zap, Sparkles, Star, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));

    // Real-time validation
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
    if (name === 'password' && value) {
      if (value.length < 6) {
        setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('User Login:', formData);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F2] relative overflow-hidden font-sans">
      {/* Animated 3D Background - Party Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Disco Ball Effect */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-24"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#D9F99D] to-black rounded-full shadow-2xl border-4 border-white"></div>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Floating Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Star className="w-6 h-6 text-[#D9F99D] fill-current" />
          </motion.div>
        ))}

        {/* Music Notes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`music-${i}`}
            className="absolute"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 20, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8
            }}
          >
            <Music className="w-8 h-8 text-black opacity-20" />
          </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Sparkles className="w-5 h-5 text-[#D9F99D]" />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#D9F99D] rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-black rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo/Brand */}
          <motion.div 
            className="text-center mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Zap className="text-[#D9F99D] w-7 h-7 fill-current" />
              </div>
              <span className="font-black text-4xl tracking-tight">EventsHUB</span>
            </div>
            <p className="text-gray-600 font-medium">Welcome Back, Event Goer!</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm border-2 border-black rounded-3xl p-8 shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    data-testid="user-login-email-input"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium bg-white`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="user-login-email-error"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    data-testid="user-login-password-input"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium bg-white`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="user-login-password-error"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    data-testid="user-login-remember-checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-[#D9F99D] cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  data-testid="user-login-forgot-password-link"
                  className="text-sm font-bold text-black hover:text-gray-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                data-testid="user-login-submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    Let's Go!
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">
                New to EventsHUB?{' '}
                <Link
                  to="/user-signup"
                  data-testid="user-login-signup-link"
                  className="text-black font-bold hover:text-gray-600 transition-colors"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Club Login Link */}
            <div className="mt-4 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Are you a club organizer?{' '}
                <Link
                  to="/club-login"
                  data-testid="user-login-club-login-link"
                  className="text-black font-bold hover:text-gray-600 transition-colors"
                >
                  Club login
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Fun Badge */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 text-[#D9F99D]" />
              <span className="text-gray-700">Join 10,000+ event enthusiasts</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
