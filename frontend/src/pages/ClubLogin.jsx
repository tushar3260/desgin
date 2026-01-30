import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Zap, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const ClubLogin = () => {
  const navigate = useNavigate();
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

    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/organizers/login", {
        email: formData.email,
        password: formData.password
      });

      // LocalStorage mein data save karein
      localStorage.setItem("organizerInfo", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      setIsSubmitting(false);
      navigate("/post-event"); // Login ke baad redirection
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F2] relative overflow-hidden font-sans">
      {/* Background elements preserved */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-32 h-20 bg-white border-2 border-black rounded-lg shadow-lg" animate={{ y: [0, -20, 0], rotate: [-5, 5, -5], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><div className="p-2"><Calendar className="w-6 h-6 text-black" /></div></motion.div>
        <motion.div className="absolute top-40 right-20 w-28 h-16 bg-[#D9F99D] border-2 border-black rounded-lg shadow-lg" animate={{ y: [0, 15, 0], rotate: [5, -5, 5], x: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><div className="p-2 flex items-center gap-1"><Users className="w-5 h-5 text-black" /><span className="text-xs font-bold">VIP</span></div></motion.div>
        <motion.div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#D9F99D] rounded-full blur-3xl opacity-20" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Zap className="text-[#D9F99D] w-7 h-7 fill-current" />
              </div>
              <span className="font-black text-4xl tracking-tight">EventsHUB</span>
            </div>
            <p className="text-gray-600 font-medium">Club Portal Login</p>
          </div>

          <motion.div className="bg-white border-2 border-black rounded-3xl p-8 shadow-xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className={`w-full pl-12 pr-4 py-3 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:outline-none transition-colors font-medium`} placeholder="Enter your password" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-2 focus:ring-[#D9F99D]" />
                  <span className="text-sm font-medium text-gray-700">Remember me</span>
                </label>
                <Link to="/forgot-password" size="sm" className="text-sm font-bold text-black hover:text-gray-600">Forgot password?</Link>
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50">
                {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Zap className="w-5 h-5" /></motion.div> : <>Login to Portal <ArrowRight className="w-5 h-5" /></>}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 font-medium">Don't have a club account? <Link to="/club-signup" className="text-black font-bold hover:text-gray-600">Register your club</Link></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClubLogin;