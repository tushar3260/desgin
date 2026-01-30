import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Building2, Zap, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'; // API import karein

const ClubSignup = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.clubName) newErrors.clubName = 'Club name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Agree to terms required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Backend mapping: clubName -> organizationName, name is also required by schema
      await api.post("/organizers/register", {
        name: formData.clubName, 
        email: formData.email,
        password: formData.password,
        organizationName: formData.clubName
      });

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert(error.response?.data?.message || "Registration failed");
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
          <h2 className="text-3xl font-black mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome <strong>{formData.clubName}</strong>. Your club account has been created successfully.
          </p>
          <Link
            to="/club-login"
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-10 right-10 w-40 h-40 bg-[#D9F99D] rounded-full blur-3xl opacity-30" animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 left-10 w-32 h-32 bg-black rounded-full blur-3xl opacity-10" animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute w-4 h-4" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} animate={{ y: [0, -30, 0], rotate: [0, 180, 360], scale: [1, 1.5, 1] }} transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}>
            {i % 2 === 0 ? <div className="w-full h-full bg-black rounded-full" /> : <Shield className="w-full h-full text-[#D9F99D]" />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div className="w-full max-w-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Zap className="text-[#D9F99D] w-7 h-7 fill-current" />
              </div>
              <span className="font-black text-4xl tracking-tight">EventsHUB</span>
            </div>
            <p className="text-gray-600 font-medium">Register Your Club</p>
          </div>

          <motion.div className="bg-white border-2 border-black rounded-3xl p-8 shadow-xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Club Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" name="clubName" value={formData.clubName} onChange={handleChange} className={`w-full pl-12 pr-4 py-3 border-2 ${errors.clubName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`} placeholder="Enter club name" />
                </div>
                {errors.clubName && <p className="text-red-500 text-sm mt-1">{errors.clubName}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full pl-12 pr-4 py-3 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`} placeholder="club@example.com" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className={`w-full pl-12 pr-4 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`} placeholder="Create a password" />
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div className={`h-full ${passwordStrength.color}`} initial={{ width: 0 }} animate={{ width: `${passwordStrength.strength}%` }} />
                      </div>
                      <span className="text-xs font-bold">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`w-full pl-12 pr-4 py-3 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`} placeholder="Confirm your password" />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-[#D9F99D]" />
                  <span className="text-sm text-gray-700">I agree to the <strong>Terms</strong> and <strong>Privacy Policy</strong></span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50">
                {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Zap className="w-5 h-5" /></motion.div> : <>Create Club Account <ArrowRight className="w-5 h-5" /></>}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">Already have an account? <Link to="/club-login" className="text-black font-bold hover:text-gray-600">Login here</Link></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClubSignup;