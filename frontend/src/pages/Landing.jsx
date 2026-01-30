import React from 'react';
import { ArrowUpRight, Code, Cpu, Globe, Zap, Calendar, MapPin, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F2] text-[#1A1A1A] font-sans selection:bg-[#D9F99D] selection:text-black">
      
      {/* --- FLOATING NAVBAR --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white/80 backdrop-blur-md border border-gray-200 p-2 rounded-full flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-2 px-4">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
             <Zap className="text-[#D9F99D] w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight">HackSprint</span>
        </div>
        
        <div className="hidden md:flex gap-1 bg-[#F4F4F2] p-1 rounded-full">
          {['Home', 'Schedule', 'Tracks', 'Sponsors'].map((item) => (
            <a key={item} href="#" className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:shadow-sm transition-all text-gray-600 hover:text-black">
              {item}
            </a>
          ))}
        </div>

        <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#D9F99D] hover:text-black transition-colors flex items-center gap-2">
          Register <ArrowUpRight className="w-4 h-4" />
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium mb-8 shadow-sm animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Registrations closing in 24h
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
            Code <br className="md:hidden" />
            <span className="text-gray-300">The</span> Future
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mb-10 font-medium">
            India's largest student hackathon. 36 hours of building, networking, and innovation. Join 5000+ developers.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="px-8 py-4 bg-black text-[#D9F99D] rounded-full text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Start Hacking <ArrowUpRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white border border-gray-200 text-black rounded-full text-lg font-bold hover:bg-gray-50 transition-colors">
              View Rulebook
            </button>
          </div>
        </div>
      </section>

      {/* --- SCROLLING MARQUEE --- */}
      <div className="w-full bg-[#D9F99D] border-y border-black overflow-hidden py-4 rotate-[-1deg] scale-105 mb-20">
        <div className="whitespace-nowrap animate-marquee inline-block">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl font-black uppercase mx-8 text-black">
              • Hack To Win • Build The Future • No Sleep Just Code
            </span>
          ))}
        </div>
      </div>

      {/* --- BENTO GRID SECTION --- */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase">Event <span className="text-gray-400">Details</span></h2>
          <p className="hidden md:block text-gray-500 font-medium">Explore what's happening</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          
          {/* Card 1: Large Video/Image Placeholder */}
          <div className="md:col-span-2 md:row-span-2 rounded-[2rem] bg-black text-white p-8 relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
              alt="Hackathon crowd" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <span className="bg-[#D9F99D] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">Featured</span>
                 <ArrowUpRight className="w-8 h-8 text-white group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-2">The Grand Finale</h3>
                <p className="text-gray-300">Live judging stream on YouTube.</p>
              </div>
            </div>
          </div>

          {/* Card 2: Date */}
          <div className="bg-white rounded-[2rem] p-6 border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-shadow">
             <Calendar className="w-10 h-10 text-gray-400" />
             <div>
                <p className="text-gray-500 text-sm font-bold uppercase mb-1">Date</p>
                <p className="text-2xl font-bold">Oct 24-26</p>
             </div>
          </div>

          {/* Card 3: Location */}
          <div className="bg-[#D9F99D] rounded-[2rem] p-6 border border-black flex flex-col justify-between hover:scale-[1.02] transition-transform">
             <MapPin className="w-10 h-10 text-black" />
             <div>
                <p className="text-black/70 text-sm font-bold uppercase mb-1">Venue</p>
                <p className="text-2xl font-bold text-black">Main Auditorium</p>
             </div>
          </div>

          {/* Card 4: Tracks (Tall) */}
          <div className="md:row-span-2 bg-white rounded-[2rem] p-6 border border-gray-200 flex flex-col hover:shadow-lg transition-shadow">
             <div className="mb-auto">
               <h3 className="text-2xl font-bold mb-6">Tracks</h3>
               <div className="space-y-4">
                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                   <div className="bg-blue-100 p-2 rounded-lg"><Code className="w-5 h-5 text-blue-600"/></div>
                   <span className="font-semibold">Web3</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                   <div className="bg-purple-100 p-2 rounded-lg"><Cpu className="w-5 h-5 text-purple-600"/></div>
                   <span className="font-semibold">AI/ML</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                   <div className="bg-orange-100 p-2 rounded-lg"><Globe className="w-5 h-5 text-orange-600"/></div>
                   <span className="font-semibold">Open Innovation</span>
                 </div>
               </div>
             </div>
             <button className="w-full py-3 mt-4 border border-gray-300 rounded-xl font-bold hover:bg-black hover:text-white transition-colors">View All</button>
          </div>

          {/* Card 5: Prize Pool */}
          <div className="md:col-span-2 bg-black text-white rounded-[2rem] p-8 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
               <p className="text-gray-400 font-bold uppercase tracking-widest mb-2">Total Prize Pool</p>
               <h3 className="text-5xl md:text-6xl font-black text-[#D9F99D]">₹5,00,000</h3>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20">
               <Zap className="w-48 h-48" />
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="bg-black text-white py-24 px-4 text-center rounded-t-[3rem]">
        <h2 className="text-5xl md:text-7xl font-black mb-8">READY TO BUILD?</h2>
        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-200 bg-[#D9F99D] font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
           Register Team Now
           <div className="absolute -inset-3 rounded-xl bg-[#D9F99D] opacity-20 group-hover:opacity-40 blur-lg transition duration-200" />
        </button>
      </section>

      {/* --- GLOBAL STYLES FOR ANIMATION --- */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;