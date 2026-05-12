import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, MailCheck, Smartphone, User, Store, UserCheck, ChevronLeft } from 'lucide-react';
import { auth, db } from '../../services/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

type Step = 'role' | 'details' | 'otp';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<'customer' | 'agent' | 'shop_owner' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: any) => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) {
      setError('অনুগ্রহ করে শর্তাবলী গ্রহণ করুন');
      return;
    }
    setError('');
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(user, { displayName: formData.name });
      
      const userData = {
        uid: user.uid,
        email: formData.email,
        displayName: formData.name,
        phone: formData.phone,
        role: role,
        verificationStatus: 'pending',
        walletBalance: 0,
        referralCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      navigate('/dashboard/' + (role === 'shop_owner' ? 'shop' : role));
    } catch (err: any) {
      setError(err.message);
      setStep('details');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'customer', title: 'কাস্টমার', desc: 'আমি কেনাকাটা করতে এবং অফার পেতে চাই।', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'shop_owner', title: 'দোকানদার', desc: 'আমি অনলাইনে পণ্য বিক্রি এবং ইনভেন্টরি ম্যানেজ করতে চাই।', icon: Store, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'agent', title: 'এজেন্ট', desc: 'আমি আর্থিক লেনদেন এবং বাণিজ্যের লজিস্টিকস ম্যানেজ করতে চাই।', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#fcfcfc] font-sans overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Branding Panel */}
        <div className="md:w-[350px] bg-gray-900 p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
            <Link to="/" className="text-3xl font-black italic tracking-tighter text-blue-500 mb-12 block">ShareFlow</Link>
            <h2 className="text-4xl font-black leading-tight tracking-tighter mb-6 uppercase underline decoration-blue-600 decoration-8 underline-offset-4">নতুন <br />যাত্রা শুরু।</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed italic">বাংলাদেশের এক নম্বর বাণিজ্যের ইকো সিস্টেমে আপনাকে স্বাগতম। আধুনিক সুযোগ সুবিধায় আপনার ব্যবসা বড় করুন।</p>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 border border-white/5">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">নিরাপদ কেওয়াইসি (KYC)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-green-400 border border-white/5">
                <MailCheck size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">স্মার্ট ওটিপি ভেরিফিকেশন</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 p-12 sm:p-20 flex flex-col justify-center bg-white relative">
          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-12">
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">রেজিস্ট্রেশন শুরু করুন</span>
                   <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">একাউন্ট তৈরি করুন</h1>
                </div>
                
                <div className="grid gap-4 mb-12">
                  {roles.map((r) => (
                    <button 
                      key={r.id} 
                      onClick={() => handleRoleSelect(r.id)} 
                      className="group flex items-center gap-6 p-6 rounded-[32px] border border-gray-50 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-left bg-white shadow-sm hover:shadow-xl hover:shadow-blue-50 active:scale-95"
                    >
                      <div className={cn("w-16 h-16 rounded-[22px] flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner", r.bg, r.color)}>
                        <r.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="font-black text-xl text-gray-900 leading-tight uppercase tracking-tight">{r.title}</h3>
                        <p className="text-xs text-gray-400 font-medium">{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs font-black uppercase tracking-widest text-gray-400">
                  ইতিমধ্যেই একাউন্ট আছে? <Link to="/login" className="text-blue-600 hover:underline">লগইন করুন</Link>
                </p>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button onClick={() => setStep('role')} className="text-[10px] font-black text-blue-600 mb-10 flex items-center gap-2 uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
                  <ChevronLeft size={16} /> রোল পরিবর্তন করুন
                </button>
                <div className="mb-10">
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">প্রয়োজনীয় তথ্য</span>
                   <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">{role === 'customer' ? 'কাস্টমার' : role === 'agent' ? 'এজেন্ট' : 'দোকানদার'} প্রোফাইল</h1>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">পূর্ণ নাম</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-[24px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 outline-none transition-all font-black text-gray-900 text-sm shadow-inner"
                      placeholder="আপনার এনআইডি অনুযায়ী"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">ইমেইল ঠিকানা</label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      className="w-full px-6 py-4 rounded-[24px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 outline-none transition-all font-black text-gray-900 text-sm shadow-inner"
                      placeholder="name@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">পাসওয়ার্ড</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-[24px] bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 outline-none transition-all font-black text-gray-900 text-sm shadow-inner"
                        placeholder="কমপক্ষে ৮ সংখ্যা"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-5 text-gray-400 hover:text-blue-600 transition-colors">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-2">
                    <input type="checkbox" name="terms" required checked={formData.terms} onChange={handleInputChange} className="w-5 h-5 rounded-md text-blue-600 focus:ring-blue-500 border-gray-200" />
                    <span className="text-xs text-gray-500 font-medium">আমি <Link to="/about" className="text-blue-600 font-black hover:underline uppercase tracking-tight">শর্তাবলী ও প্রাইভেসী পলিসি</Link> এর সাথে একমত।</span>
                  </div>
                  {error && <p className="text-red-500 text-xs font-black bg-red-50 py-2 px-4 rounded-xl border border-red-100">{error}</p>}
                  <button type="submit" className="w-full bg-gray-900 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-3 group">
                    ওটিপি কোড পাঠান <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-12">
                   <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">নিরাপদ যাচাইকরণ</span>
                   <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">ওটিপি কোড দিন</h1>
                   <p className="text-gray-400 text-xs font-medium mt-6 italic">আমরা {formData.email} ঠিকানায় একটি কোড পাঠিয়েছি। ডেমো সংস্করণ: যেকোনো ৬টি সংখ্যা দিন।</p>
                </div>
                
                <div className="flex justify-between gap-3 mb-12">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx} id={`otp-${idx}`} type="text" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-full h-20 bg-gray-50 border-2 rounded-[22px] text-center text-2xl font-black border-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none shadow-inner"
                    />
                  ))}
                </div>

                <button 
                  onClick={verifyOtp} disabled={loading || otp.some(v => !v)}
                  className="w-full bg-blue-600 text-white font-black py-6 rounded-[28px] uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'যাচাই করা হচ্ছে...' : 'রেজিস্ট্রেশন সম্পন্ন করুন'}
                </button>
                <button onClick={() => setStep('details')} className="w-full mt-8 text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors">
                  দুঃখিত, আমি ভুল তথ্য দিয়েছি
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
