import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Eye, Rocket, Award, ShieldCheck, Heart, Sparkles, Zap, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AboutPage() {
  const values = [
    { title: 'উৎকর্ষ', desc: 'আমরা কোড এবং ইউজার এক্সপেরিয়েন্সের প্রতিটি ধারায় সর্বোচ্চ গুণমান নিশ্চিত করি।', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'স্বচ্ছতা', desc: 'আর্থিক লেনদেন এবং রিপোর্টে শতভাগ স্বচ্ছতা বজায় রেখে আমরা আপনার বিশ্বাস অর্জন করি।', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'উদ্ভাবন', desc: 'প্রচলিত ব্যবসার সমস্যা সমাধানে আমরা সর্বাধুনিক ও সময়োপযোগী প্রযুক্তি ব্যবহার করি।', icon: Rocket, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const milestones = [
    { year: '২০২২', title: 'যাত্রা শুরু', desc: 'একটি ছোট স্বপ্ন নিয়ে মিরপুরে আমাদের প্রথম অফিস থেকে যাত্রা শুরু।' },
    { year: '২০২৩', title: '৫০০+ দোকান', desc: 'এক বছরের মাথায় আমরা ৫০০ এর বেশি দোকানের সাথে যুক্ত হই।' },
    { year: '২০২৪', title: 'দেশব্যাপী নেটওয়ার্ক', desc: 'বর্তমানে বাংলাদেশের বিভাগীয় শহরগুলোতে আমাদের সেবা বিস্তৃত।' },
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#f8fafc]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-green text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-8 shadow-xl shadow-green-500/20">
              <Sparkles size={14} /> আমাদের পরিচয়
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter uppercase">
              একটি আধুনিক <br /> <span className="text-primary-green underline decoration-gray-200 decoration-8 underline-offset-8">ডিজিটাল কমার্স বিপ্লব।</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl">
              শেয়ারফ্লো ডিজিটাল দক্ষতা এবং স্থানীয় বাণিজ্যের মধ্যে ব্যবধান ঘুচিয়ে সবার জন্য একটি টেকসই, আধুনিক এবং স্বচ্ছ ইকোসিস্টেম তৈরি করতে কাজ করে যাচ্ছে।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-primary-green font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">ভিশন ও পথচলা</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-10 tracking-tighter leading-[1.2]">
              আধুনিক বাণিজ্যের জন্য এক স্বচ্ছ ও শক্তিশালী সার্ভিস গেটওয়ে।
            </h2>
            <p className="text-gray-500 mb-12 font-medium leading-relaxed">
              আমরা এমন একটি ভবিষ্যৎ কল্পনা করি যেখানে বাংলাদেশের প্রতিটি ছোট বড় ব্যবসায়ী তার নিজস্ব পণ্যের পসরা সারাদেশে ছড়িয়ে দিতে পারবে কোনো রকম প্রযুক্তিগত বাধা ছাড়াই।
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-primary-green mb-6 group-hover:rotate-12 transition-transform">
                  <Eye size={28} />
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">আমাদের ভিশন</h4>
                <p className="text-xs text-gray-400 font-bold leading-relaxed">প্রতিটি স্থানীয় দোকানকে একটি গ্লোবাল ডিজিটাল আউটলেটে রূপান্তর করা।</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-[35px] text-white shadow-xl group hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-primary-green mb-6 group-hover:scale-110 transition-transform">
                  <Rocket size={28} />
                </div>
                <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tight">আমাদের মিশন</h4>
                <p className="text-xs text-gray-400 font-bold leading-relaxed">নিরাপদ এবং স্বচ্ছ লেনদেনের মাধ্যমে দেশের অর্থনীতিতে গতি আনা।</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="relative overflow-hidden rounded-[60px] shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Vision" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-primary-green/20 mix-blend-overlay"></div>
             </div>
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-50 rounded-[40px] -z-10 animate-pulse"></div>
             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-900 rounded-[32px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
               <div>
                  <h3 className="text-5xl font-black text-primary-green mb-2">৫০০০+</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">সন্তুষ্ট কাস্টমার</p>
               </div>
               <div>
                  <h3 className="text-5xl font-black text-blue-500 mb-2">৫০০+</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">সক্রিয় দোকানদার</p>
               </div>
               <div>
                  <h3 className="text-5xl font-black text-amber-500 mb-2">১০০+</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">অনুমোদিত এজেন্ট</p>
               </div>
               <div>
                  <h3 className="text-5xl font-black text-purple-500 mb-2">২৪/৭</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-500">সহায়তা প্রদান</p>
               </div>
            </div>
         </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <span className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] mb-4 block">মূল চালিকা শক্তি</span>
             <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-4">আমাদের মূল্যবোধ</h2>
             <div className="w-24 h-2 bg-primary-green mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm text-center group hover:shadow-2xl hover:shadow-green-100 transition-all hover:-translate-y-3">
                <div className={cn("w-20 h-20 rounded-[28px] flex items-center justify-center mx-auto mb-10 transition-all group-hover:scale-110 shadow-inner group-hover:rotate-12", v.bg, v.color)}>
                  <v.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">{v.title}</h3>
                <p className="text-gray-400 font-bold leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16 md:gap-32">
               <div className="md:w-1/3">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-8">আমাদের গড়ে ওঠার <br /><span className="text-primary-green">ইতিহাস।</span></h2>
                  <p className="text-gray-400 font-bold leading-relaxed mb-12">খুব ছোট পরিসরে শুরু হওয়া একটি প্রজেক্ট আজ একটি বিশাল কমিউনিটিতে পরিণত হয়েছে। আমাদের প্রতিটি ধাপ ছিল চ্যালেঞ্জিং এবং শিক্ষণীয়।</p>
                  <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary-green transition-all shadow-xl shadow-gray-200">
                    আমাদের টিমে যোগ দিন <Zap size={16} />
                  </Link>
               </div>
               <div className="flex-1 space-y-12">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex gap-10 group">
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-green flex items-center justify-center text-primary-green font-black text-xl shadow-lg shadow-green-100 z-10 group-hover:scale-110 transition-transform">
                             {idx + 1}
                          </div>
                          {idx !== milestones.length - 1 && <div className="w-px h-full bg-gray-100 mt-2"></div>}
                       </div>
                       <div className="pb-12">
                          <span className="text-primary-green font-black text-sm mb-2 block">{m.year}</span>
                          <h4 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{m.title}</h4>
                          <p className="text-gray-400 font-bold max-w-lg">{m.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-white px-4">
        <div className="max-w-7xl mx-auto">
           <div className="bg-primary-green rounded-[60px] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-2xl shadow-green-200">
              <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[1.1]">আমরা শক্তিশালী বাংলাদেশ গড়ার স্বপ্ন দেখি।</h2>
                 <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto font-bold opacity-80 underline decoration-white decoration-2 underline-offset-4">আমরা শুধু সেবা দেই না, আমরা গড়ে তুলি সম্পর্ক।</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <div className="flex items-center gap-4 bg-white/10 px-10 py-6 rounded-[30px] border border-white/10 backdrop-blur-xl">
                       <Users className="text-white" size={28} />
                       <span className="font-black uppercase tracking-widest text-xs">সক্রিয় কমিউনিটি</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 px-10 py-6 rounded-[30px] border border-white/10 backdrop-blur-xl">
                       <ShieldCheck className="text-white" size={28} />
                       <span className="font-black uppercase tracking-widest text-xs">শতভাগ বিশ্বাসযোগ্য</span>
                    </div>
                 </div>
              </div>
              {/* Background Shapes */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
           </div>
        </div>
      </section>
    </div>
  );
}
