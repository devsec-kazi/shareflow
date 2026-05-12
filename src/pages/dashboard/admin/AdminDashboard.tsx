import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Users, 
  Package, 
  BarChart3, 
  ShieldAlert, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Activity,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  TrendingUp,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Store,
  Briefcase,
  Clock,
  ArrowUpRight,
  Tablet,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, getDocs, updateDoc, doc, limit } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { cn } from '../../../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KYCModal from '../../../components/shared/KYCModal';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'ওভারভিউ' | 'ব্যবহারকারী' | 'অনুমোদন' | 'সেটিংস'>('ওভারভিউ');
  const [showKYC, setShowKYC] = useState(false);

  const stats = [
    { label: 'নেটওয়ার্ক সেলস', value: '৳২৫.৪৫ লক্ষ', change: '+১২.৫%', icon: TrendingUp, color: 'text-primary-green', bg: 'bg-green-50' },
    { label: 'সক্রিয় মার্চেন্ট', value: '১,২৪০', change: '+৪.২%', icon: Store, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'মাঠ পর্যায়ের এজেন্ট', value: '৮৫', change: '+২', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'KYC পেন্ডিং', value: '১৪', change: '-৫', icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const salesData = [
    { name: 'শনি', value: 4000 },
    { name: 'রবি', value: 3000 },
    { name: 'সোম', value: 5000 },
    { name: 'মঙ্গল', value: 4500 },
    { name: 'বুধ', value: 6000 },
    { name: 'বৃহস্পতি', value: 7500 },
    { name: 'শুক্র', value: 6800 },
  ];

  const pendingKYC = [
    { id: 'K-০০১', name: 'মোঃ জামান আহমেদ', role: 'দোকান মালিক', date: '৫ মিনিট আগে', status: 'পেন্ডিং' },
    { id: 'K-০০২', name: 'এলিট ইলেকট্রনিক্স', role: 'দোকান মালিক', date: '২ ঘণ্টা আগে', status: 'পেন্ডিং' },
    { id: 'K-০০৩', name: 'কুইক ডেলিভারি', role: 'এজেন্ট', date: '৪ ঘণ্টা আগে', status: 'পেন্ডিং' },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 font-sans">
      {/* Admin Header */}
      <div className="bg-gray-900 rounded-[50px] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-green/20 rounded-full blur-[120px] -mr-48 -mt-48 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white/10 rounded-[30px] flex items-center justify-center text-primary-green text-4xl font-black shadow-2xl border border-white/5 group-hover:rotate-12 transition-transform duration-500">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">সেন্ট্রাল কমান্ড</h1>
                  <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary-green/30 bg-primary-green/10 text-primary-green shadow-xl shadow-primary-green/5">
                    <ShieldCheck size={14} /> সিস্টেম অ্যাডমিন
                  </span>
                </div>
                <p className="text-gray-400 font-bold max-w-xl">ShareFlow ইকোসিস্টেমের সার্বিক পর্যবেক্ষণ এবং সিকিউরিটি গেটওয়ে।</p>
              </div>
            </div>
            
            <div className="flex bg-white/5 p-2 rounded-[28px] border border-white/10 backdrop-blur-sm self-stretch md:self-auto overflow-x-auto no-scrollbar">
              {['ওভারভিউ', 'ব্যবহারকারী', 'অনুমোদন', 'সেটিংস'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "px-8 py-4 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    activeTab === tab ? "bg-primary-green text-white shadow-2xl shadow-green-900/50" : "text-gray-500 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ওভারভিউ' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-10"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm relative group overflow-hidden hover:shadow-2xl hover:shadow-gray-100 transition-all hover:-translate-y-2"
                >
                  <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 shadow-inner group-hover:rotate-12 transition-transform", stat.bg)}>
                    <stat.icon className={cn("h-8 w-8", stat.color)} />
                  </div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2 font-mono">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                    <div className={cn("flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-lg border", stat.change.startsWith('+') ? "text-primary-green bg-green-50 border-green-100" : "text-red-500 bg-red-50 border-red-100")}>
                      <TrendingUp size={10} className={stat.change.startsWith('-') ? 'rotate-180' : ''} /> {stat.change}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* Performance Chart */}
              <div className="lg:col-span-8 bg-white rounded-[55px] border border-gray-100 shadow-sm p-10 md:p-16">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-primary-green">
                        <Activity size={24} />
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">নেটওয়ার্ক পারফরম্যান্স</h3>
                  </div>
                  <div className="flex bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                    <button className="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">সাপ্তাহিক</button>
                    <button className="px-6 py-2.5 bg-white text-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-gray-100 transition-all">মাসিক</button>
                  </div>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ left: -20, right: 0, bottom: 0, top: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.15}/>
                          <stop offset="100%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#cbd5e1' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#cbd5e1' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '30px', border: 'none', boxShadow: '0 40px 60px -15px rgba(0, 0, 0, 0.1)', padding: '24px' }}
                        itemStyle={{ fontWeight: 900, fontSize: '16px', color: '#111827' }}
                        cursor={{ stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '6 6' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={5} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KYC Sentinel */}
              <div className="lg:col-span-4 bg-white rounded-[55px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-12 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                        <ShieldCheck size={20} />
                     </div>
                     <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">ভেরিফিকেশন গেট</h3>
                  </div>
                  <span className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg shadow-amber-100">{pendingKYC.length}</span>
                </div>
                <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
                  {pendingKYC.map((kyc) => (
                    <div key={kyc.id} className="p-10 hover:bg-gray-50/50 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-2">
                          <p className="font-black text-gray-900 uppercase tracking-tighter text-xl leading-none group-hover:text-primary-green transition-colors">{kyc.name}</p>
                          <div className="flex items-center gap-3">
                             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{kyc.role}</span>
                             <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{kyc.date}</span>
                          </div>
                        </div>
                        <button className="w-12 h-12 flex items-center justify-center border border-gray-100 rounded-2xl text-gray-300 hover:text-primary-green hover:bg-green-50 transition-all active:scale-90 shadow-sm">
                           <ArrowUpRight size={22} />
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 py-4 bg-green-50 text-primary-green text-[10px] font-black uppercase tracking-widest rounded-2xl border border-green-100 hover:bg-primary-green hover:text-white transition-all shadow-sm active:scale-95">অনুমোদন</button>
                        <button className="flex-1 py-4 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95">রিজেক্ট</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="p-10 text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] hover:bg-gray-50 transition-all border-t border-gray-50 flex items-center justify-center gap-3 group">
                  সবগুলো পেন্ডিং দেখুন <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />
    </div>
  );
}
