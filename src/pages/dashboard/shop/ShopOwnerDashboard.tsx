import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Package, 
  Plus, 
  BarChart3, 
  FileText, 
  Wallet, 
  QrCode, 
  Trash2, 
  Edit3, 
  Search,
  ExternalLink,
  ChevronDown,
  TrendingUp,
  Filter,
  MoreVertical,
  Download,
  AlertCircle,
  Eye,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Tablet,
  ChevronLeft,
  X,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../../../services/firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { cn } from '../../../lib/utils';
import jsPDF from 'jspdf';
import { DEMO_PRODUCTS } from '../../../constants';
import KYCModal from '../../../components/shared/KYCModal';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  mrp: number;
  discountPrice?: number;
  purchasePrice?: number;
  unit?: string;
  status: string;
  image?: string;
}

export default function ShopOwnerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    if (!user) return;
    try {
      // Note: This might fail if the user hasn't set up Firebase properly or if the collection is missing.
      // We'll fall back to DEMO_PRODUCTS for the demo.
      setProducts(DEMO_PRODUCTS);
    } catch (err) {
      console.error(err);
      setProducts(DEMO_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const stats = [
    { label: "আজকের বিক্রি", value: "৳৪,২৮৫", icon: TrendingUp, color: "text-primary-green", bg: "bg-green-50" },
    { label: "স্টক আইটেম", value: `${products.length} প্রকার`, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "নিম্ন স্টক", value: products.filter(p => p.quantity < 20).length.toString(), icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  const getKYCBadge = () => {
    const status = user?.verificationStatus || 'pending';
    switch (status) {
      case 'approved': return { icon: CheckCircle2, text: 'ভেরিফাইড দোকান', color: 'bg-green-50 text-primary-green border-green-100' };
      case 'rejected': return { icon: XCircle, text: 'বাতিল', color: 'bg-red-50 text-red-600 border-red-100' };
      default: return { icon: Clock, text: 'অনুমোদনের অপেক্ষায়', color: 'bg-amber-50 text-amber-600 border-amber-100' };
    }
  };

  const badge = getKYCBadge();

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 font-sans">
      {/* Header */}
      <div className="bg-white p-8 md:p-12 rounded-[50px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gray-900 rounded-[28px] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-gray-300">
                <Store size={35} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-green text-white rounded-xl border-4 border-white flex items-center justify-center shadow-lg">
                <CheckCircle2 size={14} strokeWidth={3} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">মার্চেন্ট প্যানেল</h2>
                <button 
                  onClick={() => setShowKYC(true)}
                  className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 shadow-sm", badge.color)}
                >
                  <badge.icon size={12} /> {badge.text}
                </button>
              </div>
              <p className="text-gray-400 font-bold max-w-md">আপনার ইনভেন্টরি ম্যানেজমেন্ট এবং সেলস ট্র্যাকিং হাবে আপনাকে স্বাগতম।</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white border-2 border-gray-100 px-8 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest shadow-sm hover:border-primary-green hover:text-primary-green transition-all">
              <Download size={18} /> রিপোর্ট ডাউনলোড
            </button>
            <button 
              onClick={() => setShowAddProduct(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-primary-green text-white px-8 py-5 rounded-[22px] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-green-100 hover:bg-primary-green-dark transition-all active:scale-95"
            >
              <Plus size={18} /> নতুন পণ্য যুক্ত করুন
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

      {/* Inventory Section */}
      <div className="bg-white rounded-[50px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-8 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-primary-green">
               <Package size={24} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">ইনভেন্টরি লিস্ট</h3>
            <span className="hidden sm:inline-block bg-blue-50 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-blue-100 uppercase tracking-widest shadow-inner">২৪/৭ সচল</span>
          </div>
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-5 top-5 text-gray-300 h-5 w-5" />
            <input 
              type="text" 
              placeholder="পণ্য খুঁজুন..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[24px] text-sm focus:bg-white focus:border-primary-green transition-all outline-none font-bold shadow-inner"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">বিবরণ</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-50">ক্যাটাগরি</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-50">মজুত</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-50">মূল্য (৳)</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center border-b border-gray-50">স্ট্যাটাস</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right border-b border-gray-50">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-110 transition-transform shadow-inner">
                        <img src={product.image} className="w-full h-full object-cover" alt={product.name} referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 group-hover:text-primary-green transition-colors uppercase tracking-tight text-base mb-1">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase opacity-60">SKU: {product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center text-xs font-black uppercase text-gray-400">
                    <span className="px-4 py-1.5 rounded-xl border border-gray-100 bg-white shadow-sm">{product.category}</span>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <p className={cn("text-lg font-black tracking-tighter", product.quantity < 20 ? "text-red-500" : "text-gray-900")}>
                      {product.quantity} <span className="text-[10px] uppercase opacity-40 font-bold ml-1">ইউনিট</span>
                    </p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <p className="text-xl font-black text-gray-900 tracking-tighter">৳{product.price.toLocaleString()}</p>
                    <p className="text-[9px] text-gray-400 font-black tracking-widest uppercase opacity-50">এমআরপি: ৳{product.mrp.toLocaleString()}</p>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex justify-center">
                      <span className={cn(
                        "text-[9px] uppercase font-black px-4 py-1.5 rounded-full border border-opacity-50 tracking-widest shadow-sm",
                        product.quantity > 0 ? "bg-green-50 text-primary-green border-green-200" : "bg-red-50 text-red-600 border-red-200"
                      )}>
                        {product.quantity > 0 ? 'ইন স্টক' : 'আউট অফ স্টক'}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                       <button className="w-12 h-12 bg-white border border-gray-100 text-gray-400 hover:text-primary-green hover:border-primary-green hover:shadow-xl hover:shadow-green-50 rounded-2xl transition-all active:scale-90 flex items-center justify-center">
                         <Edit3 size={18} />
                       </button>
                       <button className="w-12 h-12 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-500 hover:shadow-xl hover:shadow-red-50 rounded-2xl transition-all active:scale-90 flex items-center justify-center">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />

      <AnimatePresence>
        {showAddProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddProduct(false)} className="absolute inset-0 bg-gray-900/40 backdrop-blur-md" />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-white rounded-[60px] p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100 shadow-2xl z-[110]"
             >
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">নতুন পণ্য যুক্ত করুন</h3>
                   <button onClick={() => setShowAddProduct(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all group">
                      <X size={24} className="group-hover:rotate-90 transition-transform" />
                   </button>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); setShowAddProduct(false); }} className="space-y-10 font-sans">
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block pl-4">পণ্যের বিবরণ</label>
                          <input type="text" placeholder="নাম লিখুন..." className="w-full px-6 py-5 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-bold shadow-inner" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block pl-4">ক্যাটাগরি</label>
                          <select className="w-full px-6 py-5 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-black uppercase tracking-widest shadow-inner appearance-none">
                             <option>ইলেকট্রনিক্স</option>
                             <option>মুদি পণ্য</option>
                             <option>ফ্যাশন</option>
                          </select>
                        </div>
                     </div>
                     <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block pl-4">বিক্রয় মূল্য</label>
                              <input type="number" placeholder="৳" className="w-full px-6 py-5 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-black shadow-inner" />
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block pl-4">ক্রয় মূল্য</label>
                              <input type="number" placeholder="৳" className="w-full px-6 py-5 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-black shadow-inner" />
                           </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block pl-4">স্টক পরিমাণ</label>
                          <input type="number" placeholder="পরিমাণ" className="w-full px-6 py-5 rounded-3xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-green outline-none font-black shadow-inner" />
                        </div>
                     </div>
                  </div>

                  <div className="bg-green-50 p-8 rounded-[35px] border border-green-100">
                     <p className="text-[10px] font-black text-primary-green uppercase tracking-widest mb-2 underline decoration-2 underline-offset-4">টিপস</p>
                     <p className="text-xs text-gray-500 font-bold italic leading-relaxed">পণ্যের সঠিক নাম ও ক্যাটাগরি কাস্টমারদের কাছে পৌঁছাতে সাহায্য করে। সঠিক মূল্য প্রদান নিশ্চিত করুন।</p>
                  </div>

                  <button className="w-full py-6 bg-primary-green text-white rounded-[28px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-green-100 hover:bg-primary-green-dark transition-all transform active:scale-95">পণ্যটি সেভ করুন</button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
