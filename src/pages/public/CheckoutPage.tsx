import React, { useState } from 'react';
import { useCart, Order } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Download,
  Printer,
  X,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import InvoiceModal from '../../components/shared/InvoiceModal';

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder, orders } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const subtotal = cartTotal;
  const deliveryFee = subtotal > 1000 ? 0 : 60;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const order = placeOrder();
    setPlacedOrderId(order.id);
    setCurrentOrder(order);
    setOrderConfirmed(true);
    // Auto open invoice preview toggle
    setIsInvoiceOpen(true);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[60px] p-12 md:p-20 max-w-2xl w-full border border-gray-100 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50"></div>
          
          <div className="w-24 h-24 bg-green-50 text-primary-green rounded-[30px] flex items-center justify-center mx-auto mb-10 shadow-inner group">
             <CheckCircle2 size={48} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4 uppercase">অর্ডার সফল হয়েছে! 🎉</h2>
          <p className="text-gray-400 font-bold mb-12 text-lg italic">"আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে"</p>
          
          <div className="bg-gray-50 rounded-[35px] p-10 mb-12 border border-gray-100 text-left">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">অর্ডার আইডি</span>
                <span className="font-black text-gray-900 text-xl tracking-tighter">{placedOrderId}</span>
             </div>
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">তারিখ</span>
                <span className="font-bold text-gray-900">{new Date().toLocaleDateString('bn-BD')}</span>
             </div>
             <div className="h-px bg-gray-200 my-6"></div>
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">পরিশোধিত মূল্য</span>
                <span className="font-black text-primary-green text-3xl tracking-tighter">৳{total.toLocaleString()}</span>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <button 
               onClick={() => setIsInvoiceOpen(true)}
               className="py-5 bg-gray-900 text-white rounded-[22px] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-4px] transition-all"
             >
                <FileText size={18} /> ইনভয়েস প্রিভিউ
             </button>
             <Link 
               to="/dashboard/customer" 
               className="py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[22px] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-4px] transition-all"
             >
                অর্ডার ট্র্যাক করুন <ArrowLeft size={18} className="rotate-180" />
             </Link>
          </div>
          
          <Link to="/" className="mt-12 inline-block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-primary-green transition-colors">হোম পেজে ফিরে যান</Link>
        </motion.div>

        <InvoiceModal 
          order={currentOrder} 
          isOpen={isInvoiceOpen} 
          onClose={() => setIsInvoiceOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans">
      <section className="bg-white border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
            <Link to="/cart" className="hover:text-primary-green transition-colors">কার্ট</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">চেকআউট</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">চেকআউট 📦</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-10">
            {/* Delivery Info */}
            <div className="bg-white rounded-[45px] p-10 border border-gray-100 shadow-sm overflow-hidden relative">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">ডেলিভারি ঠিকানা</h3>
               </div>
               
               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">নাম</label>
                   <input type="text" defaultValue={user?.name} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-bold shadow-inner" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">ফোন নাম্বার</label>
                   <input type="text" placeholder="০১৭০০-০০০০০০" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-bold shadow-inner" />
                 </div>
                 <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">ঠিকানা</label>
                   <textarea rows={3} placeholder="বাসা নং, রাস্তা নং, এলাকা..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-bold shadow-inner" />
                 </div>
               </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-[45px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary-green/10 text-primary-green rounded-2xl flex items-center justify-center">
                    <CreditCard size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">পেমেন্ট মেথড</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {['বিকাশ', 'নগদ', 'ক্যাশ অন ডেলিভারি'].map((m) => (
                   <button 
                     key={m}
                     className="p-6 rounded-[30px] border-2 border-gray-100 hover:border-primary-green hover:bg-green-50 transition-all flex flex-col items-center gap-3 group relative"
                   >
                     <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {m === 'বিকাশ' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BKash_Logo.svg/1200px-BKash_Logo.svg.png" className="w-8" />}
                        {m === 'নগদ' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Nagad_Logo.svg/1200px-Nagad_Logo.svg.png" className="w-8" />}
                        {m === 'ক্যাশ অন ডেলিভারি' && <Truck size={20} className="text-gray-400" />}
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{m}</span>
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-4 space-y-10">
             <div className="bg-white rounded-[45px] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
               <div className="p-10 border-b border-gray-50">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">অর্ডার লিস্ট</h3>
               </div>
               
               <div className="p-10 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                       </div>
                       <div className="flex-1">
                          <p className="text-xs font-black text-gray-900 line-clamp-1 mb-1">{item.name}</p>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">qty: {item.quantity}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-gray-900 tracking-tighter">৳{item.price * item.quantity}</p>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="p-10 bg-gray-50/50 space-y-4">
                  <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                     <span>সাবটোটাল</span>
                     <span className="text-gray-900">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase tracking-widest">
                     <span>ডেলিভারি</span>
                     <span className="text-primary-green">{deliveryFee === 0 ? "ফ্রি" : `৳${deliveryFee}`}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">সর্বমোট</span>
                     <span className="text-3xl font-black text-gray-900 tracking-tighter">৳{total}</span>
                  </div>
                  
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 py-6 bg-primary-green text-white rounded-[25px] font-black uppercase text-xs tracking-widest shadow-2xl shadow-green-200 hover:-translate-y-1 transition-all active:scale-95"
                  >
                     অর্ডার কনফার্ম করুন
                  </button>
               </div>
             </div>
             
             <div className="p-8 bg-black rounded-[40px] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green rounded-full blur-[60px] opacity-20 transition-all group-hover:scale-150"></div>
                <div className="flex items-center gap-4 relative z-10">
                   <ShieldCheck size={32} className="text-primary-green" />
                   <div>
                      <h4 className="font-black text-sm uppercase tracking-widest mb-1">সিকিউর চেকআউট</h4>
                      <p className="text-[10px] font-bold text-gray-500 leading-tight">আপনার সকল তথ্য সম্পূর্ণ নিরাপদ এবং এনক্রিপ্টেড।</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
