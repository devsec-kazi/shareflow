import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'শেয়ারফ্লো': [
      { name: 'আমাদের সম্পর্কে', href: '/about' },
      { name: 'মিডিয়া ও গ্যালারি', href: '/media' },
      { name: 'মিশন ও ভিশন', href: '/about' },
      { name: 'যোগাযোগ করুন', href: '/contact' },
    ],
    'সহায়তা কেন্দ্র': [
      { name: 'সাধারণ জিজ্ঞাসা (FAQ)', href: '/faq' },
      { name: 'ডেলিভারি ট্র্যাকিং', href: '/track-order' },
      { name: 'শিপিং পলিসি', href: '/shipping' },
      { name: 'রিটার্ন পলিসি', href: '/returns' },
    ],
    'আইনি তথ্য': [
      { name: 'গোপনীয়তা নীতি', href: '/privacy' },
      { name: 'শর্তাবলী ও বিধি', href: '/terms' },
      { name: 'পেমেন্ট মেথড', href: '/payment' },
      { name: 'কুকি পলিসি', href: '/cookies' },
    ]
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-primary-green rounded-[18px] flex items-center justify-center text-white shadow-xl shadow-green-100 group-hover:rotate-6 transition-all duration-500">
                <ShoppingCart size={26} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 tracking-tighter leading-none mb-1">
                  শেয়ার<span className="text-primary-green">ফ্লো</span>
                </span>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] leading-none">ShareFlow</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-sm mb-10 font-bold leading-relaxed text-sm">
              শেয়ারফ্লো বাংলাদেশের একটি আধুনিক ডিজিটাল ইকমার্স প্ল্যাটফর্ম যা কাস্টমার, দোকানদার এবং এজেন্টদের মধ্যে একটি শক্তিশালী নেটওয়ার্ক তৈরি করে।
            </p>
            <div className="space-y-4">
               <div className="flex items-center gap-3 text-sm text-gray-900 font-black tracking-tight group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">হটলাইন</span>
                    +৮৮০ ১৮০০-০০০০০০
                  </div>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-900 font-black tracking-tight group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">ইমেইল করুন</span>
                    support@shareflow.com.bd
                  </div>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-900 font-black tracking-tight group cursor-pointer">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">অফিস ঠিকানা</span>
                    বনানী সিটি কমপ্লেক্স, ঢাকা
                  </div>
               </div>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-black text-gray-900 mb-8 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-green rounded-full"></div>
                {title}
              </h3>
              <ul className="space-y-5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-gray-400 hover:text-primary-green font-bold text-sm transition-all flex items-center gap-2 group">
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-green" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
              © {currentYear} SHAREFLOW. ALL RIGHTS RESERVED.
            </p>
            <div className="h-4 w-px bg-gray-200 hidden md:block"></div>
            <p className="text-gray-300 text-[10px] font-bold">DEvSEc KAZi</p>
          </div>
          
          <div className="flex items-center gap-3">
             <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-primary-green hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
             </a>
             <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all shadow-sm">
                <Twitter size={18} />
             </a>
             <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
             </a>
             <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                <Youtube size={18} />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
