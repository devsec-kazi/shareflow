import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, User, Store, Briefcase } from 'lucide-react';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS } from '../../constants/demoData';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();

  const handleDemoLogin = (role: keyof typeof DEMO_USERS) => {
    loginAsDemo(DEMO_USERS[role] as any);
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (err: any) {
      setError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়');
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = {
    admin: ShieldCheck,
    customer: User,
    agent: Briefcase,
    shop: Store
  };

  const roleNames = {
    admin: 'অ্যাডমিন',
    customer: 'কাস্টমার',
    agent: 'এজেন্ট',
    shop: 'দোকান মালিক'
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#f8fafc]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl flex flex-col lg:flex-row bg-white rounded-[48px] shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden"
      >
        {/* Left Side - Bengali Demo Portal */}
        <div className="lg:w-1/2 p-8 md:p-16 bg-gray-900 text-white relative flex flex-col justify-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-lg mb-6">
               <ShieldCheck size={14} className="text-white" />
               <span className="text-[10px] font-black uppercase tracking-widest text-white">ডেমো এক্সেস</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">সহজ লগইন</h1>
            <p className="text-gray-400 mb-12 font-medium">নিচের যেকোনো বাটনে ক্লিক করে দ্রুত প্ল্যাটফর্মটি এক্সপ্লোর করুন।</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.keys(DEMO_USERS) as Array<keyof typeof DEMO_USERS>).map((key) => {
                const user = DEMO_USERS[key];
                const Icon = roleIcons[key] || User;
                return (
                  <button 
                    key={key}
                    onClick={() => handleDemoLogin(key)}
                    className="group bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white hover:border-white transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">{roleNames[key]}</p>
                    <p className="font-bold text-lg group-hover:text-gray-900">{user.displayName.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-500 group-hover:text-blue-600 mt-2 font-black uppercase tracking-widest">প্রবেশ করুন →</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 p-6 bg-blue-600/10 border border-blue-600/20 rounded-3xl">
              <p className="text-sm text-gray-400 font-medium leading-relaxed italic">দ্রষ্টব্য: এটি একটি ডেমো সেশন। বাস্তব কার্যক্রমের জন্য আপনাকে অবশ্যই KYC সম্পন্ন করতে হবে।</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Right Side - Standard Login */}
        <div className="flex-1 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12 text-center lg:text-left">
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter uppercase underline decoration-blue-600 decoration-4 underline-offset-4">সরাসরি লগইন</h2>
              <p className="text-gray-500 font-medium">আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 ml-1">ইমেইল অ্যাড্রেস</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-5 text-gray-400 h-5 w-5" />
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleInputChange}
                    className="w-full pl-14 pr-5 py-5 rounded-[24px] border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    placeholder="আপনার ইমেইল লিখুন"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-3 ml-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">পাসওয়ার্ড</label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest leading-none">ভুলে গেছেন?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-5 text-gray-400 h-5 w-5" />
                  <input 
                    type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleInputChange}
                    className="w-full pl-14 pr-14 py-5 rounded-[24px] border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    placeholder="পাসওয়ার্ড দিন"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-5 text-gray-400 hover:text-blue-600 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {error}</p>}

              <button 
                type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-[24px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'যাচাই করা হচ্ছে...' : <><LogIn size={22} className="rotate-180" /> লগইন করুন</>}
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-gray-100 text-center">
               <p className="text-gray-500 font-medium">নিবন্ধন করা নেই? <Link to="/register" className="text-blue-600 font-black uppercase tracking-widest hover:underline text-sm ml-2">অ্যাকাউন্ট তৈরি করুন</Link></p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
