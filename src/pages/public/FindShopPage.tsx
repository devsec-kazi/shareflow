import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Search, MapPin, Filter, Navigation2, Phone, Share2, ChevronLeft, Store, UserCheck, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { DEMO_SHOPS, DEMO_AGENTS } from '../../constants';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

export default function FindShopPage() {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'shop' | 'agent'>('shop');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const combinedData = mode === 'shop' 
    ? DEMO_SHOPS.map(s => ({ ...s, type: 'shop' })) 
    : DEMO_AGENTS.map(a => ({ ...a, type: 'agent', image: 'https://images.unsplash.com/photo-1556742049-04ffbd36b57b?auto=format&fit=crop&q=80&w=600' }));

  const filteredData = combinedData.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-[450px] lg:w-[500px] border-r border-gray-100 flex flex-col h-full bg-white z-20 shadow-2xl relative">
        <div className="p-8 border-b border-gray-50">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <Link to="/" className="p-2.5 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
                   <ChevronLeft className="text-gray-900" size={20} />
                </Link>
                <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">সার্ভিস ফাইন্ডার</h2>
             </div>
             <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                <button 
                  onClick={() => setMode('shop')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    mode === 'shop' ? "bg-white text-primary-green shadow-md" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Store size={14} /> দোকান
                </button>
                <button 
                  onClick={() => setMode('agent')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    mode === 'agent' ? "bg-white text-blue-500 shadow-md" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <UserCheck size={14} /> এজেন্ট
                </button>
             </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-5 top-5 text-gray-300 h-5 w-5 group-focus-within:text-primary-green transition-colors" />
            <input 
              type="text" 
              placeholder={mode === 'shop' ? "দোকান খুঁজুন..." : "এজেন্ট খুঁজুন..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[24px] text-sm focus:bg-white focus:border-primary-green transition-all outline-none font-bold shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  "p-6 rounded-[35px] border transition-all group cursor-pointer relative flex gap-6 items-center",
                  selectedId === item.id 
                    ? "bg-green-50/50 border-primary-green shadow-xl shadow-green-100" 
                    : "border-gray-50 bg-white hover:border-primary-green/30 hover:shadow-2xl hover:shadow-gray-100"
                )}
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-50 shadow-sm">
                   <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                
                <div className="flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-primary-green transition-colors tracking-tight leading-tight">{item.name}</h3>
                      {mode === 'shop' && (
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-[10px]">
                           <Star size={12} className="fill-current" /> {(item as any).rating}
                        </div>
                      )}
                   </div>
                   <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 mb-4 max-w-[200px] line-clamp-1">
                      <MapPin size={12} className="text-primary-green" /> {item.location}
                   </p>
                   
                   <div className="flex gap-2">
                     <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary-green transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        <Navigation2 size={12} /> ডিরেকশন
                     </button>
                     <button className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-xl text-gray-400 hover:text-primary-green hover:bg-green-50 hover:border-primary-green/30 transition-all active:scale-95 shrink-0">
                        <Phone size={16} />
                     </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredData.length === 0 && (
            <div className="text-center py-20 px-10">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                 <Search className="text-gray-200" size={40} />
              </div>
              <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">কিছুই পাওয়া যায়নি</h4>
              <p className="text-gray-400 font-bold text-sm leading-relaxed max-w-xs mx-auto">দুঃখিত, আপনার দেওয়া তথ্যের সাথে কোনো {mode === 'shop' ? 'দোকান' : 'এজেন্ট'} খুঁজে পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 bg-[#f8fafc] relative z-10 hidden md:block">
        {!API_KEY ? (
          <div className="absolute inset-0 flex items-center justify-center p-12">
             <div className="max-w-xl text-center bg-white p-16 rounded-[60px] border border-gray-100 shadow-2xl shadow-gray-200 animate-in zoom-in-95 duration-700">
              <div className="w-32 h-32 bg-green-50 text-primary-green rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner group">
                <MapPin className="h-16 w-16 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">গুগল ম্যাপ এপিআই <br /><span className="text-primary-green underline decoration-gray-100 decoration-8 underline-offset-8">প্রয়োজন!</span></h2>
              <p className="text-gray-400 font-bold mb-12 leading-relaxed text-lg max-w-md mx-auto italic">
                ইন্টারেক্টিভ ম্যাপ দেখার জন্য সিক্রেট প্যানেলে আপনার <b>GOOGLE_MAPS_PLATFORM_KEY</b> যুক্ত করুন।
              </p>
              <div className="p-10 bg-gray-900 rounded-[40px] text-left shadow-2xl shadow-gray-200">
                <h4 className="text-xs font-black text-primary-green uppercase tracking-[0.3em] mb-6">নির্দেশনা:</h4>
                <ol className="text-[11px] text-gray-400 space-y-4 list-decimal list-inside font-black uppercase tracking-widest leading-relaxed">
                  <li><span className="text-white">Settings</span> প্যানেলে যান</li>
                  <li><span className="text-white">Secrets</span> সেকশনে ক্লিক করুন</li>
                  <li><code>GOOGLE_MAPS_PLATFORM_KEY</code> হিসেবে কী ইনসার্ট করুন</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{ lat: 23.8103, lng: 90.4125 }}
              defaultZoom={12}
              mapId="SHAREFLOW_MODERN_MAP"
              style={{ width: '100%', height: '100%' }}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              {filteredData.map(item => (
                <AdvancedMarker 
                  key={item.id} 
                  position={{ lat: (item as any).lat || 23.8103, lng: (item as any).lng || 90.4125 }}
                  onClick={() => setSelectedId(item.id)}
                >
                  <Pin 
                    background={mode === 'agent' ? '#3b82f6' : '#22c55e'} 
                    borderColor="#fff" 
                    glyphColor="#fff"
                    scale={selectedId === item.id ? 1.5 : 1}
                  />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        )}
      </div>
    </div>
  );
}
