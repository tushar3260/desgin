import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Zap, Star, Lock, ShieldCheck, CheckCircle2, ArrowRight, Timer, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Password Strength Logic
  const checkStrength = (pass) => {
    if (!pass) return { label: "", color: "bg-gray-200", width: "0%" };
    if (pass.length < 6) return { label: "Weak ⚠️", color: "bg-red-500", width: "33%" };
    if (pass.length < 10) return { label: "Good 👍", color: "bg-yellow-500", width: "66%" };
    return { label: "Strong 💪", color: "bg-green-500", width: "100%" };
  };

  const strength = checkStrength(passwords.new);

  const handleResendOtp = () => {
    setTimer(30);
    setCanResend(false);
    console.log("OTP Resent to:", email);
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return setError('Valid email is required');
    setIsSubmitting(true);
    setTimeout(() => { 
      setIsSubmitting(false); 
      setStep(2); 
      setError('');
    }, 1500);
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) element.nextSibling.focus();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new.length < 6) return setError('Min 6 characters required');
    if (passwords.new !== passwords.confirm) return setError('Passwords do not match');
    setIsSubmitting(true);
    setTimeout(() => { 
      setIsSubmitting(false); 
      setStep(4); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F2] relative overflow-hidden font-sans flex items-center justify-center px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-[#D9F99D] to-black rounded-full border-4 border-white blur-[2px] opacity-30" />
        {[...Array(6)].map((_, i) => (
          <Star key={i} className="absolute text-[#D9F99D] fill-current opacity-40" style={{ top: `${i * 15}%`, left: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <motion.div className="w-full max-w-md relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Zap className="text-[#D9F99D] w-6 h-6 fill-current" />
            </div>
            <span className="font-black text-3xl">EventsHUB</span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md border-2 border-black rounded-3xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Email */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit">
                <h2 className="text-2xl font-black mb-2">Forgot Password? 🔑</h2>
                <p className="text-gray-600 mb-6 font-medium">Enter email to receive a 4-digit OTP.</p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="email" placeholder="your@email.com" 
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black outline-none bg-white"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
                  <button className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending..." : "Send OTP"} <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit">
                <h2 className="text-2xl font-black mb-2">Verify OTP 🛡️</h2>
                <div className="bg-[#D9F99D]/20 border border-[#D9F99D] rounded-xl p-3 mb-6">
                  <p className="text-sm text-black font-medium leading-relaxed italic">
                    📩 Code sent to <span className="font-bold">{email}</span>. Check your Inbox/Spam.
                  </p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
                  <div className="flex justify-between gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index} type="text" maxLength="1"
                        className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-black outline-none bg-white focus:bg-[#D9F99D]/10"
                        value={data} onChange={e => handleOtpChange(e.target, index)}
                      />
                    ))}
                  </div>
                  <button className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold">Verify Code</button>
                  <div className="text-center">
                    {canResend ? (
                      <button type="button" onClick={handleResendOtp} className="inline-flex items-center gap-2 text-black font-bold hover:scale-105 transition-transform">
                        <RotateCcw size={16} /> Resend OTP
                      </button>
                    ) : (
                      <p className="text-gray-500 font-medium flex items-center justify-center gap-2"><Timer size={16} /> Resend in {timer}s</p>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: New Password with Eye Button and Strength Meter */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit">
                <h2 className="text-2xl font-black mb-2">New Password 🔒</h2>
                <p className="text-gray-600 mb-6 font-medium text-sm">Create a strong password to secure your account.</p>
                
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  {/* New Password Input */}
                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="New Password" 
                        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-black outline-none bg-white transition-all"
                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {/* Strength Meter Bar */}
                    {passwords.new && (
                      <div className="px-1 pt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Strength:</span>
                          <span className="text-[10px] font-bold text-black uppercase">{strength.label}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: strength.width }}
                            className={`h-full ${strength.color} transition-all duration-500`}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Confirm Password" 
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black outline-none bg-white"
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
                  <button className="w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold shadow-lg hover:translate-y-[-2px] transition-transform active:scale-95">
                    Update Password
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 4: Success Message */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" className="text-center">
                <div className="w-20 h-20 bg-[#D9F99D] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </div>
                <h2 className="text-2xl font-black mb-2">Updated! 🎉</h2>
                <p className="text-gray-600 mb-8 font-medium italic text-sm">Password change successful. You can now login with your new credentials.</p>
                <Link to="/user-login" className="block w-full bg-black text-[#D9F99D] py-4 rounded-xl font-bold text-center">
                  Go to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 4 && (
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link to="/user-login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors">
                <ArrowLeft size={16} /> Back to Login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordFlow;