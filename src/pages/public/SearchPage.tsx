import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Filter, 
  ChevronRight, 
  LayoutGrid, 
  List,
  Star,
  Plus,
  ShoppingCart
} from 'lucide-react';
import { DEMO_PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = DEMO_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.shop.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">
            <Link to="/" className="hover:text-primary-green transition-colors">হোম</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">সার্চ রেজাল্ট</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
               <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">" {query} " - সার্চ রেজাল্ট 🔍</h1>
               <p className="text-gray-400 font-bold text-lg">আপনার সার্চের বিপরীতে মোট {filteredProducts.length}টি পণ্য পাওয়া গেছে।</p>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-white text-gray-900 shadow-xl shadow-gray-200" : "text-gray-400 hover:text-gray-600")}
               >
                 <LayoutGrid size={20} />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-white text-gray-900 shadow-xl shadow-gray-200" : "text-gray-400 hover:text-gray-600")}
               >
                 <List size={20} />
               </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length > 0 ? (
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
          )}>
             {filteredProducts.map((product) => (
               <motion.div 
                 layout
                 key={product.id}
                 className={cn(
                   "bg-white rounded-[35px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group",
                   viewMode === 'list' && "flex flex-col md:flex-row"
                 )}
               >
                 <div className={cn(
                   "relative overflow-hidden bg-gray-50",
                   viewMode === 'grid' ? "aspect-square" : "md:w-72 w-full aspect-square md:aspect-auto"
                 )}>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
                    </Link>
                    {product.discount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">
                        {product.discount} ছাড়!
                      </div>
                    )}
                 </div>
                 
                 <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                       <Link to={`/product/${product.id}`} className="text-gray-900 font-black text-lg mb-2 block hover:text-primary-green transition-colors leading-tight">
                         {product.name}
                       </Link>
                       <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                             {[1,2,3,4,5].map(i => <Star key={i} size={11} className={cn("fill-current", i <= Math.floor(product.rating) ? "text-amber-400" : "text-gray-200")} />)}
                          </div>
                          <span className="text-[10px] font-black text-gray-400">({product.reviews})</span>
                       </div>
                       {viewMode === 'list' && (
                         <p className="text-gray-400 text-xs font-bold mb-8 line-clamp-3 leading-relaxed">
                            সরাসরি {product.shop} থেকে সংগ্রহ করা এই পণ্যটি আপনার দৈনন্দিন চাহিদার জন্য সেরা পছন্দ হতে পারে। আমরা গুণগত মানের নিশ্চয়তা প্রদান করি।
                         </p>
                       )}
                    </div>
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="text-2xl font-black text-gray-900 tracking-tighter">৳{product.price}</p>
                          <p className="text-[10px] text-gray-400 line-through font-bold">৳{product.mrp}</p>
                       </div>
                       <button 
                         onClick={() => addToCart(product)}
                         className="w-14 h-14 bg-gray-900 text-white rounded-[20px] hover:bg-primary-green transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center"
                       >
                          <Plus size={24} />
                       </button>
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        ) : (
          <div className="bg-white rounded-[50px] p-24 text-center border border-gray-100 shadow-sm max-w-4xl mx-auto mt-12">
             <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 overflow-hidden shadow-inner group">
                <SearchIcon size={60} className="text-gray-200 group-hover:scale-125 transition-transform duration-1000" />
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter uppercase">কোনো রেজাল্ট পাওয়া যায়নি 😔</h2>
             <p className="text-gray-400 font-bold mb-12 max-w-sm mx-auto leading-relaxed text-lg italic">দুঃখিত, আপনার সার্চ করা "<b>{query}</b>" কীওয়ার্ডটির বিপরীতে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="px-10 py-5 bg-primary-green text-white rounded-[25px] font-black uppercase text-xs tracking-widest shadow-2xl shadow-green-100 hover:-translate-y-1 transition-all">হোম পেজে ফিরে যান</Link>
                <Link to="/products" className="px-10 py-5 border-2 border-gray-100 text-gray-900 rounded-[25px] font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all">বড় অফার দেখুন</Link>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
