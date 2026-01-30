import React, { useState, useMemo } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Search, MapPin, Zap, ArrowUpRight, ChevronRight, Sparkles, X, Trophy, Code, Globe, Cpu, Users } from 'lucide-react';

const EventsPage = () => {
  // --- STATE MANAGEMENT ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ['All', 'Cultural', 'Technical', 'Workshops', 'Sports', 'Seminars'];

  // Data (Including your 16 events)
  const allEvents = [
    { id: 1, title: "Euphoria '26", category: "Cultural", date: "MAR 15", location: "Main Stage", price: "Free", img: "https://images.unsplash.com/photo-1514525253361-bee8a197c0c5?q=80&w=2070" },
    { id: 2, title: "HackSprint", category: "Technical", date: "FEB 10", location: "Lab A-12", price: "Entry Fee", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070" },
    { id: 3, title: "Design Jam", category: "Workshops", date: "FEB 12", location: "Studio 4", price: "Free", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070" },
    { id: 4, title: "Robo-War", category: "Technical", date: "FEB 20", location: "OAT", price: "Free", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2070" },
    { id: 5, title: "Battle of Bands", category: "Cultural", date: "MAR 02", location: "Amphitheater", price: "Entry Fee", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070" },
    { id: 6, title: "Guest Lecture", category: "Seminars", date: "FEB 05", location: "Hall 1", price: "Free", img: "https://images.unsplash.com/photo-1475721027187-4024733923f9?q=80&w=2070" },
    { id: 7, title: "Project Expo", category: "Technical", date: "FEB 28", location: "Main Library Hall", price: "Free", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070" },
    { id: 8, title: "Street Play (Nukkad)", category: "Cultural", date: "MAR 05", location: "Canteen Square", price: "Free", img: "https://images.unsplash.com/photo-1503073321235-ef4a1b36e91f?q=80&w=2070" },
    { id: 9, title: "AI Ethics Debate", category: "Seminars", date: "FEB 18", location: "Conference Room B", price: "Free", img: "https://images.unsplash.com/photo-1591115765373-520b7a0d71d4?q=80&w=2070" },
    { id: 10, title: "Inter-College Cricket", category: "Sports", date: "MAR 10", location: "Sports Ground", price: "Entry Fee", img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2070" },
    { id: 11, title: "UI/UX Masterclass", category: "Workshops", date: "FEB 22", location: "Design Studio", price: "Entry Fee", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070" },
    { id: 12, title: "Cyber Security Meet", category: "Technical", date: "MAR 12", location: "IT Block L3", price: "Free", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070" },
    { id: 13, title: "Art Marathon", category: "Workshops", date: "MAR 20", location: "Fine Arts Wing", price: "Entry Fee", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071" },
    { id: 14, title: "Startup Pitch Deck", category: "Seminars", date: "FEB 25", location: "Incubation Center", price: "Free", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070" },
    { id: 15, title: "Chess Blitz", category: "Sports", date: "FEB 14", location: "Student Lounge", price: "Free", img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071" },
    { id: 16, title: "Kavi Sammelan", category: "Cultural", date: "MAR 18", location: "Mini OAT", price: "Free", img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070" }
  ];

  // --- FILTER LOGIC ---
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);

  // --- HANDLERS ---
  const handleLoadMore = () => setVisibleCount(prev => prev + 4);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(4); 
  };
  const clearSearch = () => setSearchQuery('');

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-black font-sans selection:bg-[#D9F99D]">
        <Nav />

      {/* --- CONDENSED HYBRID HEADER --- */}
      <header className="pt-32 pb-8 bg-black text-white px-4 md:px-8 border-b-4 border-[#D9F99D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start cursor-pointer" onClick={() => {setActiveCategory('All'); clearSearch();}}>
            <div className="inline-flex items-center gap-2 bg-[#D9F99D] text-black px-2 py-0.5 text-[9px] font-black uppercase mb-2">
              <Sparkles className="w-3 h-3" /> Live Campus Portal
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              Campus <span className="text-[#D9F99D]">Events</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="w-full md:w-72 relative group">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Find events..." 
                  className="w-full bg-neutral-900 border border-neutral-700 p-2.5 pr-10 text-[10px] font-bold uppercase outline-none focus:border-[#D9F99D] transition-all text-white"
                />
                <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center">
                  {searchQuery ? (
                    <X className="text-[#D9F99D] w-4 h-4 cursor-pointer hover:text-white" onClick={clearSearch} />
                  ) : (
                    <Search className="text-[#D9F99D] w-4 h-4" />
                  )}
                </div>
             </div>
             {/* Secondary Post Event Button for UX */}
             <a href="/post-event" className="hidden lg:flex items-center justify-center p-2.5 bg-[#D9F99D] text-black hover:bg-white transition-colors">
                <ArrowUpRight className="w-5 h-5" />
             </a>
          </div>
        </div>
      </header>

      {/* --- TIGHT FILTER STRIP --- */}
      <section className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {setActiveCategory(cat); setVisibleCount(4);}}
              className={`px-3 py-1 text-[9px] font-black uppercase whitespace-nowrap border-2 border-black transition-all active:translate-y-0.5 ${
                activeCategory === cat 
                ? 'bg-black text-[#D9F99D] shadow-[2px_2px_0px_0px_rgba(217,249,157,1)]' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- COMPACT GRID --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedEvents.map((event) => (
              <div key={event.id} className="group bg-white border border-black flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all animate-in fade-in zoom-in duration-300">
                <div className="relative aspect-square overflow-hidden border-b border-black">
                  <div className="absolute top-2 right-2 z-20 bg-[#D9F99D] border border-black text-black px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter shadow-sm">
                    {event.date}
                  </div>
                  <img src={event.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" alt={event.title} />
                </div>
                <div className="p-3 bg-white flex flex-col flex-1">
                  <span className="text-[7px] font-black uppercase text-blue-600 mb-0.5 italic tracking-[0.1em]">{event.category}</span>
                  <h3 className="text-lg font-black uppercase italic tracking-tighter leading-none mb-3 truncate">{event.title}</h3>
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[8px] font-bold uppercase"><MapPin className="w-2.5 h-2.5 text-black" /> {event.location}</div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-[8px] font-bold uppercase"><Zap className="w-2.5 h-2.5 text-black fill-current" /> {event.price}</div>
                  </div>
                  <div className="mt-auto flex border-t border-black -mx-3 -mb-3">
                    <button className="flex-1 py-2 bg-black text-[#D9F99D] font-black uppercase text-[8px] hover:bg-[#D9F99D] hover:text-black transition-colors border-r border-black">
                      Details
                    </button>
                    <button className="px-3 bg-white text-black hover:bg-neutral-100 transition-colors flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-300">
            <p className="font-black uppercase text-gray-400">No events found matching "{searchQuery}"</p>
            <button onClick={clearSearch} className="mt-4 text-xs font-bold underline uppercase">Clear Filters</button>
          </div>
        )}
        
        {visibleCount < filteredEvents.length && (
          <div className="mt-12 flex justify-center">
            <button onClick={handleLoadMore} className="px-8 py-3 bg-white border-2 border-black text-[10px] font-black uppercase hover:bg-black hover:text-[#D9F99D] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
              Load More
            </button>
          </div>
        )}
      </main>
        <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EventsPage;