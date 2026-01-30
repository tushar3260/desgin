import React, { useState, useMemo } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Search, Zap, ArrowUpRight, Plus, Users, Globe, Award, Shield, X, Sparkles } from 'lucide-react';

const ClubsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data for Campus Societies
  const allClubs = [
    { id: 1, name: "Coding Society", type: "Technical", members: "450+", head: "Alex Rivera", description: "The premier hub for software development and competitive programming.", color: "#D9F99D" },
    { id: 2, name: "Drama Hub", type: "Cultural", members: "120+", head: "Sarah Chen", description: "Exploring the art of theater and performance through street plays and stage dramas.", color: "#bae6fd" },
    { id: 3, name: "Entrepreneurship Cell", type: "Business", members: "300+", head: "Jordan Collins", description: "Fostering the spirit of innovation and providing resources for student startups.", color: "#fef08a" },
    { id: 4, name: "Music Society", type: "Cultural", members: "200+", head: "Nikola Jokić", description: "A home for musicians and vocalists to collaborate and perform live on campus.", color: "#fbcfe8" },
    { id: 5, name: "Robotics Club", type: "Technical", members: "180+", head: "Noah Lyles", description: "Designing and building autonomous bots for national-level competitions.", color: "#c7d2fe" },
    { id: 6, name: "Sports Council", type: "Athletics", members: "1000+", head: "Carlin Isles", description: "Managing all inter-college sports tournaments and fitness workshops.", color: "#D9F99D" },
  ];

  const filteredClubs = useMemo(() => {
    return allClubs.filter(club => 
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      club.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-black font-sans selection:bg-[#D9F99D]">
      
      <Nav />

      {/* --- HEADER --- */}
      <header className="pt-32 pb-12 bg-black text-white px-4 md:px-8 border-b-4 border-[#D9F99D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#D9F99D] text-black px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter">
              <Users className="w-3 h-3" /> Society Directory
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              Campus <span className="text-[#D9F99D]">Societies</span>
            </h1>
          </div>
          
          <div className="w-full md:w-80 relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search societies..." 
              className="w-full bg-neutral-900 border border-neutral-700 p-3 pr-10 text-[10px] font-bold uppercase outline-none focus:border-[#D9F99D] text-white"
            />
            <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center">
              {searchQuery ? <X className="text-[#D9F99D] w-4 h-4 cursor-pointer" onClick={() => setSearchQuery('')} /> : <Search className="text-[#D9F99D] w-4 h-4" />}
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Clubs List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
             <h2 className="text-xl font-black uppercase italic tracking-widest">Active Communities</h2>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredClubs.length} Results Found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClubs.map((club) => (
              <div key={club.id} className="group bg-white border-2 border-black relative flex flex-col hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(217,249,157,1)]">
                <div className="p-6 border-b-2 border-black" style={{ backgroundColor: `${club.color}20` }}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-black text-white px-2 py-1 text-[8px] font-black uppercase">{club.type}</span>
                    <Globe className="w-4 h-4 text-black group-hover:rotate-45 transition-transform" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-1">{club.name}</h3>
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase text-gray-500">
                    <Users className="w-3 h-3" /> {club.members} Members
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <p className="text-[11px] font-medium text-gray-600 mb-6 leading-relaxed">
                    {club.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-[8px] font-black uppercase">
                      <span className="text-gray-400 block mb-0.5 tracking-widest">Society Head</span>
                      {club.head}
                    </div>
                    <button className="bg-black text-[#D9F99D] p-2 hover:bg-[#D9F99D] hover:text-black transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Society Portal / Registration */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Registration Section */}
          <div className="bg-[#D9F99D] border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-24">
            <div className="mb-6">
              <Sparkles className="w-8 h-8 text-black mb-4 animate-pulse" />
              <h3 className="text-3xl font-black uppercase italic leading-none mb-2">Register <br /> Your Club</h3>
              <p className="text-[10px] font-bold uppercase text-black/60 leading-relaxed tracking-wider">
                Want to lead? Get your society officially listed on the campus portal.
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Registration Initiated!"); }}>
              <div>
                <label className="text-[8px] font-black uppercase block mb-1">Society Name</label>
                <input type="text" className="w-full bg-white border border-black p-2 text-[10px] font-bold outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" placeholder="E.G. DEBATING CELL" />
              </div>
              <div>
                <label className="text-[8px] font-black uppercase block mb-1">Category</label>
                <select className="w-full bg-white border border-black p-2 text-[10px] font-bold outline-none">
                  <option>TECHNICAL</option>
                  <option>CULTURAL</option>
                  <option>ACADEMIC</option>
                  <option>SPORTS</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] font-black uppercase block mb-1">Society Head (Lead)</label>
                <input type="text" className="w-full bg-white border border-black p-2 text-[10px] font-bold outline-none" placeholder="FULL NAME" />
              </div>
              <button className="w-full bg-black text-[#D9F99D] py-3 font-black uppercase text-xs hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                Submit Request
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-black/10">
               <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-4 h-4 text-black" />
                  <span className="text-[9px] font-black uppercase">Official Verification required</span>
               </div>
               <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-black" />
                  <span className="text-[9px] font-black uppercase">Benefits: Fund Access, Hall Booking</span>
               </div>
            </div>
          </div>
        </aside>
      </main>

        <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ClubsPage;