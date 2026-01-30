import React, { useState } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import { 
  Zap, Bell, Settings, LogOut, LayoutDashboard, Award, Users, 
  MessageSquare, Calendar, MapPin, Flame, QrCode, 
  Code, Music, Trophy, ArrowUpRight
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [ledgerFilter, setLedgerFilter] = useState('All'); // Filter State

  // Dashboard Data
  const allEvents = [
    { name: "Neural Knights Hackathon", loc: "CS Lab 4", time: "02:00 PM", status: "Ongoing", icon: <Code size={16}/> },
    { name: "AI/ML Workshop", loc: "Seminar Hall", time: "11:30 AM", status: "Ongoing", icon: <Zap size={16}/> },
    { name: "Solana Build Station", loc: "Lab 2", time: "11:00 AM", status: "Upcoming", icon: <Zap size={16}/> },
    { name: "Antaragni Fest DJ Night", loc: "Main OAT", time: "09:00 PM", status: "Upcoming", icon: <Music size={16}/> },
    { name: "Inter-Uni Cricket", loc: "Sports Ground", time: "04:00 PM", status: "Finished", icon: <Trophy size={16}/> },
    { name: "Code Burner Round 1", loc: "Online", time: "10:00 AM", status: "Finished", icon: <Code size={16}/> },
  ];

  // Logic to Filter Events
  const filteredEvents = ledgerFilter === 'All' 
    ? allEvents 
    : allEvents.filter(ev => ev.status === ledgerFilter);

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-white font-sans overflow-hidden selection:bg-[#D9F99D] selection:text-black">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 shrink-0 bg-[#0F0F0F] z-30">
        <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[#D9F99D] rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <button onClick={() => navigate("/")}
  type="button"
  className="font-bold text-xl tracking-tighter uppercase italic bg-transparent border-none cursor-pointer"
>
  EventHub
</button>
        </div>

        <nav className="flex-1 space-y-1">
          {['Overview', 'My Events', 'Team Finder', 'Leaderboard'].map((item) => (
            <button 
              key={item} 
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${activeTab === item ? 'bg-[#D9F99D] text-black border-black shadow-[4px_4px_0px_0px_rgba(217,249,157,1)]' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-white'}`}
            >
              {item === 'Overview' && <LayoutDashboard size={18}/>}
              {item === 'My Events' && <Calendar size={18}/>}
              {item === 'Team Finder' && <Users size={18}/>}
              {item === 'Leaderboard' && <Trophy size={18}/>}
              {item}
            </button>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all active:scale-95">
          <LogOut size={18}/> Exit Terminal
        </button>
      </aside>

      {/* --- MAIN DASHBOARD AREA --- */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#0D0D0D] custom-scrollbar relative">
        <header className="p-8 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0D0D0D]/90 backdrop-blur-xl z-20">
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">My <span className="text-gray-500">Dashboard</span></h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest italic mt-1">Authorized Session: EH-2026-9941</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <div className="text-right">
                   <p className="text-xs font-black uppercase italic leading-none">Pawan Patel</p>
                   <p className="text-[10px] text-[#D9F99D] font-bold">Elite Builder</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#D9F99D] border-2 border-black flex items-center justify-center rotate-3 overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pawan" alt="User" />
                </div>
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 grid grid-cols-12 gap-6">
          
          {/* Quick Stats (Top Row) */}
          <div className="col-span-12 md:col-span-4 bg-[#141414] border-2 border-white/5 p-6 rounded-[2rem] hover:border-[#D9F99D]/40 transition-all">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Participation XP</p>
            <h3 className="text-4xl font-black tracking-tighter mb-2 italic">1,250</h3>
            <p className="text-[10px] text-[#D9F99D] font-black uppercase">+200 XP from last fest</p>
          </div>

          <div className="col-span-12 md:col-span-4 bg-[#141414] border-2 border-white/5 p-6 rounded-[2rem]">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">Level Progress</p>
            <div className="flex justify-between items-end mb-2">
               <h3 className="text-3xl font-black italic tracking-tighter">LVL 03</h3>
               <span className="text-[10px] font-bold text-gray-400">14/20 Events</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
               <div className="w-[70%] h-full bg-[#D9F99D]"></div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-[#D9F99D] p-6 rounded-[2rem] text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <p className="font-black text-[10px] uppercase tracking-widest italic opacity-70">Day Streak</p>
            <div className="flex justify-between items-center">
               <h3 className="text-4xl font-black tracking-tighter italic">14 Days</h3>
               <Flame className="animate-bounce" />
            </div>
          </div>

          {/* Activity Ledger (Filtered Section) */}
          <div className="col-span-12 lg:col-span-8 bg-[#141414] border-2 border-white/5 p-8 rounded-[2.5rem] relative min-h-[500px]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black uppercase italic tracking-tighter">Activity <span className="text-gray-500 italic">Registry</span></h3>
              
              {/* --- CLICKABLE BUTTONS --- */}
              <div className="flex gap-2">
                 {['All', 'Ongoing', 'Upcoming', 'Finished'].map(t => (
                   <button 
                    key={t} 
                    onClick={() => setLedgerFilter(t)}
                    className={`text-[9px] font-black uppercase px-4 py-1.5 border-2 rounded-full transition-all active:scale-90
                      ${ledgerFilter === t ? 'bg-[#D9F99D] text-black border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' : 'bg-white/5 text-gray-500 border-white/10 hover:border-[#D9F99D]'}`}
                   >
                     {t}
                   </button>
                 ))}
              </div>
            </div>
            
            <div className="space-y-4 max-h-[450px] overflow-y-auto no-scrollbar">
              {filteredEvents.length > 0 ? filteredEvents.map((ev, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white/5 border-2 border-transparent hover:border-black hover:bg-white/10 rounded-3xl transition-all group cursor-pointer animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-2xl border-2 border-white/10 flex items-center justify-center text-[#D9F99D] group-hover:bg-[#D9F99D] group-hover:text-black transition-all">
                      {ev.icon}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-tight">{ev.name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 flex items-center gap-1">
                        <MapPin size={10}/> {ev.loc} • {ev.time}
                      </p>
                    </div>
                  </div>
                  <div className={`mt-4 sm:mt-0 px-4 py-1.5 rounded-full border-2 text-[9px] font-black uppercase tracking-widest
                    ${ev.status === 'Ongoing' ? 'border-[#D9F99D] text-[#D9F99D] animate-pulse bg-[#D9F99D]/5' : 
                      ev.status === 'Finished' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 
                      'border-white/10 text-gray-500'}`}>
                    {ev.status}
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-600 italic">
                  <p>No {ledgerFilter} events found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Entry Pass Card */}
          <div className="col-span-12 lg:col-span-4 bg-[#141414] border-2 border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-100 transition-opacity">
                <QrCode size={140} className="text-[#D9F99D]"/>
             </div>
             <div className="relative z-10 text-center">
                <div className="bg-white p-6 rounded-[2.5rem] border-4 border-black inline-block shadow-[10px_10px_0px_0px_#D9F99D] mb-8 group-hover:scale-105 transition-transform duration-500">
                   <QrCode size={120} className="text-black"/>
                </div>
                <h4 className="text-2xl font-black uppercase italic tracking-tighter">Digital Pass</h4>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 max-w-[200px]">Scan at venue gate for instant authorization</p>
                <button className="mt-8 w-full bg-[#D9F99D] text-black font-black text-xs py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase italic">Download QR</button>
             </div>
          </div>

        </div>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default UserDashboard;