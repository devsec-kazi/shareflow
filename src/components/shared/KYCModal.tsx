import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Upload, X, CheckCircle2, AlertCircle, FileText, User, Camera, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KYCModal({ isOpen, onClose }: KYCModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    nationalId: '',
    dob: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setStep(3);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[60px] w-full max-w-4xl overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col md:flex-row min-h-[600px]"
          >
            {/* Left Section - Identity & Progress */}
            <div className="md:w-[350px] bg-gray-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-[24px] flex items-center justify-center mb-10 shadow-xl shadow-blue-900/50">
                   <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-tight">পরিচয় <br />যাচাইকরণ</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic">আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে এবং উচ্চতর লেনদেনের সুযোগ পেতে KYC সম্পন্ন করুন।</p>
              </div>
              
              <div className="space-y-6 relative z-10">
                {[
                  { id: 1, label: 'ব্যক্তিগত তথ্য', icon: User },
                  { id: 2, label: 'দলিল আপলোড', icon: Camera },
                  { id: 3, label: 'সম্পন্ন', icon: CheckCircle2 }
                ].map((s) => (
                  <div key={s.id} className="flex items-center gap-5">
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center transition-all border shrink-0",
                      step >= s.id ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50" : "bg-white/5 border-white/10 text-gray-600"
                    )}>
                      {step > s.id ? <CheckCircle2 size={20} /> : <s.icon size={20} />}
                    </div>
                    <div>
                      <p className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em]",
                        step >= s.id ? "text-white" : "text-gray-600"
                      )}>ধাপ {s.id}</p>
                      <p className={cn(
                        "font-black text-sm tracking-tight",
                        step >= s.id ? "text-blue-400" : "text-gray-700"
                      )}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={onClose}
                className="mt-12 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors relative z-10"
              >
                <ArrowLeft size={14} /> ফিরে যান
              </button>
            </div>

            {/* Right Section - Content Area */}
            <div className="flex-1 p-12 sm:p-20 flex flex-col justify-center bg-[#fcfcfc] relative">
              <div className="absolute top-10 right-10">
                <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all text-gray-400 hover:text-gray-900">
                   <X size={24} />
                </button>
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md w-full">
                  <h4 className="text-3xl font-black text-gray-900 mb-10 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">ব্যক্তিগত প্রোফাইল</h4>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">আইনগত পূর্ণ নাম</label>
                      <input 
                        value={formData.fullName} 
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-6 py-4 rounded-[24px] bg-white border border-gray-100 outline-none focus:border-blue-500 transition-all text-sm font-black text-gray-900 shadow-sm" 
                        placeholder="আপনার এনআইডি কার্ড অনুযায়ী"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">জাতীয় পরিচয়পত্র নম্বর</label>
                        <input 
                          placeholder="xxxxxxxxxx"
                          className="w-full px-6 py-4 rounded-[24px] bg-white border border-gray-100 outline-none focus:border-blue-500 transition-all text-xs font-black tracking-[0.2em] text-gray-900 shadow-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">জন্ম তারিখ</label>
                        <input 
                          type="date"
                          className="w-full px-6 py-4 rounded-[24px] bg-white border border-gray-100 outline-none focus:border-blue-500 transition-all text-xs font-black text-gray-900 shadow-sm" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">স্থায়ী ঠিকানা</label>
                      <textarea 
                        rows={2}
                        placeholder="গ্রাম, ডাকঘর, থানা, জেলা"
                        className="w-full px-6 py-4 rounded-[24px] bg-white border border-gray-100 outline-none focus:border-blue-500 transition-all text-sm font-medium text-gray-900 shadow-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full mt-12 bg-gray-900 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    পরবর্তী ধাপ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md w-full">
                  <h4 className="text-3xl font-black text-gray-900 mb-10 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">দলিল আপলোড</h4>
                  <div className="space-y-6">
                    <div className="border-4 border-dashed border-gray-100 rounded-[40px] p-10 flex flex-col items-center justify-center hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group bg-white shadow-inner">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                         <FileText size={32} />
                      </div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">এনআইডি কার্ডের সামনের অংশ</p>
                      <p className="text-[9px] text-blue-500 font-bold underline">ফাইল সিলেক্ট করুন</p>
                    </div>
                    <div className="border-4 border-dashed border-gray-100 rounded-[40px] p-10 flex flex-col items-center justify-center hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group bg-white shadow-inner">
                      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                         <Camera size={32} />
                      </div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">আপনার সেলফি (ডকুমেন্ট সহ)</p>
                      <p className="text-[9px] text-purple-500 font-bold underline">ক্যামেরা ওপেন করুন</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-12">
                    <button onClick={() => setStep(1)} className="px-8 bg-gray-100 text-gray-900 font-black rounded-[28px] uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all active:scale-95">পিছনে</button>
                    <button 
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-blue-600 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 flex items-center justify-center gap-3"
                    >
                      {submitting ? (
                        <>প্রসেসিং হচ্ছে...</>
                      ) : (
                        <>আবেদন সাবমিট করুন <ShieldCheck size={16} /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm w-full mx-auto">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-tight">আবেদন গ্রহণ <br />করা হয়েছে!</h4>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed mb-12 italic">আপনার ডকুমেন্টগুলো পর্যালোচনার জন্য পাঠানো হয়েছে। সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে আমরা ভেরিফিকেশন সম্পন্ন করি। আপডেট পেতে আপনার নোটিফিকেশন চেক করুন।</p>
                  <button 
                    onClick={onClose}
                    className="w-full bg-gray-900 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
                  >
                    ড্যাশবোর্ডে ফিরে যান
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
