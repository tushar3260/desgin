import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Tag, Image as ImageIcon, 
  Link as LinkIcon, Plus, X, Rocket, ArrowRight, Zap, Trash2, User
} from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 

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
    organizerPhone: '', // Backend accept karta hai optional phone
    rules: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Rules Logic ---
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
      const response = await api.post('/events/create', formData);
      
      if (response.data.success) {
        alert("Event Created Successfully! 🚀");
        navigate('/all-events'); 
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(error.response?.data?.message || "Something went wrong while creating event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-black font-sans">
      <Nav />
      <div className="pt-28 pb-12 px-4 sm:px-6">
        <motion.div 
          initial={{ y: 10, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="max-w-4xl mx-auto bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Header */}
          <div className="bg-black p-5 flex flex-row justify-between items-center border-b-2 border-black">
            <div>
              <h1 className="text-[#D9F99D] text-xl font-black italic tracking-tighter flex items-center gap-2">
                <Rocket size={20} className="fill-current" /> HOST EVENT
              </h1>
              <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Launch on EventsHUB</p>
            </div>
            <div className="bg-[#D9F99D] px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-white">
              SOCIETY PORTAL
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 text-xs font-bold uppercase tracking-wider text-gray-500">
            
            {/* Section 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-1.5">Event Title *</label>
                <input required name="title" value={formData.title} onChange={handleChange}
                  placeholder="CODE-A-THON 2026"
                  className="w-full border-2 border-black p-2.5 focus:bg-[#D9F99D]/5 outline-none transition-all text-black font-medium" />
              </div>

              <div>
                <label className="block mb-1.5">Category</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={14} />
                  <select name="category" value={formData.category} onChange={handleChange}
                    className="w-full border-2 border-black p-2.5 pl-9 focus:bg-[#D9F99D]/5 outline-none bg-white text-black appearance-none">
                    {['Hackathon', 'Workshop', 'Cultural', 'Sports', 'Seminar', 'Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">Status</label>
                <select name="registrationStatus" value={formData.registrationStatus} onChange={handleChange}
                  className="w-full border-2 border-black p-2.5 focus:bg-[#D9F99D]/5 outline-none bg-white text-black">
                  {['Open', 'Closed', 'Coming Soon'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Section 2: Dates & Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1.5">Start Date *</label>
                <input type="datetime-local" required name="startDate" value={formData.startDate} onChange={handleChange}
                  className="w-full border-2 border-black p-2.5 focus:bg-[#D9F99D]/5 outline-none text-black" />
              </div>
              <div>
                <label className="block mb-1.5">End Date *</label>
                <input type="datetime-local" required name="endDate" value={formData.endDate} onChange={handleChange}
                  className="w-full border-2 border-black p-2.5 focus:bg-[#D9F99D]/5 outline-none text-black" />
              </div>
              <div>
                <label className="block mb-1.5">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={14} />
                  <input required name="location" value={formData.location} onChange={handleChange}
                    placeholder="MAIN AUDITORIUM"
                    className="w-full border-2 border-black p-2.5 pl-9 focus:bg-[#D9F99D]/5 outline-none text-black" />
                </div>
              </div>
            </div>

            {/* Section 3: Optional Contact */}
            <div className="bg-gray-50 p-4 border-2 border-black">
              <h3 className="font-black text-black flex items-center gap-2 italic mb-3">
                <User size={16}/> CONTACT INFO
              </h3>
              <div>
                <label className="block mb-1.5">Organizer Phone (Optional)</label>
                <input name="organizerPhone" value={formData.organizerPhone} onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full border-2 border-black p-2.5 focus:bg-[#D9F99D]/5 outline-none text-black" />
              </div>
            </div>

            {/* Section 4: URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5">Banner Image URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={14} />
                  <input name="bannerImage" value={formData.bannerImage} onChange={handleChange} placeholder="HTTPS://IMAGE.PNG"
                    className="w-full border-2 border-black p-2.5 pl-9 outline-none text-black" />
                </div>
              </div>
              <div>
                <label className="block mb-1.5">Registration Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={14} />
                  <input name="registrationLink" value={formData.registrationLink} onChange={handleChange} placeholder="GOOGLE FORM LINK"
                    className="w-full border-2 border-black p-2.5 pl-9 outline-none text-black" />
                </div>
              </div>
            </div>

            {/* Section 5: Description */}
            <div>
              <label className="block mb-1.5">Event Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3"
                placeholder="DESCRIBE THE EVENT DETAILS..."
                className="w-full border-2 border-black p-2.5 focus:bg-[#D9F99D]/5 outline-none text-black font-medium" />
            </div>

            {/* Section 6: Rules */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label>Event Rules</label>
                <button type="button" onClick={addRule} className="text-[9px] underline text-black decoration-[#D9F99D] decoration-2">+ NEW RULE</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex gap-2">
                    <input value={rule} onChange={(e) => handleRuleChange(index, e.target.value)}
                      placeholder={`RULE #${index + 1}`}
                      className="flex-1 border border-black p-2 outline-none text-black text-[10px]" />
                    <button type="button" onClick={() => removeRule(index)} className="text-red-500"><X size={16}/></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-black text-[#D9F99D] py-4 border-b-4 border-r-4 border-gray-700 font-black text-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                {isSubmitting ? (
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Zap size={20} />
                   </motion.div>
                ) : (
                  <>PUBLISH EVENT <ArrowRight size={20} /></>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEvent;