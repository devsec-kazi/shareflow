import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Users, 
  Wallet, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp, 
  Clock,
  ShieldCheck,
  MapPin,
  ChevronRight,
  TrendingDown,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Briefcase,
  Store,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DEMO_TRANSACTIONS } from '../../../constants';
import KYCModal from '../../../components/shared/KYCModal';

export default function AgentDashboard() {
  const { user } = useAuth();
  const [showKYC, setShowKYC] = useState(false);

  const stats = [
    { label: "চলতি মাসের কমিশন", value: "৳১২,৪০০", icon: TrendingUp, color: "text-primary-green", bg: "bg-green-50" },
    { label: "নিবন্ধিত দোকান", value: "১৪", icon: Store, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "বিশ্বস্ততা স্কোর", value: "৯৮%", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  const recentCollections = [
    { id: 'C-৯০১', shop: 'নিউ জনতা স্টোর', amount: 8500, time: '২ ঘণ্টা আগে', status: 'ভেরিফাইড' },
    { id: 'C-৮৯৮', shop: 'সিটি মার্ট', amount: 12000, time: '৫ ঘণ্টা আগে', status: 'ভেরিফাইড' },
    { id: 'C-৮৮৭', shop: 'রহমান ভ্যারাইটিজ', amount: 4500, time: '১ দিন আগে', status: 'পেন্ডিং' },
  ];

  const getKYCBadge = () => {
    const status = user?.verificationStatus || 'pending';
    switch (status) {
      case 'approved': return { icon: CheckCircle2, text: 'ভেরিফাইড এজেন্ট', color: 'bg-green-50 text-primary-green border-green-100' };
      case 'rejected': return { icon: XCircle, text: 'বাতিল', color: 'bg-red-50 text-red-600 border-red-100' };
      default: return { icon: Clock, text: 'অনুমোদনের অপেক্ষায়', color: 'bg-amber-50 text-amber-600 border-amber-100' };
    }
  };

  const badge = getKYCBadge();

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 font-sans">
      {/* Header */}
      <div className="bg-white p-8 md:p-12 rounded-[50px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-900 rounded-[28px] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-gray-300">
                <Briefcase size={35} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-green text-white rounded-xl border-4 border-white flex items-center justify-center shadow-lg">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">এজেন্ট টার্মিনাল</h2>
                <button 
                  onClick={() => setShowKYC(true)}
                  className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 shadow-sm", badge.color)}
                >
                  <badge.icon size={12} /> {badge.text}
                </button>
              </div>
              <p className="text-gray-400 font-bold max-w-md">আপনার এলাকার দোকান এবং লেনদেন পর্যবেক্ষণ কার্যক্রম পরিচালনা করুন।</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white border-2 border-gray-100 px-8 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-primary-green hover:text-primary-green transition-all">
               জোন রিপোর্ট
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-primary-green text-white px-8 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-green-100 hover:bg-primary-green-dark transition-all active:scale-95">
              <Plus size={18} /> নতুন অ্যাক্টিভিটি
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white rounded-[45px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-gray-100 transition-all hover:-translate-y-2"
              >
                <div className={cn("inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-8 transition-all group-hover:rotate-12 shadow-inner", stat.bg)}>
                  <stat.icon className={cn("h-8 w-8", stat.color)} />
                </div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Collection Log */}
          <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-10 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center bg-white sticky top-0 z-10 gap-4">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">কালেকশন লগ</h3>
                <button className="text-[10px] font-black text-primary-green hover:underline uppercase tracking-widest group">কালেকশন হিস্ট্রি <ChevronRight size={18} className="inline group-hover:translate-x-1 transition-transform" /></button>
             </div>
             <div className="divide-y divide-gray-50">
               {recentCollections.map((entry) => (
                 <div key={entry.id} className="p-10 hover:bg-gray-50/30 transition-all flex flex-col sm:flex-row items-center justify-between group gap-6">
                    <div className="flex items-center gap-6">
                       <div className={cn(
                         "w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform",
                         entry.status === 'ভেরিফাইড' ? "bg-green-50" : "bg-amber-50"
                       )}>
                         {entry.status === 'ভেরিফাইড' ? <CheckCircle2 className="text-primary-green" size={28} /> : <Clock className="text-amber-500" size={28} />}
                       </div>
                       <div className="text-left">
                         <p className="font-black text-gray-900 uppercase tracking-tighter text-xl leading-none mb-3 group-hover:text-primary-green transition-colors">{entry.shop}</p>
                         <div className="flex items-center gap-3">
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">আইডি: {entry.id}</span>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{entry.time}</span>
                         </div>
                       </div>
                    </div>
                    <div className="text-center sm:text-right">
                       <p className="text-3xl font-black text-gray-900 tracking-tighter mb-2">৳{entry.amount.toLocaleString()}</p>
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border shadow-sm",
                         entry.status === 'ভেরিফাইড' ? "text-primary-green border-green-200 bg-green-50" : "text-amber-600 border-amber-200 bg-amber-50"
                       )}>
                         {entry.status}
                       </span>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
          <div className="p-10 bg-gray-900 rounded-[50px] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary-green transition-all duration-500">
                  <Wallet size={32} className="text-primary-green group-hover:text-white" />
                </div>
                <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center">
                   <Plus size={20} className="text-gray-500" />
                </button>
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 underline decoration-gray-700 underline-offset-4">এজেন্ট কমিশন ভল্ট</p>
              <h3 className="text-5xl font-black tracking-tighter mb-4">৳{user?.walletBalance?.toLocaleString() || '৫,২০০'}</h3>
              
              <div className="mt-12 pt-12 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center opacity-80 group/row cursor-pointer transition-all hover:translate-x-2">
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover/row:text-primary-green transition-colors">পেন্ডিং কালেকশন</p>
                   <p className="font-black text-sm text-amber-500 tracking-tighter">৳৪৫০.৫০</p>
                </div>
                <div className="flex justify-between items-center group/row cursor-pointer transition-all hover:translate-x-2">
                   <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest group-hover/row:text-primary-green transition-colors">উত্তোলনযোগ্য ব্যালেন্স</p>
                   <p className="font-black text-sm text-green-400 tracking-tighter">৳৪,৭৪৯.৫০</p>
                </div>
              </div>
              
              <button className="w-full mt-12 py-6 bg-primary-green text-white rounded-[28px] font-black uppercase tracking-widest text-[11px] hover:bg-primary-green-dark transition-all shadow-2xl shadow-green-900/50 flex items-center justify-center gap-4 active:scale-[0.98]">
                উত্তোলনের আবেদন <ChevronRight size={20} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>
          </div>

          <div className="p-10 bg-white border border-gray-100 rounded-[50px] shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-[60px] opacity-30"></div>
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="text-xl font-black text-gray-900 tracking-tighter uppercase whitespace-nowrap">জরুরি অ্যালার্ট</h4>
             </div>
             <div className="space-y-6 relative z-10 font-sans">
                <div className="p-6 bg-red-50/40 rounded-[35px] border border-red-50 group hover:bg-red-50/60 transition-all hover:shadow-lg hover:shadow-red-50">
                   <div className="flex justify-between items-start mb-4">
                     <p className="text-[9px] font-black text-red-600 uppercase tracking-widest underline underline-offset-4">স্টক অ্যালার্ট</p>
                     <Clock size={16} className="text-red-300" />
                   </div>
                   <p className="text-xs text-red-900 font-bold leading-relaxed">"নিউ জনতা স্টোর" এর ৪টি পণ্যের স্টক শেষ হয়ে গেছে। এখনই সরবরাহ নিশ্চিত করুন।</p>
                </div>
                <div className="p-6 bg-amber-50/40 rounded-[35px] border border-amber-50 group hover:bg-amber-50/60 transition-all hover:shadow-lg hover:shadow-amber-50">
                   <div className="flex justify-between items-start mb-4">
                     <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest underline underline-offset-4">কালেকশন সময়</p>
                     <Clock size={16} className="text-amber-300" />
                   </div>
                   <p className="text-xs text-amber-900 font-bold leading-relaxed">সিটি মার্ট এর কালেকশন উইন্ডো বন্ধ হতে আর মাত্র ৪ ঘণ্টা বাকি। দ্রুত রিপোর্ট সাবমিট করুন।</p>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />
    </div>
  );
}
