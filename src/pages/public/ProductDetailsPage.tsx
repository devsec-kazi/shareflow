import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Repeat, 
  Check,
  Plus,
  Minus,
  Store,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { DEMO_PRODUCTS, CATEGORIES } from '../../constants';
import { cn } from '../../lib/utils';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = DEMO_PRODUCTS.find(p => p.id === id) || DEMO_PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const category = CATEGORIES.find(c => c.id === product.category);

  return (
    <div className="bg-[#f8fafc] pb-24 font-sans">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-primary-green transition-colors">হোম</Link>
            <ChevronRight size={12} />
            <Link to={`/category/${product.category}`} className="hover:text-primary-green transition-colors">{category?.name}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 md:gap-12 p-6 md:p-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 rounded-[35px] overflow-hidden border border-gray-50 relative group">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                {product.discount && (
                  <div className="absolute top-8 left-8 bg-red-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-xl shadow-red-500/20">
                    {product.discount} ছাড়!
                  </div>
                )}
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[product.image, "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600", "https://images.unsplash.com/photo-1556742049-04ffbd36b57b?auto=format&fit=crop&q=80&w=600"].map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "w-24 h-24 rounded-2xl border-2 overflow-hidden shrink-0 transition-all",
                      selectedImage === img ? "border-primary-green shadow-lg" : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col py-6 md:py-0">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-50 text-primary-green text-[9px] font-black uppercase tracking-[0.2em] rounded-lg mb-4">
                       {category?.name}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-tight">{product.name}</h1>
                  </div>
                  <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Heart size={24} />
                  </button>
               </div>

               <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={16} className={cn("fill-current", i <= Math.floor(product.rating) ? "text-amber-400" : "text-gray-200")} />
                    ))}
                    <span className="text-sm font-black text-gray-900 ml-2">{product.rating}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-200"></div>
                  <span className="text-sm font-bold text-gray-400">{product.reviews} টি রিভিও</span>
                  <div className="h-4 w-px bg-gray-200"></div>
                  <div className="flex items-center gap-1.5 text-green-600">
                    <Check size={16} />
                    <span className="text-sm font-black uppercase tracking-widest">স্টক আছে (১০০+)</span>
                  </div>
               </div>

               <div className="bg-gray-50/50 rounded-[35px] p-8 mb-10 border border-gray-50">
                  <div className="flex items-end gap-4 mb-4">
                     <span className="text-5xl font-black text-gray-900 tracking-tighter">৳{product.price}</span>
                     <span className="text-xl text-gray-400 line-through font-bold mb-1">৳{product.mrp}</span>
                     <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-2">
                       -{Math.round(((product.mrp - product.price) / product.mrp) * 100)}% ছাড়
                     </span>
                  </div>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">ট্যাক্স অন্তর্ভুক্ত</p>
               </div>

               <div className="space-y-8 mb-12">
                  <div className="flex items-center gap-8">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">পরিমাণ</p>
                     <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="w-12 text-center font-black text-lg">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Plus size={20} />
                        </button>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                     <button 
                       onClick={() => addToCart(product, quantity)}
                       className="flex-1 bg-primary-green text-white py-6 rounded-[25px] font-black uppercase text-sm tracking-widest shadow-2xl shadow-green-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                     >
                        <ShoppingCart size={20} /> কার্টে যোগ করুন
                     </button>
                     <button 
                       onClick={() => {
                         addToCart(product, quantity);
                         navigate('/checkout');
                       }}
                       className="flex-1 bg-gray-900 text-white py-6 rounded-[25px] font-black uppercase text-sm tracking-widest hover:bg-black transition-all active:scale-95"
                     >
                        সরাসরি কিনুন
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-[25px] group hover:border-primary-green transition-all">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-primary-green group-hover:scale-110 transition-transform">
                      <Truck size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-900 uppercase">ফ্রি ডেলিভারি</p>
                      <p className="text-[9px] font-bold text-gray-400">৳৫০০+ কেনাকাটায়</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-[25px] group hover:border-primary-green transition-all">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-900 uppercase">৭ দিনের রিটার্ন</p>
                      <p className="text-[9px] font-bold text-gray-400">শর্ত প্রযোজ্য</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Description & Reviews Tabs */}
          <div className="border-t border-gray-100 p-6 md:p-12">
             <div className="flex gap-10 border-b border-gray-100 mb-10 overflow-x-auto">
                <button className="pb-6 border-b-4 border-primary-green text-gray-900 font-black uppercase text-sm tracking-widest">পণ্যের বিবরণ</button>
                <button className="pb-6 border-b-4 border-transparent text-gray-400 font-black uppercase text-sm tracking-widest hover:text-gray-900 transition-all">রিভিও (১২)</button>
                <button className="pb-6 border-b-4 border-transparent text-gray-400 font-black uppercase text-sm tracking-widest hover:text-gray-900 transition-all">দোকান তথ্য</button>
             </div>

             <div className="prose prose-slate max-w-none">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-6">পণ্যের পরিচিতি</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-lg mb-8">
                  {product.name} একটি অতি উচ্চ মানের পণ্য যা আমাদের বিশ্বস্ত দোকানদার {product.shop} থেকে সরাসরি সংগ্রহ করা হয়েছে। এটি স্বাস্থ্যকর পরিবেশে তৈরি এবং গুণমান নিশ্চিত করতে কয়েক ধাপে যাচাই করা হয়। 
                </p>
                
                <h4 className="text-xl font-black text-gray-900 mb-6">প্রধান বৈশিষ্ট্যসমূহ:</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                   {[
                     'শতভাগ অরিজিনাল পণ্য',
                     'উন্নত প্যাকেজিং ব্যবস্থা',
                     'সরাসরি বাগান/ফ্যাক্টরি থেকে সংগৃহীত',
                     'পরিবেশবান্ধব ও স্বাস্থ্যকর'
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-50">
                        <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center text-white shrink-0">
                           <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-gray-700 text-sm">{item}</span>
                     </div>
                   ))}
                </div>

                <div className="bg-gray-900 rounded-[35px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-white/10 rounded-[25px] flex items-center justify-center text-primary-green">
                         <Store size={40} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">বিক্রেতা</p>
                         <h4 className="text-2xl font-black text-white">{product.shop}</h4>
                         <p className="text-xs font-bold text-primary-green mt-1">ভেরিফাইড মার্চেন্ট</p>
                      </div>
                   </div>
                   <Link to={`/shop/default`} className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary-green hover:text-white transition-all shadow-xl">
                      দোকান ভিজিট করুন
                   </Link>
                </div>
             </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-24">
           <div className="flex justify-between items-end mb-10">
              <div>
                 <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">সংশ্লিষ্ট পণ্যসমূহ</h2>
                 <div className="w-16 h-1.5 bg-primary-green rounded-full"></div>
              </div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {DEMO_PRODUCTS.slice(0, 5).map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all">
                   <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                   </div>
                   <h4 className="font-black text-gray-900 text-sm line-clamp-1 mb-2 group-hover:text-primary-green transition-colors">{p.name}</h4>
                   <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-gray-900">৳{p.price}</span>
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-primary-green group-hover:text-white transition-colors">
                        <Plus size={16} />
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
