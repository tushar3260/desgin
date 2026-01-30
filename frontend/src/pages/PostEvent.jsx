import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Tag, Image as ImageIcon, 
  Link as LinkIcon, Plus, X, Rocket, ArrowRight, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Aapka axios instance path

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Hackathon',
    startDate: '',
    endDate: '',
    location: '',
    bannerImage: '',
    registrationStatus: 'Open',
    registrationLink: '',
    organizerPhone: '', // Backend extra phone accept karta hai
    rules: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Logic for Dynamic Rules ---
  const addRule = () => setFormData(prev => ({ ...prev, rules: [...prev.rules, ''] }));
  
  const handleRuleChange = (index, value) => {
    const updatedRules = [...formData.rules];
    updatedRules[index] = value;
    setFormData(prev => ({ ...prev, rules: updatedRules }));
  };

  const removeRule = (index) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, rules: updatedRules }));
  };

  // --- Submit to Backend ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Backend expects rules as an array of strings, hum wahi bhej rahe hain
      const response = await api.post('/events/create', formData);
      
      if (response.data.success) {
        alert("Event Created Successfully! 🚀");
        navigate('/all-events'); // Redirect to events list
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error.response?.data?.message || "Something went wrong while creating event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F2] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto bg-white border-2 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-black p-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-[#D9F99D] text-3xl font-black italic tracking-tighter flex items-center gap-2">
              <Rocket className="fill-current" /> HOST AN EVENT
            </h1>
            <p className="text-gray-400 font-medium">Launch your event on EventsHUB</p>
          </div>
          <div className="bg-[#D9F99D] px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest border-2 border-white shadow-sm">
            Club Organizer
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-black mb-2 uppercase tracking-wide">Event Title *</label>
              <input required name="title" value={formData.title} onChange={handleChange}
                placeholder="e.g. Code-A-Thon 2024"
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-black outline-none transition-all font-medium" />
            </div>

            <div>
              <label className="block text-sm font-black mb-2 uppercase">Category *</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select name="category" value={formData.category} onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-black outline-none bg-white font-medium appearance-none">
                  {['Hackathon', 'Workshop', 'Cultural', 'Sports', 'Seminar', 'Other'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-black mb-2 uppercase tracking-wide">Contact Phone (Optional)</label>
              <input name="organizerPhone" value={formData.organizerPhone} onChange={handleChange}
                placeholder="e.g. +91 9876543210"
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-black outline-none font-medium" />
            </div>
          </div>

          {/* Section 2: Dates & Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-black mb-2 uppercase">Start Date *</label>
              <input type="datetime-local" required name="startDate" value={formData.startDate} onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-black outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-black mb-2 uppercase">End Date *</label>
              <input type="datetime-local" required name="endDate" value={formData.endDate} onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-black outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-black mb-2 uppercase">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="location" value={formData.location} onChange={handleChange}
                  placeholder="Auditorium or Online"
                  className="w-full border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-black outline-none font-medium" />
              </div>
            </div>
          </div>

          {/* Section 3: Description & Links */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-black mb-2 uppercase">Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="4"
                placeholder="What is this event about?"
                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-black outline-none font-medium" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black mb-2 uppercase">Banner Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input name="bannerImage" value={formData.bannerImage} onChange={handleChange} placeholder="https://image-link.com"
                    className="w-full border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-black outline-none font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-black mb-2 uppercase">Registration Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input name="registrationLink" value={formData.registrationLink} onChange={handleChange} placeholder="Google Form or Website"
                    className="w-full border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-black outline-none font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Rules */}
          <div>
            <label className="block text-sm font-black mb-2 uppercase tracking-widest flex justify-between items-center">
              Event Rules
              <button type="button" onClick={addRule} className="text-xs bg-black text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#D9F99D] hover:text-black transition-colors">
                <Plus size={14}/> Add Rule
              </button>
            </label>
            <div className="space-y-3">
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex gap-2">
                  <input value={rule} onChange={(e) => handleRuleChange(index, e.target.value)}
                    placeholder={`Rule #${index + 1}`}
                    className="flex-1 border-2 border-gray-200 rounded-xl py-2 px-4 focus:border-black outline-none font-medium" />
                  <button type="button" onClick={() => removeRule(index)} className="text-red-400 hover:text-red-600 px-2">
                    <X size={20}/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button type="submit" disabled={isSubmitting}
              className="w-full bg-black text-[#D9F99D] py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.5)] transition-all active:scale-95 border-b-4 border-gray-800 disabled:opacity-50">
              {isSubmitting ? (
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Zap className="w-6 h-6" />
                 </motion.div>
              ) : (
                <>PUBLISH EVENT NOW <ArrowRight /></>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvent;