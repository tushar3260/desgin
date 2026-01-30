import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Code,
  Cpu,
  Globe,
  Zap,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Rocket,
} from "lucide-react";

const Landing = () => {
      const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#1A1A1A] font-sans selection:bg-[#D9F99D] selection:text-black">
    <Nav />

      {/* --- DARK NEO-BRUTALIST HERO SECTION WITH ACTIVE ANIMATIONS --- */}
      <section className="relative pt-44 pb-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden bg-[#0A0A0A] mt-4 border-x border-b border-neutral-800">
        {/* 3D Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D9F99D]/5 blur-[120px] rounded-full -z-10 animate-pulse-slow" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Side: Content with Entrance Animation */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-[#D9F99D] text-xs font-bold mb-8 text-[#D9F99D] uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(217,249,157,1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-[#FF0000] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-[##FF0000]"></span>
              </span>
              34 Live Campus Events
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9] mb-8 text-white uppercase italic">
              Experience <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px #D9F99D" }}
              >
                Campus
              </span>{" "}
              <br />
              Life 
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 font-medium leading-relaxed border-l-4 border-[#D9F99D] pl-6">
              The unified portal for{" "}
              <span className="text-white">College Societies</span> and{" "}
              <span className="text-white">Annual Fests</span>. Book your slots,
              manage RSVPs, and discover what's happening on campus today.
            </p>

            <div className="flex flex-col sm:flex-row gap-0 w-full justify-center lg:justify-start items-center">
              <button onClick={() => navigate('/events')}
            className="group relative px-10 py-5 bg-[#D9F99D] text-black text-xl font-black transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-0 active:translate-y-0 flex items-center gap-3 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                EXPLORE EVENTS{" "}
                <Globe className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
              </button>

              <div className="flex items-center gap-4 bg-neutral-800 p-4 border-y border-r border-neutral-700">
                <div className="text-xs font-bold text-neutral-400 uppercase tracking-tighter">
                  <span className="text-[#D9F99D] block text-lg leading-none animate-number-pop">
                    50+
                  </span>
                  Clubs
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: 3D Sharp UI Element with Tilt and Float */}
          <div className="flex-1 relative perspective-1000 hidden lg:block">
            <div className="relative w-full max-w-md mx-auto transform-style-3d animate-float-slow transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 rotate-y-[-12deg] rotate-x-[8deg]">
              {/* The Card - No Radius */}
              <div className="bg-neutral-900 border-2 border-neutral-700 p-0 shadow-[20px_20px_0px_0px_rgba(217,249,157,0.1)] relative z-20 group">
                <div className="bg-[#D9F99D] text-black px-4 py-2 inline-block font-black text-sm absolute top-0 left-0 z-30 animate-pulse-subtle">
                  CSE Department
                </div>

                <div className="overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070"
                    className="w-full h-56 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt="Campus Event"
                  />
                </div>

                <div className="p-8">
                  <h4 className="text-white text-3xl font-black mb-2 uppercase italic tracking-tighter">
                    Global Design Forum
                  </h4>
                  <div className="flex items-center gap-2 text-[#D9F99D] text-sm mb-6 font-bold uppercase">
                    <MapPin className="w-4 h-4" />
                    Main Auditorium, Block 2
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-neutral-800">
                    <div>
                      <p className="text-neutral-500 text-[10px] font-bold uppercase">
                        Starting at
                      </p>
                      <span className="text-white font-black text-2xl">
                        FREE
                      </span>
                    </div>
                    <button className="bg-white text-black px-6 py-3 font-black uppercase text-sm hover:bg-[#D9F99D] transition-colors active:scale-95">
                      Register
                    </button>
                  </div>
                </div>
              </div>

              {/* Sharp Floating Element with distinct float animation */}
              <div className="absolute -bottom-8 -left-12 bg-[#D9F99D] text-black p-4 border-2 border-black z-30 animate-float shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 fill-current animate-bounce" />
                  <div className="text-xs font-black uppercase leading-tight">
                    Trending Now <br />
                    In Your Dept
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
    .perspective-1000 { perspective: 1200px; }
    .transform-style-3d { transform-style: preserve-3d; }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    @keyframes float-slow {
      0%, 100% { transform: rotateY(-12deg) rotateX(8deg) translateY(0); }
      50% { transform: rotateY(-8deg) rotateX(4deg) translateY(-10px); }
    }

    @keyframes pulse-slow {
      0%, 100% { opacity: 0.05; transform: scale(1); }
      50% { opacity: 0.1; transform: scale(1.1); }
    }

    @keyframes pulse-subtle {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes fade-in-left {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-float { animation: float 4s ease-in-out infinite; }
    .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
    .animate-pulse-subtle { animation: pulse-subtle 3s ease-in-out infinite; }
    .animate-fade-in-left { animation: fade-in-left 1s ease-out forwards; }
    
    .animate-number-pop {
      animation: pop 0.5s ease-out;
    }
    @keyframes pop {
      0% { transform: scale(0.8); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
  `}</style>
      </section>


{/* --- LIGHT THEME SMALL SWIPE CARDS (COLLEGE EDITION) --- */}
<section className="py-24 bg-[#F8F8F5] border-b border-gray-200 overflow-hidden">
  <div className="px-4 md:px-8 max-w-7xl mx-auto mb-10">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter">
          Upcoming <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #000' }}>Events</span>
        </h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest mt-1 text-xs border-l-4 border-black pl-4">
          Discover fests, workshops, and club meetups
        </p>
      </div>
    </div>
  </div>

  {/* Scroll Container */}
  <div className="relative group">
    <div className="flex gap-4 overflow-x-auto px-4 md:px-8 no-scrollbar cursor-grab active:cursor-grabbing pb-12">
      {[
        { name: "Euphoria '26", tag: "Cultural", img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D", sub: "Annual Main Fest" },
        { name: "Hack Sprint", tag: "Technical", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070", sub: "36-Hour Hackathon" },
        { name: "Acoustic Night", tag: "Music Club", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070", sub: "Live at Amphitheater" },
        { name: "Design Jam", tag: "Creative", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070", sub: "UI/UX Workshop" },
        { name: "Mock UN", tag: "Debate", img: "https://images.unsplash.com/photo-1766650552316-4585f62f0130?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNvY2lhbCUyMGNsdWJ8ZW58MHx8MHx8fDA%3D", sub: "Political Science Club" },
        { name: "Robo-War", tag: "Robotics", img: "https://media.istockphoto.com/id/1370462893/photo/alien-robots-in-a-distant-world.webp?a=1&b=1&s=612x612&w=0&k=20&c=t0LGI4ynafoosStvIUDkgndaFo9a_CCbuL2sIgwMwIQ=", sub: "Lab A-12 Finals" },
        { name: "Startup Pitch", tag: "Entrepreneur", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070", sub: "Incubation Center" }
      ].map((card, i) => (
        <div 
          key={i} 
          className="min-w-[240px] md:min-w-[280px] aspect-[2/3] bg-white border-2 border-black relative overflow-hidden group/card shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
        >
          {/* Tag - Sharp Edges */}
          <div className="absolute top-4 right-4 z-30">
            <span className="bg-[#D9F99D] text-black px-3 py-1 font-black text-[9px] uppercase tracking-wider border border-black">
              {card.tag}
            </span>
          </div>

          {/* Icon Placeholder */}
          <div className="absolute top-4 left-4 z-30">
             <div className="w-7 h-7 bg-white border border-black flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-black fill-current" />
             </div>
          </div>

          {/* Image */}
          <img 
            src={card.img} 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-100 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:scale-110" 
            alt={card.name} 
          />

          {/* Gradient for Text Readability - switched to darker for light theme text safety */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-20 opacity-80" />
          
          <div className="absolute bottom-0 left-0 p-6 z-30 w-full">
            <h3 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-1 italic">
              {card.name}
            </h3>
            <p className="text-[#D9F99D] text-[10px] font-bold uppercase tracking-widest">
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style>{`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
</section>
      {/* --- COMPACT SOCIETIES MARQUEE --- */}
<section className="py-12 bg-black text-white overflow-hidden border-y-2 border-[#D9F99D]">
  <div className="mb-8 px-4 md:px-8 max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
      Our <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #D9F99D' }}>Societies</span>
    </h2>
  </div>

  {/* Fast, Smaller Marquee */}
  <div className="relative flex overflow-x-hidden">
    <div className="flex animate-marquee-fast whitespace-nowrap gap-4 py-2">
      {[
        "Coding Society",
        "Robotics Club",
        "Entrepreneurship Cell",
        "Literary Hub",
        "Sports Council",
        "Electronics Wing",
        "Fine Arts Club",
        "Music Society",
        "Drama Hub",
        "Space Tech"
      ].map((club, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-3 bg-neutral-900 border border-neutral-800 hover:border-[#D9F99D] transition-all group cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Zap className="w-4 h-4 text-[#D9F99D] group-hover:fill-current" />
          <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter group-hover:text-[#D9F99D]">
            {club}
          </span>
        </div>
      ))}
      
      {/* Duplicate for seamless looping */}
      {[
        "Coding Society",
        "Robotics Club",
        "Entrepreneurship Cell",
        "Literary Hub",
        "Sports Council",
        "Electronics Wing",
        "Fine Arts Club",
        "Music Society"
      ].map((club, i) => (
        <div
          key={`loop-${i}`}
          className="flex items-center gap-4 px-6 py-3 bg-neutral-900 border border-neutral-800 transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Zap className="w-4 h-4 text-[#D9F99D]" />
          <span className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
            {club}
          </span>
        </div>
      ))}
    </div>
  </div>

  <style>{`
    @keyframes marquee-fast {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee-fast {
      animation: marquee-fast 20s linear infinite;
    }
    .animate-marquee-fast:hover {
      animation-play-state: paused;
    }
  `}</style>
</section>

<Footer />

      {/* --- GLOBAL STYLES --- */}
      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 30s linear infinite;
        }
        .border-t-text {
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1.5px black;
        }
      `}</style>
    </div>
  );

};

export default Landing;

