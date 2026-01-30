import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, X, ChevronRight, Cpu, Music, Trophy, BookOpen, Zap, Trash2, Smartphone, ExternalLink, MapPin } from 'lucide-react';

// --- SUB-COMPONENT: TYPEWRITER ---
const TypewriterText = ({ text, delay = 20, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text?.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay, onComplete]);
  return <span>{displayedText}</span>;
};

const EventAIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // --- UNIVERSITY DATABASE ---
  const universityEvents = [
    { id: 1, name: "Neural Knights 2.0", tags: ["tech", "coding", "ai"], price: "Free", loc: "CS Block", iconType: "tech" },
    { id: 2, name: "Antaragni Fest", tags: ["cultural", "music", "dance"], price: "₹200", loc: "Main Hall", iconType: "cultural" },
    { id: 3, name: "Uni-Cricket Finals", tags: ["sports", "cricket"], price: "Free", loc: "Ground", iconType: "sports" },
    { id: 4, name: "Future of AI Seminar", tags: ["academic", "seminar"], price: "Free", loc: "Hall 1", iconType: "academic" },
    { id: 5, name: "Fusion DJ Night", tags: ["cultural", "party"], price: "₹350", loc: "OAT", iconType: "cultural" },
    { id: 6, name: "Robo-War 2026", tags: ["tech", "robotics"], price: "₹100", loc: "Plaza", iconType: "tech" }
  ];

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('uniChatHistoryV11');
      return saved ? JSON.parse(saved) : [
        { role: 'bot', content: "Namaste! I am HUB-Bot. 🎓\n\nI can find the best campus events for you. Tell me, what are you interested in today?\n(e.g., Cultural, Tech, or Sports?)", isNew: false }
      ];
    } catch (e) { return [{ role: 'bot', content: "Welcome back!" }]; }
  });

  useEffect(() => {
    const cleanHistory = messages.map(m => ({ ...m, isNew: false }));
    localStorage.setItem('uniChatHistoryV11', JSON.stringify(cleanHistory));
    if (isOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const getIcon = (type) => {
    switch(type) {
      case 'tech': return <Cpu size={14} />;
      case 'cultural': return <Music size={14} />;
      case 'sports': return <Trophy size={14} />;
      case 'academic': return <BookOpen size={14} />;
      default: return <Zap size={14} />;
    }
  };

  const handleSend = (forcedInput = null) => {
    const textToSend = forcedInput || input;
    if (!textToSend || typeof textToSend !== 'string' || !textToSend.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: textToSend, isNew: false }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const t = textToSend?.toLowerCase() || "";
      let botResponse = { role: 'bot', isNew: true };

      // SMART INTEREST LOGIC
      if (t.match(/hi|hello|hey|namaste/)) {
        botResponse.content = "Hey! Great to see you. What's your interest today? I can show you Cultural fests, Tech hackathons, or Sports meets.";
      } else {
        let matches = universityEvents.filter(ev => 
          ev?.tags?.some(tag => t.includes(tag)) || t.includes(ev?.iconType || "")
        );

        if (matches.length > 0) {
          botResponse.content = `Epic choice! Based on your interest in ${t}, here are the top campus picks:`;
          botResponse.suggestions = matches.slice(0, 4);
        } else {
          botResponse.content = "I couldn't find a direct match for that. But here are some trending events you might like:";
          botResponse.suggestions = universityEvents.slice(0, 3);
        }
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[350px] md:w-[420px] h-[600px] bg-white border-[4px] border-black shadow-[16px_16px_0px_0px_#000] rounded-[2.5rem] flex flex-col overflow-hidden animate-in zoom-in duration-200">
          
          <div className="bg-black p-5 flex justify-between items-center text-white border-b-4 border-black">
            <div className="flex items-center gap-2">
              <Bot className="text-[#C1FF72] animate-pulse" size={20} />
              <span className="font-black text-[10px] uppercase italic text-[#C1FF72]">Events HUB AI</span>
            </div>
            <div className="flex gap-4">
              <Trash2 size={18} className="cursor-pointer hover:text-red-500" onClick={() => { setMessages([]); localStorage.removeItem('uniChatHistoryV11'); window.location.reload(); }} />
              <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#F8F9FA] custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                   <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-black text-white' : 'bg-[#C1FF72] text-black shadow-[2px_2px_0px_0px_#000]'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                   </div>
                   <div className="space-y-4 flex-1">
                      <div className={`p-4 rounded-2xl border-2 border-black text-xs font-bold shadow-[4px_4px_0px_0px_#000] bg-white leading-relaxed`}>
                        {msg.role === 'bot' && msg.isNew ? <TypewriterText text={msg.content} /> : msg.content}
                      </div>
                      
                      {msg.suggestions && (
                        <div className="grid gap-3">
                           {msg.suggestions.map(ev => (
                             <div key={ev.id} className="bg-white border-2 border-black p-4 rounded-2xl flex flex-col gap-2 hover:bg-black hover:text-[#C1FF72] transition-all group shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none cursor-pointer">
                               <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-2 uppercase font-black text-[10px]">
                                    {getIcon(ev.iconType)} {ev.name}
                                  </div>
                                  <span className="text-[8px] font-black bg-gray-100 group-hover:bg-[#C1FF72] px-2 py-0.5 rounded border border-black">{ev.price}</span>
                               </div>
                               <div className="flex items-center gap-4 text-[8px] font-bold opacity-60">
                                  <span className="flex items-center gap-1"><MapPin size={10} /> {ev.loc}</span>
                               </div>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[9px] font-black animate-pulse uppercase ml-12 text-gray-400">Analyzing Interests...</div>}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Interest Buttons */}
          <div className="px-5 py-3 bg-white border-t-2 border-black flex gap-2 overflow-x-auto no-scrollbar">
            {['Cultural', 'Tech', 'Sports', 'Academic'].map((cat) => (
              <button key={cat} onClick={() => handleSend(cat)} className="whitespace-nowrap bg-white border-2 border-black px-3 py-1.5 rounded-full text-[9px] font-black uppercase hover:bg-black hover:text-[#C1FF72] transition-all shadow-[2px_2px_0px_0px_#000]">
                {cat}
              </button>
            ))}
          </div>

          <div className="p-6 border-t-4 border-black bg-white">
            <div className="flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-gray-100 border-2 border-black rounded-2xl px-5 py-4 text-xs font-bold outline-none focus:bg-white transition-all"
                placeholder="Talk to HUB-Bot..." 
              />
              <button onClick={() => handleSend()} className="bg-[#C1FF72] border-2 border-black px-6 rounded-2xl shadow-[6px_6px_0px_0px_#000] active:translate-y-1 transition-all">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-20 h-20 rounded-[2.5rem] border-4 border-black bg-[#C1FF72] shadow-[10px_10px_0px_0px_#000] flex items-center justify-center hover:scale-105 transition-all">
        {isOpen ? <X size={32} /> : <div className="relative"><Smartphone size={32} /><div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full animate-pulse"></div></div>}
      </button>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default EventAIChatbot;          