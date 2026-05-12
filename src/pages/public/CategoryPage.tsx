import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Filter, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  Star, 
  ShoppingCart, 
  Heart,
  Plus,
  Search,
  ChevronRight,
  SlidersHorizontal,
  Store
} from 'lucide-react';
import { CATEGORIES, DEMO_PRODUCTS } from '../../constants';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function CategoryPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const isAll = id === 'all';
  const category = isAll 
    ? { id: 'all', name: 'সব ক্যাটাগরি', icon: LayoutGrid, bg: 'bg-gray-900', color: 'text-white' }
    : CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
    
  const products = isAll 
    ? DEMO_PRODUCTS 
    : DEMO_PRODUCTS.filter(p => p.category === id);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans">
      {/* Category Header */}
      <section className="bg-white border-b border-gray-100 py-12 md:py-20 relative overflow-hidden">
        <div className={cn("absolute right-0 top-0 w-96 h-96 opacity-10 blur-[100px] rounded-full -mr-48 -mt-48", category.bg)}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">
            <Link to="/" className="hover:text-primary-green transition-colors">হোম</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">{category.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-8">
               <div className={cn("w-24 h-24 rounded-[30px] flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-105", category.bg)}>
                  <category.icon size={40} />
               </div>
               <div>
                  <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 uppercase">{category.name}</h1>
                  <p className="text-gray-400 font-bold text-lg max-w-xl">
                    সেরা মানের {category.name} এখন আপনার হাতের নাগালে। সরাসরি বিশ্বস্ত বিক্রেতাদের থেকে সংগ্রহ করা।
                  </p>
               </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hidden lg:block">
               <div className="flex gap-10">
                  <div className="text-center">
                     <p className="text-2xl font-black text-gray-900">{products.length}</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase">পণ্য</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                     <p className="text-2xl font-black text-gray-900">১৫+</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase">দোকানদার</p>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                     <p className="text-2xl font-black text-gray-900">৪.৮</p>
                     <p className="text-[10px] font-black text-gray-400 uppercase">রেটিং</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 hidden lg:block space-y-10">
             <div className="bg-white rounded-[35px] p-8 border border-gray-100 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-primary-green" /> ফিল্টার সমূহ
                </h3>
                
                <div className="space-y-10">
                   {/* Price Filter */}
                   <div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">মূল্য পরিসীমা</p>
                      <div className="space-y-4">
                         <div className="flex items-center gap-4">
                            <input type="number" placeholder="সর্বনিম্ন" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-primary-green transition-all" />
                            <span className="text-gray-300">-</span>
                            <input type="number" placeholder="সর্বোচ্চ" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-primary-green transition-all" />
                         </div>
                      </div>
                   </div>

                   {/* Other Categories Selection */}
                   <div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">অন্যান্য ক্যাটাগরি</p>
                      <div className="space-y-2">
                         {CATEGORIES.slice(0, 5).map(cat => (
                           <Link key={cat.id} to={`/category/${cat.id}`} className={cn(
                             "flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-xs uppercase",
                             cat.id === id ? "bg-green-50 text-primary-green" : "text-gray-500 hover:bg-gray-50"
                           )}>
                              <cat.icon size={14} /> {cat.name}
                           </Link>
                         ))}
                      </div>
                   </div>

                   {/* Rating Filter */}
                   <div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">রেটিং</p>
                      <div className="space-y-3">
                         {[4, 3, 2].map(r => (
                           <label key={r} className="flex items-center gap-3 cursor-pointer group">
                              <input type="checkbox" className="w-5 h-5 rounded-md border-gray-200 text-primary-green focus:ring-primary-green" />
                              <div className="flex items-center gap-1">
                                 {[1,2,3,4,5].map(i => (
                                   <Star key={i} size={12} className={cn("fill-current", i <= r ? "text-amber-400" : "text-gray-100")} />
                                 ))}
                                 <span className="text-[10px] font-black text-gray-400 ml-1">({r}+)</span>
                              </div>
                           </label>
                         ))}
                      </div>
                   </div>
                </div>
                
                <button className="w-full mt-10 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary-green transition-colors shadow-xl shadow-gray-200">
                  ফিল্টার প্রয়োগ করুন
                </button>
             </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
             {/* Toolbar */}
             <div className="bg-white rounded-[28px] p-4 border border-gray-100 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                   <div className="flex bg-gray-50 rounded-xl p-1">
                      <button onClick={() => setViewMode('grid')} className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white text-primary-green shadow-sm" : "text-gray-400 hover:text-gray-600")}>
                        <LayoutGrid size={20} />
                      </button>
                      <button onClick={() => setViewMode('list')} className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white text-primary-green shadow-sm" : "text-gray-400 hover:text-gray-600")}>
                        <List size={20} />
                      </button>
                   </div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">মোট {products.length}টি পণ্য পাওয়া গেছে</p>
                </div>
                <div className="flex items-center gap-4">
                   <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border-none rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-700 outline-none focus:ring-2 focus:ring-primary-green/20"
                   >
                     <option value="popular">জনপ্রিয়তা</option>
                     <option value="lowest">সর্বনিম্ন মূল্য</option>
                     <option value="highest">সর্বোচ্চ মূল্য</option>
                     <option value="newest">নতুন পণ্য</option>
                   </select>
                   <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden p-3 bg-gray-900 text-white rounded-xl">
                      <Filter size={20} />
                   </button>
                </div>
             </div>

             {/* Filter Off-canvas (Mobile) */}
             <AnimatePresence>
                {showFilters && (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 bg-black/40 z-50 lg:hidden backdrop-blur-sm" />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-[80%] bg-white z-[60] lg:hidden p-8 flex flex-col shadow-2xl">
                       <h2 className="text-xl font-black text-gray-900 mb-10 tracking-tight flex items-center justify-between">
                         ফিল্টার সমূহ <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-50 rounded-xl"><Plus className="rotate-45" size={20} /></button>
                       </h2>
                       <div className="flex-1 overflow-y-auto">
                          {/* Replicate Sidebar Content here for Mobile */}
                          <div className="space-y-10">
                             <div>
                               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">মূল্য পরিসীমা</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <input type="number" placeholder="মিন" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-xs font-bold" />
                                  <input type="number" placeholder="ম্যাক্স" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-xs font-bold" />
                               </div>
                             </div>
                             <div>
                               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">রেটিং</p>
                               <div className="space-y-4">
                                  {[4, 3, 2].map(r => (
                                    <div key={r} className="flex items-center gap-3">
                                       <input type="checkbox" className="w-6 h-6 rounded-lg border-gray-200 text-primary-green" />
                                       <div className="flex items-center gap-1">
                                          {[1,2,3,4,5].map(i => <Star key={i} size={14} className={cn("fill-current", i <= r ? "text-amber-400" : "text-gray-100")} />)}
                                       </div>
                                    </div>
                                  ))}
                               </div>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => setShowFilters(false)} className="w-full py-5 bg-primary-green text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-green-100 mt-8">প্রয়োগ করুন</button>
                    </motion.div>
                  </>
                )}
             </AnimatePresence>

             {/* Products Grid/List */}
             <div className={cn(
               "grid gap-6",
               viewMode === 'grid' ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
             )}>
                {products.map((product) => (
                  <motion.div 
                    layout
                    key={product.id}
                    className={cn(
                      "bg-white rounded-[35px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group",
                      viewMode === 'list' && "flex md:flex-row flex-col"
                    )}
                  >
                    <div className={cn(
                      "relative overflow-hidden bg-gray-50",
                      viewMode === 'grid' ? "aspect-square" : "md:w-64 w-full aspect-square md:aspect-auto h-64 md:h-auto"
                    )}>
                       <Link to={`/product/${product.id}`}>
                        <img 
                          src={product.image} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          alt={product.name}
                          referrerPolicy="no-referrer"
                        />
                       </Link>
                       {product.discount && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">
                           {product.discount} ছাড়!
                        </div>
                       )}
                       <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                          <Heart size={18} />
                       </button>
                    </div>

                    <div className={cn(
                      "p-6 flex flex-col justify-between",
                      viewMode === 'list' && "flex-1"
                    )}>
                       <div>
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic mb-1">ভেরিফাইড প্রোডাক্ট</p>
                          <Link to={`/product/${product.id}`} className="text-gray-900 font-black text-sm lg:text-base line-clamp-1 mb-2 hover:text-primary-green transition-colors">
                            {product.name}
                          </Link>
                          <div className="flex items-center gap-2 mb-4">
                             <div className="flex">
                                {[1,2,3,4,5].map(i => <Star key={i} size={10} className={cn("fill-current", i <= Math.floor(product.rating) ? "text-amber-400" : "text-gray-200")} />)}
                             </div>
                             <span className="text-[10px] font-black text-gray-400">({product.reviews})</span>
                          </div>
                          {viewMode === 'list' && (
                            <p className="text-gray-400 text-xs font-medium mb-6 line-clamp-3">
                              এই পণ্যটি সরাসরি {product.shop} থেকে সংগ্রহ করা হয়েছে। এটি একটি উচ্চ মানের পণ্য যা আমাদের কোয়ালিটি কন্ট্রোল টিমের মাধ্যমে পরীক্ষিত।
                            </p>
                          )}
                       </div>

                       <div className="flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                             <span className="text-xl font-black text-gray-900 tracking-tighter">৳{product.price}</span>
                             <span className="text-[10px] text-gray-400 line-through font-bold">৳{product.mrp}</span>
                          </div>
                          <button 
                            onClick={() => addToCart(product)}
                            className="flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-2xl hover:bg-primary-green transition-all shadow-xl shadow-gray-200 active:scale-95"
                          >
                             <Plus size={20} />
                          </button>
                       </div>
                       
                       <div className="mt-4 pt-4 border-t border-dotted border-gray-100 flex items-center gap-2">
                          <Store size={12} className="text-primary-green" />
                          <span className="text-[10px] font-bold text-gray-400 hover:text-primary-green cursor-pointer">{product.shop}</span>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </div>

             {/* Empty State */}
             {products.length === 0 && (
               <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-8">
                     <Search size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">কোনো পণ্য পাওয়া যায়নি</h3>
                  <p className="text-gray-400 font-bold max-w-sm mx-auto mb-10">আপনার পছন্দের এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই। শীঘ্রই নতুন পণ্য যুক্ত হবে।</p>
                  <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-primary-green text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-green-100">
                    অন্যান্য ক্যাটাগরি দেখুন <ChevronRight size={18} />
                  </Link>
               </div>
             )}

             {/* Load More */}
             {products.length > 0 && (
               <div className="mt-16 text-center">
                  <button className="px-12 py-5 border-2 border-gray-100 text-gray-900 rounded-[25px] font-black uppercase text-[10px] tracking-widest hover:bg-white hover:border-primary-green hover:text-primary-green transition-all">
                    আরও পণ্য দেখুন
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
