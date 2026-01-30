import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, LogOut, Plus, Flame, Trophy, X, Edit3, Check, 
  Users, Info, Star, ChevronRight, Trash2, UserPlus, 
  Camera, LayoutDashboard, Megaphone, Calendar, ArrowUpRight 
} from 'lucide-react';

const ClubDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddWinner, setShowAddWinner] = useState(false);
  const fileInputRef = useRef(null);

  // --- DYNAMIC CLUB DATA ---
  const [clubData, setClubData] = useState({
    name: "Tech Nexus Club",
    id: "CLUB-GLA-TX01",
    college: "GLA University, Mathura",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=Tech",
    description: "GLA University ka leading tech community jo innovation aur coding culture ko promote karta hai. Hum monthly hackathons aur open-source workshops organize karte hain.",
    memberCount: 450,
    upcomingEventsCount: 3
  });

  // --- WINNER MANAGEMENT STATE ---
  const [pastEvents, setPastEvents] = useState([
    { id: 1, name: "Code Sprint 2.0", winner: "Team Binary", prize: "₹10,000", date: "Dec 2025" },
    { id: 2, name: "UI/UX Battle", winner: "Pawan Patel", prize: "Graphic Tablet", date: "Nov 2025" },
  ]);

  const [newWinner, setNewWinner] = useState({ name: "", winner: "", prize: "", date: "" });

  // --- UPCOMING EVENTS ---
  const upcomingEvents = [
    { name: "Neural Knights", date: "Feb 15", type: "Hackathon" },
    { name: "Web3 Summit", date: "Mar 02", type: "Workshop" },
  ];

  // --- HANDLERS ---
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setClubData({ ...clubData, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const addWinner = (e) => {
    e.preventDefault();
    if (newWinner.name && newWinner.winner) {
      setPastEvents([{ ...newWinner, id: Date.now() }, ...pastEvents]);
      setNewWinner({ name: "", winner: "", prize: "", date: "" });
      setShowAddWinner(false);
    }
  };

  const removeWinner = (id) => {
    setPastEvents(pastEvents.filter(ev => ev.id !== id));
  };

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-white font-sans overflow-hidden selection:bg-[#D9F99D] selection:text-black">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 bg-[#0F0F0F] z-30 shrink-0">
        <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-[#D9F99D] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase italic">HackSprint</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { name: 'Overview', icon: <LayoutDashboard size={18}/> },
            { name: 'Winners', icon: <Trophy size={18}/> },
            { name: 'Analytics', icon: <Megaphone size={18}/> },
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 ${activeTab === item.name ? 'bg-[#D9F99D] text-black border-black shadow-[4px_4px_0px_0px_#D9F99D]' : 'text-gray-400 border-transparent hover:bg-white/5'}`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
        <button className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all italic tracking-widest"><LogOut size={18}/> Logout</button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#0D0D0D] custom-scrollbar">
        <header className="p-8 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0D0D0D]/90 backdrop-blur-xl z-20">
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Club.<span className="text-gray-500 italic">Terminal</span></h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest italic">{clubData.id}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/post-event')} 
              className="flex items-center gap-2 px-6 py-2.5 bg-[#D9F99D] text-black rounded-xl border-2 border-black font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 transition-all"
            >
               <Plus size={16} strokeWidth={3}/> Post New Event
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className={`p-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000] active:shadow-none transition-all ${isEditing ? 'bg-white text-black' : 'bg-[#D9F99D] text-black'}`}
            >
               {isEditing ? <Check size={18}/> : <Edit3 size={18}/>}
            </button>
          </div>
        </header>

        <div className="p-8 grid grid-cols-12 gap-6">
          
          {/* CLUB IDENTITY BENTO (Editable) */}
          <div className="col-span-12 lg:col-span-8 bg-black border-4 border-black rounded-[3.5rem] p-10 relative overflow-hidden min-h-[400px] shadow-2xl group transition-all">
             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#D9F99D] rounded-full blur-[100px] opacity-10"></div>
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-6 mb-8">
                   <div 
                    onClick={() => fileInputRef.current.click()} 
                    className="w-20 h-20 bg-[#D9F99D] border-4 border-black rounded-3xl overflow-hidden shadow-xl rotate-3 cursor-pointer relative group/avatar"
                   >
                      <img src={clubData.avatar} alt="Logo" className="w-full h-full object-cover group-hover/avatar:opacity-40 transition-opacity" />
                      <Camera size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                      <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                   </div>
                   <div className="flex-1">
                      {isEditing ? (
                        <input 
                          className="bg-white/10 border-b-2 border-[#D9F99D] text-4xl font-black uppercase outline-none w-full text-[#D9F99D] italic p-1" 
                          value={clubData.name} 
                          onChange={(e) => setClubData({...clubData, name: e.target.value})} 
                        />
                      ) : (
                        <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{clubData.name}</h2>
                      )}
                      <p className="text-sm font-bold text-[#D9F99D] mt-2 tracking-widest uppercase italic opacity-80">{clubData.college}</p>
                   </div>
                </div>

                <div className="mt-4 flex-1">
                   <div className="flex items-center gap-2 mb-3">
                      <Info size={14} className="text-[#D9F99D]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Club Bio & Mission</span>
                   </div>
                   {isEditing ? (
                      <textarea 
                        className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#D9F99D] min-h-[120px] text-gray-200" 
                        value={clubData.description} 
                        onChange={(e) => setClubData({...clubData, description: e.target.value})} 
                      />
                   ) : (
                      <p className="text-lg font-bold leading-relaxed text-gray-300 max-w-2xl">{clubData.description}</p>
                   )}
                </div>
             </div>
          </div>

          {/* QUICK STATS */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             <div className="bg-[#D9F99D] p-8 rounded-[3rem] border-4 border-black text-black shadow-[8px_8px_0px_0px_#000] group transition-all">
                <Flame size={32} fill="black" />
                <div className="mt-4">
                  <p className="text-5xl font-black italic tracking-tighter leading-none">{clubData.upcomingEventsCount}</p>
                  <p className="text-[10px] font-black uppercase mt-2 tracking-widest italic opacity-60">Upcoming Events</p>
                </div>
             </div>
             <div className="bg-[#141414] p-8 rounded-[3rem] border-2 border-white/10 flex flex-col justify-between h-[200px] hover:border-[#D9F99D] transition-colors">
                <div className="flex justify-between items-start">
                   <Users className="text-blue-500" size={28} />
                   <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/10 italic">
                      <Star className="text-yellow-500 fill-yellow-500" size={12} />
                      <span className="text-[9px] font-black">4.8 Rating</span>
                   </div>
                </div>
                <div>
                   <p className="text-4xl font-black italic tracking-tighter leading-none">{clubData.memberCount}</p>
                   <p className="text-[10px] font-black uppercase text-gray-500 mt-2 tracking-widest italic">Global Community</p>
                </div>
             </div>
          </div>

          {/* EDITABLE WINNERS HALL OF FAME */}
          <div className="col-span-12 bg-[#141414] border-2 border-white/5 p-10 rounded-[4rem] shadow-2xl">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-500" size={28} />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Hall of <span className="text-gray-500">Winners</span></h3>
                </div>
                <button 
                  onClick={() => setShowAddWinner(!showAddWinner)} 
                  className={`flex items-center gap-2 px-5 py-2 border-2 rounded-full text-[10px] font-black uppercase transition-all shadow-[3px_3px_0px_0px_#000] active:shadow-none
                    ${showAddWinner ? 'bg-white text-black border-white' : 'bg-[#D9F99D] text-black border-black'}`}
                >
                  {showAddWinner ? <X size={14}/> : <UserPlus size={14}/>} {showAddWinner ? "Cancel" : "Add Winner"}
                </button>
             </div>

             {/* ADD WINNER MINI-FORM */}
             {showAddWinner && (
                <form onSubmit={addWinner} className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 p-8 bg-white/5 border-2 border-dashed border-white/10 rounded-[2.5rem] animate-in slide-in-from-top duration-300">
                  <div className="space-y-2">
                    <p className="text-[8px] font-black uppercase text-[#D9F99D] ml-2">Event Title</p>
                    <input placeholder="Code Sprint 3.0" className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs font-bold focus:border-[#D9F99D] outline-none" value={newWinner.name} onChange={e => setNewWinner({...newWinner, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[8px] font-black uppercase text-[#D9F99D] ml-2">Winner Name</p>
                    <input placeholder="Team Alpha" className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs font-bold focus:border-[#D9F99D] outline-none" value={newWinner.winner} onChange={e => setNewWinner({...newWinner, winner: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[8px] font-black uppercase text-[#D9F99D] ml-2">Prize</p>
                    <input placeholder="₹15,000 Cash" className="w-full bg-black border border-white/10 rounded-xl p-3 text-xs font-bold focus:border-[#D9F99D] outline-none" value={newWinner.prize} onChange={e => setNewWinner({...newWinner, prize: e.target.value})} />
                  </div>
                  <div className="flex items-end">
                    <button type="submit" className="w-full py-3 bg-[#D9F99D] text-black font-black uppercase text-[10px] rounded-xl hover:scale-105 transition-all shadow-[4px_4px_0px_0px_#000]">Publish Entry</button>
                  </div>
                </form>
             )}

             {/* WINNERS LIST */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((ev) => (
                  <div key={ev.id} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-yellow-500/50 transition-all group relative overflow-hidden">
                     <button 
                      onClick={() => removeWinner(ev.id)} 
                      className="absolute top-6 right-6 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                     >
                        <Trash2 size={16}/>
                     </button>
                     <p className="text-[9px] font-black text-gray-500 uppercase mb-3 tracking-widest leading-none italic">{ev.name}</p>
                     <h4 className="text-2xl font-black italic uppercase text-white group-hover:text-yellow-500 transition-colors leading-tight">{ev.winner}</h4>
                     <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-black text-[#D9F99D] italic">{ev.prize}</span>
                        <span className="text-[9px] font-bold text-gray-600 uppercase italic">{ev.date || 'Jan 2026'}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* UPCOMING REGISTRY */}
          <div className="col-span-12 bg-[#0D0D0D] border-4 border-black rounded-[4rem] p-12 shadow-2xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Next <span className="text-gray-500 italic">Registry</span></h3>
                <Calendar className="text-[#D9F99D]" size={24} />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((ev, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-[#D9F99D] group transition-all cursor-pointer">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center font-black text-sm group-hover:text-black group-hover:bg-white transition-all italic italic shadow-xl">
                          {ev.date}
                        </div>
                        <div>
                          <h4 className="text-lg font-black uppercase text-white group-hover:text-black transition-colors">{ev.name}</h4>
                          <p className="text-[9px] font-black uppercase text-gray-500 group-hover:text-black/60 mt-1">{ev.type}</p>
                        </div>
                     </div>
                     <ArrowUpRight size={24} className="text-gray-600 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                ))}
             </div>
          </div>

        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ClubDashboard;