import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Zap, Heart, Ticket, CheckCircle, XCircle, PartyPopper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
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
    if (name === 'fullName' && value) {
      if (value.length < 3) {
        setErrors(prev => ({ ...prev, fullName: 'Name must be at least 3 characters' }));
      } else {
        setErrors(prev => ({ ...prev, fullName: '' }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/users/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F4F4F2] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Celebration Animation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -100, opacity: 0, rotate: 0 }}
            animate={{
              y: window.innerHeight,
              opacity: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 0.5,
              repeat: Infinity,
            }}
          >
            <div
              className="w-3 h-3"
              style={{
                backgroundColor: ['#D9F99D', '#000', '#fff'][i % 3],
                borderRadius: i % 2 === 0 ? '50%' : '0',
              }}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-2 border-black rounded-3xl p-8 max-w-md w-full text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="w-20 h-20 bg-[#D9F99D] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <PartyPopper className="w-12 h-12 text-black" />
          </motion.div>
          <h2 className="text-3xl font-black mb-4">Welcome to EventsHUB!</h2>
          <p className="text-gray-600 mb-6" data-testid="user-signup-success-message">
            We've sent a verification email to <strong>{formData.email}</strong>. 
            Please verify your account to start exploring amazing events!
          </p>
          <Link
            to="/user-login"
            data-testid="user-signup-success-login-link"
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
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`ticket-${i}`}
            className="absolute"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [-10, 10, -10],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <Ticket className="w-10 h-10 text-[#D9F99D] opacity-30" />
          </motion.div>
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4
            }}
          >
            <Heart className="w-6 h-6 text-black fill-black" />
          </motion.div>
        ))}

        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-[#D9F99D] rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-black rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
            <p className="text-gray-600 font-medium">Start Your Event Journey</p>
          </motion.div>

          <motion.div
            className="bg-white/90 backdrop-blur-sm border-2 border-black rounded-3xl p-8 shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    data-testid="user-signup-name-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium bg-white`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 font-medium">{errors.fullName}</motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    data-testid="user-signup-email-input"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium bg-white`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 font-medium">{errors.email}</motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    data-testid="user-signup-password-input"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium bg-white`}
                    placeholder="Create a password"
                  />
                </div>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 font-medium">{errors.password}</motion.p>
                )}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${passwordStrength.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${passwordStrength.color.replace('bg-', 'text-')}`}>{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    data-testid="user-signup-confirm-password-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium bg-white`}
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
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1 font-medium">{errors.confirmPassword}</motion.p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-[#D9F99D] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the <a href="#" className="font-bold text-black">Terms</a> and <a href="#" className="font-bold text-black">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.agreeToTerms}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50 shadow-lg"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Zap className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>Join EventsHUB <ArrowRight className="w-5 h-5" /></>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">
                Already have an account? <Link to="/login" className="text-black font-bold hover:text-gray-600">Login here</Link>
              </p>
            </div>

            <div className="mt-4 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Want to organize events? <Link to="/club-signup" className="text-black font-bold hover:text-gray-600">Register as Club</Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSignup;