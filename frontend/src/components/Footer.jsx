import React from 'react';
import { Zap, Globe } from 'lucide-react';

const Footer = () => {
  const socials = [
    { name: 'IG', href: '#' },
    { name: 'TW', href: '#' },
    { name: 'LN', href: '#' }
  ];

  return (
    <footer className="bg-[#F8F8F5] pt-20 pb-10 px-4 md:px-8 border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 pb-16 border-b-2 border-black">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <Zap className="text-[#D9F99D] w-6 h-6 fill-current" />
              </div>
              <span className="font-black text-3xl text-black uppercase italic tracking-tighter">
                EventHub
              </span>
            </div>
            <p className="text-gray-500 font-bold uppercase text-[10px] leading-relaxed max-w-xs">
              The central ecosystem for campus life. Manage societies, discover fests, and connect with your college community in one sharp interface.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-black uppercase text-xs mb-6 bg-black text-white inline-block px-2 py-1">
              Explore
            </h4>
            <ul className="space-y-3 text-gray-600 font-bold text-[11px] uppercase tracking-wider">
              <li><a href="/events" className="hover:text-blue-600 transition-colors">Upcoming Fests</a></li>
              <li><a href="/clubs" className="hover:text-blue-600 transition-colors">Society Directory</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Campus Map</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Past Highlights</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-black uppercase text-xs mb-6 bg-black text-white inline-block px-2 py-1">
              Support
            </h4>
            <ul className="space-y-3 text-gray-600 font-bold text-[11px] uppercase tracking-wider">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Venue Booking</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms & Privacy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Admin</a></li>
            </ul>
          </div>

          {/* Newsletter/Socials */}
          <div className="flex flex-col">
            <h4 className="font-black uppercase text-xs mb-6 italic border-b-2 border-black pb-1">
              Stay Updated
            </h4>
            <div className="flex gap-3 mb-6">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-xs hover:bg-[#D9F99D] cursor-pointer transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="COLLEGE EMAIL" 
                className="w-full bg-white border-2 border-black p-3 text-[10px] font-bold focus:outline-none focus:bg-gray-50 uppercase"
                required
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-[#D9F99D] p-1 px-2 text-[8px] font-black uppercase hover:bg-[#D9F99D] hover:text-black transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400">
              © 2026 EventHub • Campus Authority
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-300">
            <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
            <span className="font-black text-[9px] uppercase text-gray-500 tracking-widest">
              University Network Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;