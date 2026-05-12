import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err: any) {
      setError('পাসওয়ার্ড রিসেট ইমেইল পাঠানো যায়নি। ইমেইলটি সঠিক কিনা যাচাই করুন।');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#fcfcfc] font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 p-12 sm:p-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-[60px]"></div>
        
        <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 mb-12 uppercase tracking-widest hover:translate-x-[-4px] transition-transform relative z-10">
          <ChevronLeft size={16} /> লগইনে ফিরে যান
        </Link>

        {!sent ? (
          <div className="relative z-10">
            <div className="mb-12">
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">পাসওয়ার্ড পুনরুদ্ধার</span>
               <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">ভুলে গেছেন?</h1>
               <p className="text-gray-400 text-xs font-medium mt-6 italic leading-relaxed">আমরা আপনার নিবন্ধিত ইমেইলে একটি রিকভারি লিংক পাঠাব। অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">ইমেইল ঠিকানা</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-5 text-gray-300 h-5 w-5" />
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 outline-none transition-all font-black text-gray-900 shadow-inner"
                    placeholder="name@email.com"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-xs font-black bg-red-50 py-3 px-6 rounded-2xl border border-red-100">{error}</p>}
              <button type="submit" className="w-full bg-gray-900 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-3 group">
                লিংক পাঠান <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <div className="w-24 h-24 bg-green-50 text-green-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-tight">ইমেইল চেক করুন</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-12 italic">
              আমরা আপনার <span className="font-black text-gray-900 underline decoration-blue-200 decoration-2">{email}</span> ঠিকানায় পাসওয়ার্ড রিসেট নির্দেশাবলী পাঠিয়েছি।
            </p>
            <button onClick={() => setSent(false)} className="text-[10px] font-black text-blue-600 hover:text-gray-900 uppercase tracking-widest transition-colors mb-4">
              ইমেইল পাননি? আবার চেষ্টা করুন
            </button>
            <div className="pt-8 border-t border-gray-50 mt-8">
               <Link to="/login" className="w-full bg-gray-900 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 block">
                  লগইনে ফিরে যান
               </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
