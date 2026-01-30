import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Building2, Zap, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClubSignup = () => {
  const [formData, setFormData] = useState({
    clubName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    if (strength <= 1) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (strength === 2) return { strength: 50, label: 'Fair', color: 'bg-orange-500' };
    if (strength === 3) return { strength: 75, label: 'Good', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
    if (name === 'clubName' && value) {
      if (value.length < 3) {
        setErrors(prev => ({ ...prev, clubName: 'Club name must be at least 3 characters' }));
      } else {
        setErrors(prev => ({ ...prev, clubName: '' }));
      }
    }
    if (name === 'confirmPassword' && value) {
      if (value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.clubName) {
      newErrors.clubName = 'Club name is required';
    } else if (formData.clubName.length < 3) {
      newErrors.clubName = 'Club name must be at least 3 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Club Signup:', formData);
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 1500);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-2 border-black rounded-3xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black mb-4">Verification Email Sent!</h2>
          <p className="text-gray-600 mb-6" data-testid="club-signup-success-message">
            We've sent a verification email to <strong>{formData.email}</strong>. 
            Please check your inbox and verify your account to get started.
          </p>
          <Link
            to="/club-login"
            data-testid="club-signup-success-login-link"
            className="inline-block bg-black text-[#D9F99D] px-8 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F2] relative overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-40 h-40 bg-[#D9F99D] rounded-full blur-3xl opacity-30"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-32 h-32 bg-black rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        {/* Floating Event Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {i % 2 === 0 ? (
              <div className="w-full h-full bg-black rounded-full" />
            ) : (
              <Shield className="w-full h-full text-[#D9F99D]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-lg"
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
            <p className="text-gray-600 font-medium">Register Your Club</p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-white border-2 border-black rounded-3xl p-8 shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Club Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Club Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="clubName"
                    data-testid="club-signup-name-input"
                    value={formData.clubName}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.clubName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`}
                    placeholder="Enter club name"
                  />
                </div>
                {errors.clubName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="club-signup-name-error"
                  >
                    {errors.clubName}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    data-testid="club-signup-email-input"
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
                    data-testid="club-signup-email-error"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    data-testid="club-signup-password-input"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`}
                    placeholder="Create a password"
                  />
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="club-signup-password-error"
                  >
                    {errors.password}
                  </motion.p>
                )}
                {formData.password && (
                  <div className="mt-2" data-testid="club-signup-password-strength">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${passwordStrength.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength.strength}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    data-testid="club-signup-confirm-password-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`}
                    placeholder="Confirm your password"
                  />
                  {formData.confirmPassword && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {formData.password === formData.confirmPassword ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="club-signup-confirm-password-error"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    data-testid="club-signup-terms-checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-[#D9F99D] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="font-bold text-black hover:text-gray-600">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-bold text-black hover:text-gray-600">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium"
                    data-testid="club-signup-terms-error"
                  >
                    {errors.agreeToTerms}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                data-testid="club-signup-submit-button"
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
                    Create Club Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">
                Already have an account?{' '}
                <Link
                  to="/club-login"
                  data-testid="club-signup-login-link"
                  className="text-black font-bold hover:text-gray-600 transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>

            {/* User Signup Link */}
            <div className="mt-4 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Looking for user registration?{' '}
                <Link
                  to="/user-signup"
                  data-testid="club-signup-user-signup-link"
                  className="text-black font-bold hover:text-gray-600 transition-colors"
                >
                  Click here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClubSignup;
