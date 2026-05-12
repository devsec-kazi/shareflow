import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  ShoppingBag, 
  Search, 
  History, 
  Ticket, 
  Wallet, 
  Minus,
  QrCode, 
  Scan, 
  Share2, 
  ChevronRight,
  Plus,
  Download,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Tablet,
  MapPin,
  Star,
  FileText,
  Heart,
  Store,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../../../lib/utils';
import jsPDF from 'jspdf';
import { useCart } from '../../../context/CartContext';
import { DEMO_TRANSACTIONS, CATEGORIES } from '../../../constants';
import KYCModal from '../../../components/shared/KYCModal';
import InvoiceModal from '../../../components/shared/InvoiceModal';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { orders } = useCart();
  const [showQR, setShowQR] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const stats = [
    { label: 'মোট অর্ডার', value: orders.length.toString(), icon: ShoppingBag, color: 'text-primary-green', bg: 'bg-green-50' },
    { label: 'পছন্দের পণ্য', value: '১৪', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'সচল কুপন', value: '০৬', icon: Ticket, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const recentOrders = orders.length > 0 ? orders : [
    { id: 'SF-৯০৪৫', shop: 'নিউ জনতা স্টোর', date: '২০২৪-০৫-০৭', total: 420, status: 'সম্পন্ন', items: [] },
    { id: 'SF-৯০২১', shop: 'সিটি মার্ট', date: '২০২৪-০৫-০১', total: 1299, status: 'সম্পন্ন', items: [] },
  ];

  const getKYCBadge = () => {
    const status = user?.verificationStatus || 'pending';
    switch (status) {
      case 'approved': return { icon: CheckCircle2, text: 'ভেরিফাইড', color: 'bg-green-50 text-primary-green border-green-100' };
      case 'rejected': return { icon: XCircle, text: 'বাতিল', color: 'bg-red-50 text-red-600 border-red-100' };
      default: return { icon: Clock, text: 'KYC পেন্ডিং', color: 'bg-amber-50 text-amber-600 border-amber-100' };
    }
  };

  const badge = getKYCBadge();

  const downloadInvoice = (order: any) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ShareFlow Official Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(`Date: ${order.date}`, 20, 45);
    doc.text(`Customer: ${user?.name}`, 20, 55);
    doc.text(`Total Amount: BDT ${order.total}`, 20, 65);
    doc.text(`Items:`, 20, 80);
    
    if (order.items && order.items.length > 0) {
      order.items.forEach((item: any, index: number) => {
        doc.text(`${index + 1}. ${item.name} x ${item.quantity} - BDT ${item.price * item.quantity}`, 25, 90 + (index * 10));
      });
    } else {
      doc.text(`Product items recorded in central command.`, 25, 90);
    }
    
    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 font-sans">
      {/* Welcome Header */}
      <div className="bg-white p-8 md:p-12 rounded-[50px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-900 rounded-[28px] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-gray-300">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-green text-white rounded-xl border-4 border-white flex items-center justify-center shadow-lg">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">কেমন আছেন, {user?.name?.split(' ')[0]}?</h2>
                <button 
                  onClick={() => setShowKYC(true)}
                  className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 shadow-sm", badge.color)}
                >
                  <badge.icon size={12} /> {badge.text}
                </button>
              </div>
              <p className="text-gray-400 font-bold max-w-md">আজকের কেনাকাটা ও লেনদেনের জন্য আপনি সম্পূর্ণ প্রস্তুত।</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button 
              onClick={() => setShowQR(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white border-2 border-gray-100 px-8 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-primary-green hover:text-primary-green transition-all"
            >
              <QrCode size={18} /> আমার কিউআর
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-primary-green text-white px-8 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-green-100 hover:bg-primary-green-dark transition-all active:scale-95">
              <Plus size={18} /> রিচার্জ করুন
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white rounded-[45px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-gray-100 transition-all hover:-translate-y-2"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12", stat.bg)}>
                  <stat.icon className={cn("h-8 w-8", stat.color)} />
                </div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Activity Table */}
          <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-primary-green">
                    <History size={20} />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">কেনাকাটার ইতিহাস</h3>
              </div>
              <button className="text-[10px] font-black text-primary-green hover:underline flex items-center gap-2 uppercase tracking-widest group">
                 পুরো লিস্ট দেখুন <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">অর্ডার আইডি</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">দোকান</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-50">পরিমাণ</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-50">স্ট্যাটাস</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-50">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-10 py-8 font-black text-gray-900 text-sm tracking-tight">{order.id}</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-primary-green group-hover:scale-110 transition-transform">
                              <Store size={14} />
                           </div>
                           <div>
                              <p className="font-black text-gray-900 tracking-tight text-sm">{order.shop || order.items?.[0]?.shop || 'বণিক স্টোর'}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{order.date}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right font-black text-gray-900 tracking-tighter text-lg">৳{order.total?.toLocaleString() || order.amount?.toLocaleString()}</td>
                      <td className="px-10 py-8">
                        <div className="flex justify-center">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                            order.status === 'সম্পন্ন' ? "bg-green-50 text-primary-green border-green-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                          <button 
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsInvoiceOpen(true);
                            }}
                            className="w-12 h-12 bg-gray-50 rounded-2xl text-gray-400 hover:bg-gray-900 hover:text-white transition-all transform active:scale-90 flex items-center justify-center shadow-inner"
                          >
                            <FileText size={18} />
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New: Purchase History Section */}
          <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden p-10 mt-10">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                      <ShoppingBag size={20} />
                   </div>
                   <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">ক্রয় ইতিহাস (সব পণ্য)</h3>
                </div>
             </div>
             
             <div className="space-y-6">
                {(orders && orders.length > 0) ? (
                  orders.flatMap(order => order.items.map((item, idx) => ({ ...item, date: order.date, orderId: order.id }))).map((purchase, pIdx) => (
                    <div key={pIdx} className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group">
                       <div className="flex items-center gap-6 mb-4 md:mb-0">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-gray-100 group-hover:scale-105 transition-transform">
                             <img src={purchase.image} className="w-full h-full object-cover" alt={purchase.name} />
                          </div>
                          <div>
                             <h4 className="font-black text-gray-900 text-sm leading-tight mb-1">{purchase.name}</h4>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Store size={10} className="text-primary-green" /> {purchase.shop}
                             </p>
                          </div>
                       </div>
                       <div className="flex items-center gap-12">
                          <div className="text-center md:text-right">
                             <p className="font-black text-gray-900 tracking-tighter text-lg">৳{purchase.price * purchase.quantity}</p>
                             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{purchase.date}</p>
                          </div>
                          <button 
                            onClick={() => {
                              const order = orders.find(o => o.id === purchase.orderId);
                              if (order) {
                                setSelectedOrder(order);
                                setIsInvoiceOpen(true);
                              }
                            }}
                            className="p-3 bg-white text-gray-400 hover:text-primary-green rounded-xl transition-all shadow-sm"
                          >
                             <FileText size={18} />
                          </button>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[35px]">
                     <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-200">
                        <ShoppingBag size={28} />
                     </div>
                     <p className="text-xs font-black text-gray-300 uppercase tracking-widest">আপনার কেনা পণ্যের তালিকা এখানে থাকবে</p>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column / Sidebar Dashboard */}
        <div className="lg:col-span-4 space-y-10">
           {/* Wallet Module */}
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
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">উপলব্ধ ব্যালেন্স</p>
                <p className="text-5xl font-black tracking-tighter">৳{user?.walletBalance?.toLocaleString() || '৮,৫০০'}</p>
                
                <div className="mt-12 pt-12 border-t border-white/5 space-y-6">
                  {DEMO_TRANSACTIONS.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center group/tx cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black", tx.type === 'credit' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                             {tx.type === 'credit' ? <Plus size={14} /> : <Minus size={14} />}
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-200 group-hover/tx:text-primary-green transition-colors leading-none mb-1">{tx.description}</p>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{tx.date}</p>
                          </div>
                       </div>
                       <p className={cn("font-black text-sm tracking-tighter", tx.type === 'credit' ? "text-green-400" : "text-gray-300")}>
                         {tx.type === 'credit' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                       </p>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                   লেনদেনের ইতিহাস দেখুন
                </button>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-green/20 rounded-full blur-[120px] -mr-32 -mt-32"></div>
           </div>

           {/* Quick Action - Scan */}
           <div className="p-10 bg-white border border-gray-100 rounded-[50px] shadow-sm text-center relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-50 rounded-full blur-[60px] opacity-50"></div>
              <div className="w-20 h-20 bg-purple-50 rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-inner overflow-hidden relative group">
                <Scan size={38} className="text-purple-600 group-hover:scale-125 transition-transform" />
              </div>
              <h4 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-3">কুইক স্ক্যান</h4>
              <p className="text-xs text-gray-400 font-bold leading-relaxed px-4 mb-10 italic">দোকানে পেমেন্ট কিংবা এজেন্টের কাছে ক্যাশ আউট করতে নিচে ক্লিক করুন।</p>
              <button className="w-full py-6 bg-gray-900 text-white rounded-[28px] font-black uppercase tracking-widest text-[11px] hover:bg-purple-600 transition-all flex items-center justify-center gap-4 active:scale-95 shadow-2xl shadow-gray-200">
                <Scan size={22} sx={{ strokeWidth: 3 }} /> স্ক্যানার ওপেন করুন
              </button>
           </div>

           {/* Referral Card */}
           <div className="p-12 bg-primary-green rounded-[50px] text-white shadow-2xl shadow-green-100 relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Share2 size={24} />
                   </div>
                   <h4 className="text-2xl font-black tracking-tighter uppercase leading-none">রেফার করুন</h4>
                </div>
                <p className="text-green-100 text-xs mb-10 leading-relaxed font-bold opacity-80 decoration-white/20 underline decoration-2 underline-offset-4">আপনার বন্ধুদের শেয়ার করুন এবং প্রতিটি সফল নিবন্ধনে পান ১০০ টাকা বোনাস।</p>
                <div className="flex gap-2">
                  <button className="bg-white text-primary-green px-8 py-5 rounded-[22px] font-black uppercase tracking-widest text-[10px] w-full hover:bg-green-50 transition-all shadow-xl active:scale-95">শেয়ার লিঙ্ক কপি করুন</button>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* QR Identity Modal */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowQR(false)}
               className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-[65px] p-12 md:p-16 max-w-sm w-full text-center relative border border-gray-100 shadow-2xl relative z-[110]"
            >
              <button onClick={() => setShowQR(false)} className="absolute top-10 right-10 text-gray-300 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-3 rounded-2xl transition-all">
                <Plus size={24} className="rotate-45" />
              </button>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-primary-green mb-6">
                    <ShieldCheck size={32} />
                 </div>
                 <h3 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">ডিজিটাল আইডি</h3>
                 <p className="text-gray-400 text-xs mb-12 font-bold tracking-tight italic">এজেন্ট বা দোকানদারের কাছে পেমেন্টের জন্য প্রদর্শন করুন।</p>
              </div>
              <div className="bg-white p-12 rounded-[50px] inline-block shadow-2xl shadow-green-100/50 border-4 border-green-50 mb-12 group transition-all hover:scale-105">
                <QRCodeSVG value={`shareflow-user-${user?.uid}`} size={220} fgColor="#111827" />
              </div>
              <div className="p-8 bg-gray-900 rounded-[35px] text-left relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary-green/20 rounded-full blur-2xl"></div>
                 <p className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] mb-2">অথরাইজড কাস্টমার</p>
                 <div className="flex items-center justify-between">
                    <div>
                       <h4 className="text-2xl font-black text-white leading-none mb-1">{user?.name}</h4>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{user?.email}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                       <Tablet size={24} />
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />
      <InvoiceModal 
        order={selectedOrder} 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
      />
    </div>
  );
}
