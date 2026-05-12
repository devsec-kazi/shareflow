import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Gift,
  ArrowLeft,
  Heart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function CartPage() {
  const { cart: cartItems, updateQuantity, removeFromCart, cartTotal: subtotal } = useCart();

  const deliveryFee = subtotal > 1000 ? 0 : 60;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-primary-green transition-colors">হোম</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">শপিং কার্ট</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">শপিং কার্ট 🛒</h1>
          <p className="text-gray-400 font-bold mb-0">আপনি {cartItems.length}টি পণ্য নির্বাচন করেছেন।</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id}
                    className="bg-white rounded-[35px] p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[25px] overflow-hidden bg-gray-50 border border-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-8">
                      <div className="space-y-2">
                        <Link to={`/product/${item.id}`} className="text-xl font-black text-gray-900 hover:text-primary-green transition-colors line-clamp-2 leading-tight">
                          {item.name}
                        </Link>
                        <p className="text-xs font-bold text-gray-400 flex items-center gap-2">
                          বিক্রেতা: <span className="text-gray-900 uppercase tracking-widest">{item.shop}</span>
                        </p>
                        <div className="pt-4 flex items-center gap-4">
                           <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors">
                              <Trash2 size={14} /> পণ্যটি মুছে ফেলুন
                           </button>
                           <button className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors">
                              <Heart size={14} /> উইশলিস্টে রাখুন
                           </button>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-8">
                         <div className="flex flex-col items-center md:items-end">
                            <span className="text-2xl font-black text-gray-900">৳{item.price * item.quantity}</span>
                            <span className="text-[10px] font-black text-gray-400">৳{item.price} প্রতি ইউনিট</span>
                         </div>
                         
                         <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="w-10 text-center font-black text-base">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                              <Plus size={18} />
                            </button>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link to="/products" className="inline-flex items-center gap-3 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary-green transition-all mt-6 pl-4 group">
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> আরও কেনাকাটা করুন
              </Link>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="lg:w-96">
               <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-40">
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                     <ShoppingCart size={20} className="text-primary-green" /> অর্ডারের সারসংক্ষেপ
                  </h3>

                  <div className="space-y-6 mb-10 pt-4">
                     <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                        <span>পণ্যের মূল্য</span>
                        <span className="text-gray-900">৳{subtotal}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                        <span>ডেলিভারি চার্জ</span>
                        <span className={cn("font-black", deliveryFee === 0 ? "text-primary-green" : "text-gray-900")}>
                           {deliveryFee === 0 ? "ফ্রি" : `৳${deliveryFee}`}
                        </span>
                     </div>
                     <div className="h-px bg-gray-50 my-2"></div>
                     <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">সর্বমোট</p>
                           <p className="text-3xl font-black text-gray-900 tracking-tighter">৳{total}</p>
                        </div>
                        <div className="bg-green-50 text-primary-green px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-green-100">
                           ৳১৮২ সাশ্রয় হচ্ছে
                        </div>
                     </div>
                  </div>

                  <div className="bg-gray-50 rounded-[25px] p-6 mb-10 border border-gray-100">
                     <div className="flex items-center gap-4 mb-4">
                        <Gift size={20} className="text-primary-green" />
                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">প্রোমো কোড</p>
                     </div>
                     <div className="flex gap-2">
                        <input type="text" placeholder="কোড লিখুন" className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-primary-green transition-all" />
                        <button className="bg-gray-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-green transition-colors">প্রয়োগ</button>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <Link to="/checkout" className="flex items-center justify-center w-full py-6 bg-primary-green text-white rounded-[25px] font-black uppercase text-sm tracking-widest shadow-2xl shadow-green-200 hover:-translate-y-1 transition-all active:scale-95 gap-3 group">
                        চেকআউট করুন <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                     </Link>
                     <div className="flex items-center justify-center gap-6 pt-6 grayscale opacity-40">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BKash_Logo.svg/1200px-BKash_Logo.svg.png" className="h-4 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" className="h-4 object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" className="h-4 object-contain" />
                     </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-50 space-y-4">
                     <div className="flex items-center gap-4 text-gray-400">
                        <ShieldCheck size={18} className="text-primary-green shrink-0" />
                        <p className="text-[9px] font-bold leading-tight underline decoration-gray-100 decoration-4 underline-offset-4 tracking-tight">আমাদের পেমেন্ট সিস্টেম সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড।</p>
                     </div>
                     <div className="flex items-center gap-4 text-gray-400">
                        <Truck size={18} className="text-blue-500 shrink-0" />
                        <p className="text-[9px] font-bold leading-tight underline decoration-gray-100 decoration-4 underline-offset-4 tracking-tight">ঢাকা সিটির ভিতরে ২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি নিশ্চিত করি।</p>
                     </div>
                  </div>
               </div>
            </aside>
          </div>
        ) : (
          <div className="bg-white rounded-[50px] p-24 text-center border border-gray-100 shadow-sm max-w-3xl mx-auto mt-12">
             <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 overflow-hidden group">
                <ShoppingCart size={60} className="text-gray-200 group-hover:scale-110 group-hover:text-primary-green transition-all duration-700" />
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase">আপনার কার্টে কিছু নেই!</h2>
             <p className="text-gray-400 font-bold mb-12 max-w-sm mx-auto leading-relaxed text-lg">আপনার পছন্দের পণ্যগুলো কার্টে যোগ করুন এবং কেনাকাটা শুরু করুন এখনই।</p>
             <Link to="/products" className="inline-flex items-center gap-4 px-12 py-6 bg-primary-green text-white rounded-[30px] font-black uppercase text-sm tracking-widest shadow-2xl shadow-green-100 hover:-translate-y-2 transition-all">
                পণ্য দেখুন <ArrowRight size={20} />
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
