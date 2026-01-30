import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Zap, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClubLogin = () => {
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
        console.log('Club Login:', formData);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F2] relative overflow-hidden font-sans">
      {/* Animated 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Tickets */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-20 bg-white border-2 border-black rounded-lg shadow-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2">
            <Calendar className="w-6 h-6 text-black" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-28 h-16 bg-[#D9F99D] border-2 border-black rounded-lg shadow-lg"
          animate={{
            y: [0, 15, 0],
            rotate: [5, -5, 5],
            x: [0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="p-2 flex items-center gap-1">
            <Users className="w-5 h-5 text-black" />
            <span className="text-xs font-bold">VIP</span>
          </div>
        </motion.div>

        {/* Confetti Pieces */}
        {[...Array(8)].map((_, i) => (
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

        {/* Stage Spotlight Effect */}
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
            <p className="text-gray-600 font-medium">Club Portal Login</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-white border-2 border-black rounded-3xl p-8 shadow-xl"
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
                    data-testid="club-login-email-input"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`}
                    placeholder="club@example.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="club-login-email-error"
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
                    data-testid="club-login-password-input"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="club-login-password-error"
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
                    data-testid="club-login-remember-checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-[#D9F99D] cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  data-testid="club-login-forgot-password-link"
                  className="text-sm font-bold text-black hover:text-gray-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                data-testid="club-login-submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Login to Portal
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">
                Don't have a club account?{' '}
                <Link
                  to="/club-signup"
                  data-testid="club-login-signup-link"
                  className="text-black font-bold hover:text-gray-600 transition-colors"
                >
                  Register your club
                </Link>
              </p>
            </div>

            {/* User Login Link */}
            <div className="mt-4 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Looking for user login?{' '}
                <Link
                  to="/user-login"
                  data-testid="club-login-user-login-link"
                  className="text-black font-bold hover:text-gray-600 transition-colors"
                >
                  Click here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Feature Badges */}
      <motion.div
        className="fixed bottom-8 right-8 bg-white border-2 border-black rounded-full px-4 py-2 shadow-lg hidden lg:flex items-center gap-2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <span className="text-sm font-bold">Secure Login</span>
      </motion.div>
    </div>
  );
};

export default ClubLogin;
