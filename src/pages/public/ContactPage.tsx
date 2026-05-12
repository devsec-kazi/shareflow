import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronRight, Clock, Shield } from 'lucide-react';
import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8fafc] font-sans min-h-[calc(100vh-100px)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-8 shadow-xl shadow-green-500/20">
                <MessageCircle size={14} /> যোগাযোগ করুন
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">আপনার কি কোনো <br /><span className="text-primary-green underline decoration-gray-200 decoration-8 underline-offset-8">সহায়তা প্রয়োজন?</span></h1>
              <p className="text-lg text-gray-400 mb-14 font-medium leading-relaxed max-w-md">আমাদের প্ল্যাটফর্ম সম্পর্কে কোনো প্রশ্ন বা সমস্যা থাকলে আমাদের অভিজ্ঞ সাপোর্ট টিম আপনার সেবায় সর্বদা প্রস্তুত।</p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-16">
              <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-primary-green mb-6 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ইমেইল করুন</p>
                <p className="text-base font-black text-gray-900 tracking-tight">support@shareflow.com.bd</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">কল করুন</p>
                <p className="text-base font-black text-gray-900 tracking-tight">+৮৮০ ১৮০০-০০০০০০</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">অফিস সময়</p>
                <p className="text-base font-black text-gray-900 tracking-tight">সকাল ১০:০০ - রাত ০৮:০০</p>
              </div>
              <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <Shield size={24} />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">নিরাপত্তা</p>
                <p className="text-base font-black text-gray-900 tracking-tight">শতভাগ সুরক্ষিত যোগাযোগ</p>
              </div>
            </div>

            <div className="p-8 bg-gray-900 rounded-[40px] text-white flex items-center gap-6 shadow-2xl shadow-gray-300">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary-green backdrop-blur-xl">
                 <MapPin className="h-7 w-7" />
              </div>
              <div>
                <p className="font-black text-lg mb-1 leading-none">ঢাকা হেড অফিস</p>
                <p className="text-gray-500 text-sm font-bold">বনানী সিটি কমপ্লেক্স, লেভেল ৫, ঢাকা</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl shadow-gray-200 border border-gray-100 relative w-full"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-[100px] -z-10"></div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="text-center md:text-left mb-10">
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase mb-2">বার্তা লিখুন</h3>
                   <div className="w-12 h-1.5 bg-primary-green rounded-full mx-auto md:mx-0"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase block tracking-[0.2em] ml-2">আপনার পূর্ণ নাম</label>
                    <input required className="w-full px-8 py-5 rounded-[22px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green outline-none transition-all font-bold text-sm text-gray-900" placeholder="মোঃ জাবের আহমেদ" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase block tracking-[0.2em] ml-2">ফোন নম্বর</label>
                    <input required className="w-full px-8 py-5 rounded-[22px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green outline-none transition-all font-bold text-sm text-gray-900" placeholder="+৮৮০ ১৭১..." />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase block tracking-[0.2em] ml-2">ইমেইল ঠিকানা</label>
                  <input required type="email" className="w-full px-8 py-5 rounded-[22px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green outline-none transition-all font-bold text-sm text-gray-900" placeholder="example@mail.com" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase block tracking-[0.2em] ml-2">আপনার বার্তা</label>
                  <textarea required rows={5} className="w-full px-8 py-5 rounded-[22px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-green outline-none transition-all resize-none font-bold text-sm text-gray-900" placeholder="আমরা আপনাকে কীভাবে সাহায্য করতে পারি?"></textarea>
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white font-black uppercase tracking-widest text-[11px] py-6 rounded-[25px] hover:bg-primary-green transition-all flex items-center justify-center gap-4 shadow-2xl shadow-gray-200 active:scale-95 group">
                  বার্তা পাঠান <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            ) : (
              <div className="text-center py-20 px-4">
                <div className="w-28 h-28 bg-green-50 text-primary-green rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner group transition-all">
                  <Send className="h-12 w-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tighter uppercase">বার্তা পাঠানো হয়েছে!</h2>
                <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed mb-12">আমাদের বিশেষজ্ঞ টিম আগামী ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে। ধৈর্য ধরুন।</p>
                <button onClick={() => setSubmitted(false)} className="px-10 py-4 border-2 border-primary-green text-primary-green font-black rounded-full hover:bg-primary-green hover:text-white transition-all uppercase text-[10px] tracking-widest">নতুন বার্তা পাঠান</button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
