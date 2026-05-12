import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Zap, 
  MapPin, 
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  Heart,
  Store,
  UserCheck,
  Eye,
  Rocket,
  Home,
  LayoutGrid,
  Percent,
  Plus,
  ClipboardList,
  QrCode,
  HelpCircle,
  Phone,
  Wallet,
  Clock,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { CATEGORIES, DEMO_PRODUCTS, DEMO_SHOPS, DEMO_AGENTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  return (
    <div className="w-full bg-[#f8fafc] pb-10 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          
          {/* 1. LEFT SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-2 space-y-4">
            <div className="bg-white rounded-[25px] border border-gray-100 p-3 shadow-sm sticky top-28">
               <div className="space-y-1">
                  <SidebarItem icon={Home} label="হোম" active to="/" />
                  <SidebarItem icon={LayoutGrid} label="ক্যাটাগরি সমূহ" to="/category/all" />
                  <SidebarItem icon={Zap} label="জনপ্রিয় পণ্য" to="/products" />
                  <SidebarItem icon={Percent} label="অফার সমূহ" to="/offers" />
                  <SidebarItem icon={Plus} label="নতুন পণ্য" to="/products?tab=new" />
                  <SidebarItem icon={Store} label="টপ দোকান" to="/find-shop" />
                  <SidebarItem icon={UserCheck} label="এজেন্ট সমূহ" to="/find-agent" />
                  <SidebarItem icon={ClipboardList} label="অর্ডার ট্র্যাকিং" to="/dashboard" />
                  <SidebarItem icon={Heart} label="উইশলিস্ট" to="/wishlist" />
                  <SidebarItem icon={Clock} label="রিসেন্ট ভিউ" to="/dashboard/recent" />
                  <SidebarItem icon={HelpCircle} label="সহায়তা কেন্দ্র" to="/contact" />
                  <SidebarItem icon={Phone} label="যোগাযোগ" to="/contact" />
               </div>

               {/* Quick Delivery Card */}
               <div className="mt-8 bg-green-50 rounded-[25px] p-6 border border-green-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary-green/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <h4 className="font-black text-gray-900 text-sm mb-2">দ্রুত ডেলিভারি</h4>
                  <p className="text-[10px] font-bold text-gray-400 leading-relaxed mb-4">সারা বাংলাদেশে দ্রুত ও নিরাপদ ডেলিভারি</p>
                  <button className="bg-white text-primary-green px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 hover:bg-primary-green hover:text-white transition-all">বিস্তারিত দেখুন</button>
                  <div className="mt-4 flex justify-end">
                     <Truck size={48} className="text-primary-green opacity-20 group-hover:translate-x-3 transition-transform" />
                  </div>
               </div>
            </div>
          </aside>

          {/* 2. MAIN CONTENT (MIDDLE) */}
          <main className="lg:col-span-7 space-y-6">
            
            {/* Hero Carousel */}
            <section className="bg-primary-green rounded-[35px] min-h-[400px] relative overflow-hidden flex items-center p-12 md:p-20 group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
               <div className="relative z-10 max-w-lg">
                  <p className="text-white text-lg font-bold mb-4 italic opacity-90">স্বাগতম ShareFlow-এ</p>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tighter">আপনার প্রিয় পণ্য, <br />আপনার হাতে</h1>
                  <p className="text-lg text-white/80 mb-10 font-medium">সহজে খুঁজুন, অর্ডার করুন, দ্রুত পান</p>
                  <Link to="/search" className="inline-block px-10 py-5 bg-white text-gray-900 rounded-[22px] font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all shadow-xl active:scale-95">
                    এখনই কেনাকাটা করুন
                  </Link>
               </div>
               
               {/* Illustration (Floating App/Cart) */}
               <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 w-80 h-96 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/20 shadow-2xl p-6 group-hover:rotate-2 transition-transform duration-700">
                  <div className="w-full h-full bg-white rounded-[30px] flex flex-col items-center justify-center relative shadow-inner">
                     <div className="w-20 h-2 bg-gray-100 rounded-full absolute top-6"></div>
                     <ShoppingBag size={120} className="text-primary-green mb-8 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                     <div className="w-48 h-10 bg-primary-green rounded-2xl flex items-center justify-center text-white font-black text-xs uppercase tracking-widest">২০% ছাড়</div>
                  </div>
               </div>

               {/* Navigation */}
               <div className="absolute bottom-10 left-12 flex gap-2">
                  <div className="w-8 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
               </div>
               <button className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight size={24} className="rotate-180" />
               </button>
               <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight size={24} />
               </button>
            </section>

            {/* Category Icons Grid */}
            <section className="bg-white rounded-[35px] p-10 border border-gray-100 shadow-sm overflow-x-auto whitespace-nowrap hide-scrollbar">
               <div className="flex gap-10 min-w-max justify-center">
                  {CATEGORIES.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-3 group shrink-0">
                       <div className={cn("w-16 h-16 rounded-[22px] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform border border-transparent group-hover:border-white group-hover:shadow-xl", cat.bg, cat.color)}>
                          <cat.icon size={26} />
                       </div>
                       <span className="text-[11px] font-black text-gray-900 group-hover:text-primary-green transition-colors">{cat.name}</span>
                    </Link>
                  ))}
                  <Link to="/category/all" className="flex flex-col items-center gap-3 group shrink-0">
                     <div className="w-16 h-16 rounded-[22px] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-900 transition-all">
                        <LayoutGrid size={26} />
                     </div>
                     <span className="text-[11px] font-black text-gray-900">সব দেখুন</span>
                  </Link>
               </div>
            </section>

            {/* Flash Sale Section */}
            <section className="space-y-6">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-10">
                     <div className="flex items-center gap-3">
                        <Zap size={24} className="text-amber-500 fill-amber-500" />
                        <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase whitespace-nowrap">ফ্ল্যাশ সেল</h2>
                     </div>
                     <div className="hidden md:flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                        শেষ হতে বাকি:
                        <div className="flex gap-2 text-gray-900">
                           <span className="bg-white border border-gray-100 px-2 py-1 rounded-lg shadow-sm">০২</span> : <span className="bg-white border border-gray-100 px-2 py-1 rounded-lg shadow-sm">৩৫</span> : <span className="bg-white border border-gray-100 px-2 py-1 rounded-lg shadow-sm">৪৫</span>
                        </div>
                     </div>
                  </div>
                  <Link to="/offers" className="text-xs font-black text-primary-green hover:underline uppercase tracking-widest">সব দেখুন</Link>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {DEMO_PRODUCTS.slice(4, 10).map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                  ))}
               </div>
            </section>

            {/* Popular Products */}
            <section className="space-y-6">
               <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">জনপ্রিয় পণ্য</h2>
                  <Link to="/products" className="text-xs font-black text-primary-green hover:underline uppercase tracking-widest">সব দেখুন</Link>
               </div>
               <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {DEMO_PRODUCTS.slice(0, 5).map((product) => (
                    <div key={product.id} className="bg-white rounded-[25px] border border-gray-100 p-4 hover:shadow-xl transition-all group">
                       <div className="h-32 mb-4 overflow-hidden rounded-2xl bg-gray-50 relative">
                          <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <h4 className="text-[11px] font-black text-gray-900 line-clamp-1 mb-1">{product.name}</h4>
                       <div className="flex items-center justify-between">
                          <p className="text-sm font-black text-gray-900">৳{product.price}</p>
                          <div className="flex items-center gap-1">
                             <Star size={10} className="fill-amber-400 text-amber-400" />
                             <span className="text-[9px] font-bold text-gray-400">{product.rating}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Nearby Shops */}
            <section className="space-y-6">
               <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">নিকটস্থ দোকান</h2>
                  <Link to="/find-shop" className="text-xs font-black text-primary-green hover:underline uppercase tracking-widest">সব দেখুন</Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DEMO_SHOPS.slice(0, 3).map(shop => (
                    <div key={shop.id} className="bg-white rounded-[35px] border border-gray-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all">
                       <div className="h-36 relative">
                          <img src={shop.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-gray-900 shadow-md">
                             {shop.type}
                          </div>
                       </div>
                       <div className="p-6">
                          <h4 className="font-black text-gray-900 text-sm mb-1">{shop.name}</h4>
                          <div className="flex items-center justify-between mb-4">
                             <p className="text-[10px] text-gray-400 truncate max-w-[100px]">{shop.location}</p>
                             <div className="flex items-center gap-1 font-bold text-amber-500">
                                <Star size={10} className="fill-current" /> <span className="text-[9px]">{shop.rating}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Footer Trust Features */}
            <section className="bg-white rounded-[35px] p-6 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
               <FooterFeature icon={ShieldCheck} label="নিরাপদ পেমেন্ট" sub="১০০% নিরাপদ লেনদেন" color="text-primary-green" bg="bg-green-50" to="/about" />
               <FooterFeature icon={Truck} label="দ্রুত ডেলিভারি" sub="সারা বাংলাদেশে" color="text-primary-green" bg="bg-green-50" to="/about" />
               <FooterFeature icon={History} label="সহজ রিটার্ন" sub="সহজ রিটার্ন পলিসি" color="text-amber-500" bg="bg-amber-50" to="/about" />
               <FooterFeature icon={HelpCircle} label="সেরা সহায়তা" sub="২৪/৭ কাস্টমার সার্ভিস" color="text-blue-500" bg="bg-blue-50" to="/contact" />
            </section>

          </main>

          {/* 3. RIGHT SIDEBAR / WIDGETS */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Wallet Widget */}
            <div className="bg-primary-green rounded-[35px] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
               <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">আমার ওয়ালেট</span>
                  <Eye size={18} className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" />
               </div>
               <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-2xl font-black">৳</span>
                  <span className="text-5xl font-black tracking-tighter">৮,৬৫০.৫০</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <Link to="/dashboard/customer" className="bg-white text-primary-green py-3.5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95 shadow-lg shadow-black/10">
                     <Plus size={16} /> টপ আপ করুন
                  </Link>
                  <Link to="/dashboard/customer" className="bg-primary-green-dark/40 backdrop-blur-md text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary-green-dark transition-all active:scale-95 border border-white/20">
                     <History size={16} /> লেনদেন দেখুন
                  </Link>
               </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white rounded-[35px] border border-gray-100 p-8 shadow-sm">
               <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-8 border-l-4 border-primary-green pl-4">দ্রুত কার্যক্রম</h3>
               <div className="space-y-1">
                  <QuickAction icon={ShoppingBag} label="অর্ডার করুন" to="/search" />
                  <QuickAction icon={Wallet} label="ওয়ালেট টপ আপ" to="/dashboard" />
                  <QuickAction icon={UserCheck} label="রেফার করুন" to="/dashboard" />
                  <QuickAction icon={QrCode} label="QR কোড স্ক্যান" to="/dashboard" />
                  <QuickAction icon={Heart} label="উইশলিস্ট" to="/wishlist" />
                  <QuickAction icon={HelpCircle} label="সহায়তা নিন" to="/contact" />
               </div>
            </div>

            {/* Recent Orders Widget */}
            <div className="bg-white rounded-[35px] border border-gray-100 p-8 shadow-sm">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest border-l-4 border-primary-green pl-4">সাম্প্রতিক অর্ডার</h3>
                  <Link to="/dashboard/customer" className="text-[9px] font-black text-primary-green hover:underline uppercase tracking-widest">সব দেখুন</Link>
               </div>
               <div className="space-y-6">
                  <OrderWidget 
                    image={DEMO_PRODUCTS[0].image} 
                    name="মিনকেট চাল ৫ কেজি" 
                    id="#SF78945" 
                    status="ডেলিভার্ড" 
                    statusColor="bg-green-50 text-green-600"
                  />
                  <OrderWidget 
                    image={DEMO_PRODUCTS[2].image} 
                    name="মোবাইল চার্জার" 
                    id="#SF78944" 
                    status="পাঠানো হয়েছে" 
                    statusColor="bg-amber-50 text-amber-600"
                  />
                  <OrderWidget 
                    image={DEMO_PRODUCTS[4].image} 
                    name="প্যারাসিটামল ৫০০ মি.গ্রা" 
                    id="#SF78943" 
                    status="প্রসেসিং" 
                    statusColor="bg-blue-50 text-blue-600"
                  />
                  <OrderWidget 
                    image={DEMO_PRODUCTS[1].image} 
                    name="সয়াবিন তেল ১ লিটার" 
                    id="#SF78942" 
                    status="ডেলিভার্ড" 
                    statusColor="bg-green-50 text-green-600"
                  />
               </div>
            </div>

            {/* Merchant Registration Banner */}
            <div className="bg-green-50 rounded-[35px] p-8 border border-green-100 relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="font-black text-gray-900 text-base mb-2">আপনার দোকান রেজিস্টার করুন</h4>
                  <p className="text-[10px] font-bold text-gray-400 leading-relaxed mb-6">হাজারো গ্রাহকের কাছে আপনার পণ্য পৌঁছে দিন</p>
                  <Link to="/register?role=shop" className="block w-full text-center bg-white border border-green-200 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary-green shadow-sm hover:bg-primary-green hover:text-white transition-all active:scale-95">রেজিস্টার করুন</Link>
               </div>
               <div className="mt-8 flex justify-center relative">
                  <div className="w-32 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 relative overflow-hidden">
                     <div className="absolute top-0 w-full h-4 bg-primary-green"></div>
                     <Store size={40} className="text-gray-200 mt-2" />
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-primary-green rounded-full blur-2xl opacity-40 group-hover:scale-150 transition-transform"></div>
               </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function SidebarItem({ icon: Icon, label, active = false, to = "#" }: { icon: any, label: string, active?: boolean, to?: string }) {
  return (
    <Link to={to} className={cn(
      "flex items-center gap-4 p-3.5 rounded-2xl group transition-all",
      active ? "bg-primary-green text-white shadow-lg shadow-green-100" : "text-gray-600 hover:bg-gray-50"
    )}>
      <Icon size={18} className={cn(active ? "text-white" : "text-gray-400 group-hover:text-primary-green transition-colors")} />
      <span className={cn("text-xs font-black tracking-tight", active ? "text-white" : "text-gray-900 group-hover:text-primary-green transition-colors")}>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>}
    </Link>
  );
}

// Product Card Component (Matched to image)
interface ProductCardProps {
  product: any;
  onAddToCart: () => void;
  key?: string | number;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-[25px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group relative">
       {/* Discount Badge */}
       {product.discount && (
         <div className="absolute top-3 left-3 z-10 bg-primary-green text-white text-[8px] font-black px-2 py-0.5 rounded-md shadow-lg italic">
            -{product.discount}
         </div>
       )}
       
       <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
            referrerPolicy="no-referrer"
          />
       </div>

       <div className="p-4">
          <h4 className="text-[10px] font-black text-gray-900 line-clamp-2 mb-2 min-h-[30px]">{product.name}</h4>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xs font-black text-gray-900">৳{product.price}</span>
             <span className="text-[9px] text-gray-400 line-through font-bold">৳{product.mrp}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
             <div className="flex items-center gap-1">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span className="text-[9px] font-bold text-gray-400">{product.rating} ({product.reviews})</span>
             </div>
             <button 
               onClick={onAddToCart}
               className="w-8 h-8 bg-gray-50 border border-gray-100 text-primary-green rounded-xl flex items-center justify-center hover:bg-primary-green hover:text-white hover:border-primary-green transition-all shadow-sm active:scale-90"
             >
                <Plus size={16} strokeWidth={3} />
             </button>
          </div>
       </div>
    </div>
  );
}

// Quick Action Component
function QuickAction({ icon: Icon, label, to = "#" }: { icon: any, label: string, to?: string }) {
  return (
    <Link to={to} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-100 text-left">
       <div className="w-8 h-8 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-primary-green transition-colors">
          <Icon size={18} />
       </div>
       <span className="text-[11px] font-black text-gray-900 tracking-tight">{label}</span>
       <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

// Order Widget Component
function OrderWidget({ image, name, id, status, statusColor }: { image: string, name: string, id: string, status: string, statusColor: string }) {
  return (
    <div className="flex items-center gap-4 group">
       <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform">
          <img src={image} className="w-full h-full object-cover" alt={name} />
       </div>
       <div className="flex-1">
          <h5 className="text-[10px] font-black text-gray-900 line-clamp-1 leading-tight">{name}</h5>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{id}</p>
       </div>
       <div className={cn("px-2 py-1 rounded-md text-[8px] font-black whitespace-nowrap", statusColor)}>
          {status}
       </div>
    </div>
  );
}

// Footer Feature Component
function FooterFeature({ icon: Icon, label, sub, color, bg, to = "#" }: { icon: any, label: string, sub: string, color: string, bg: string, to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-4 p-4 border border-transparent hover:border-gray-100 hover:bg-white rounded-2xl transition-all group">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", bg, color)}>
          <Icon size={20} />
       </div>
       <div>
          <h5 className="text-[10px] font-black text-gray-900 uppercase tracking-tighter leading-none mb-1">{label}</h5>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{sub}</p>
       </div>
    </Link>
  );
}
