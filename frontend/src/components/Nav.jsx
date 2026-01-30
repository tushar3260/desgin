import React, { useState } from "react";
import { Zap, ArrowUpRight, Menu, X } from "lucide-react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Clubs", href: "/clubs" },
    { name: "Dashboard", href: "/profile" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-white/70 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex justify-between items-center z-50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
      
      {/* --- LOGO SECTION --- */}
      <a href="/" className="flex items-center gap-2 px-4 group cursor-pointer">
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center group-hover:bg-[#D9F99D] transition-colors duration-300">
          <Zap className="text-[#D9F99D] group-hover:text-black w-5 h-5 fill-current transition-colors" />
        </div>
        <span className="font-black text-xl tracking-tighter uppercase italic text-black">
          EventHub
        </span>
      </a>

      {/* --- DESKTOP NAVIGATION --- */}
      <div className="hidden md:flex gap-1 bg-gray-100/50 p-1 rounded-xl">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="px-5 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-white hover:text-black hover:shadow-sm transition-all"
          >
            {item.name}
          </a>
        ))}

        <a
          href="/post-event"
          className="px-5 py-2 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-1"
        >
          Post Event <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      {/* --- RIGHT ACTIONS --- */}
      <div className="flex items-center gap-2 px-2">
        {/* DESKTOP LOGIN BUTTON - Redirects to /user-login */}
        <a 
          href="/login" 
          className="hidden sm:block bg-black text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#D9F99D] hover:text-black transition-all active:scale-95 text-center shadow-lg"
        >
          Log In
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-4 bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5 duration-300">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-lg font-black uppercase italic border-b border-gray-50 pb-2 text-gray-700 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="/post-event" 
            className="text-lg font-black uppercase italic text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Post Event
          </a>
          
          {/* MOBILE LOGIN BUTTON - Updated to /user-login */}
          <a 
            href="/user-login" 
            className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-center active:bg-[#D9F99D] active:text-black transition-all"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </a>
        </div>
      )}
    </nav>
  );
};

export default Nav;