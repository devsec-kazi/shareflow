import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Store, UserCheck, Search as SearchIcon, Heart, Bell, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../constants';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans py-4">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-6">
            {/* Logo & Menu */}
            <div className="flex items-center gap-6 shrink-0">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100">
                  <ShoppingCart size={22} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tighter hidden xl:inline-block">
                  Share<span className="text-primary-green">Flow</span>
                </span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg lg:hidden"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Center Search - Highly Specific Style */}
            <div className="flex-1 max-w-2xl bg-gray-50 rounded-xl flex items-center p-1 border border-gray-100 hidden md:flex">
              <div className="px-4 border-r border-gray-200 hidden md:block">
                <button 
                  onClick={() => navigate('/category/all')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  সব ক্যাটাগরি <LayoutGrid size={14} className="text-gray-400" />
                </button>
              </div>
              <input 
                type="text" 
                placeholder="পণ্য, দোকান বা এজেন্ট খুঁজুন..."
                value={searchQuery}
                onKeyDown={(e) => e.key === 'Enter' && searchQuery && navigate(`/search?q=${searchQuery}`)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent px-6 py-2.5 outline-none text-sm font-bold text-gray-900 placeholder:text-gray-400"
              />
              <button 
                onClick={() => searchQuery && navigate(`/search?q=${searchQuery}`)}
                className="bg-primary-green text-white px-8 py-2.5 rounded-lg text-sm font-black tracking-tight hover:bg-primary-green-dark transition-all shadow-md shadow-green-100"
              >
                খুঁজুন
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4 lg:gap-8 shrink-0">
              {/* Find Agent/Shop */}
              <div className="hidden lg:flex items-center gap-8">
                <Link to="/find-agent" className="flex items-center gap-3 text-gray-600 hover:text-primary-green transition-colors">
                  <UserCheck size={20} className="text-primary-green" />
                  <span className="text-xs font-black tracking-tight">এজেন্ট খুঁজুন</span>
                </Link>
                <Link to="/find-shop" className="flex items-center gap-3 text-gray-600 hover:text-primary-green transition-colors">
                  <Store size={20} className="text-primary-green" />
                  <span className="text-xs font-black tracking-tight">দোকান খুঁজুন</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                {/* Notification & Cart Bubbles */}
                <Link to="/cart" className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-xl relative">
                  <ShoppingCart size={20} lg:size={22} />
                  <span className="absolute top-1 right-1 lg:top-2 lg:right-2 w-4 h-4 lg:w-5 lg:h-5 bg-gray-900 text-white text-[8px] lg:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {totalItems}
                  </span>
                </Link>
                
                <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-xl relative">
                  <Bell size={20} lg:size={22} />
                  <span className="absolute top-1 right-1 lg:top-2 lg:right-2 w-4 h-4 lg:w-5 lg:h-5 bg-primary-green text-white text-[8px] lg:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    5
                  </span>
                </button>

                <div className="w-px h-6 bg-gray-100 mx-1 hidden sm:block"></div>

                {/* User Identity */}
                {user ? (
                  <div className="relative group">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                    >
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl overflow-hidden shadow-sm bg-gray-100">
                        <img src={user.avatar || 'https://i.pravatar.cc/150'} className="w-full h-full object-cover" alt="Profile" />
                      </div>
                      <div className="text-left hidden sm:block">
                         <p className="text-xs font-black text-gray-900 leading-tight tracking-tight">{user.name}</p>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{user.role || 'গ্রাহক'}</p>
                      </div>
                    </button>
                    
                    {/* Logout Dropdown (Desktop) */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
                      <Link to="/dashboard" className="block px-6 py-3 text-xs font-black text-gray-900 hover:bg-gray-50">ড্যাশবোর্ড</Link>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-6 py-3 text-xs font-black text-red-500 hover:bg-red-50"
                      >
                        লগআউট
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="px-4 py-2 lg:px-6 lg:py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-gray-200 hover:bg-black transition-all">
                    লগইন
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] bg-white z-[110] md:hidden p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-white">
                      <ShoppingCart size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-black text-gray-900 tracking-tighter">Share<span className="text-primary-green">Flow</span></span>
                 </div>
                 <button onClick={() => setIsMenuOpen(false)} className="p-2 border border-gray-100 rounded-xl">
                   <X size={20} />
                 </button>
              </div>

              <div className="mb-12 overflow-y-auto">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">ক্যাটাগরি</p>
                <div className="grid grid-cols-2 gap-3">
                   {CATEGORIES.map(cat => (
                     <Link key={cat.id} to={`/category/${cat.id}`} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center gap-3 hover:bg-green-50 transition-colors">
                        <cat.icon size={20} className={cat.color} />
                        <span className="text-[10px] font-bold text-gray-900">{cat.name}</span>
                     </Link>
                   ))}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">অন্যান্য</p>
                <Link to="/find-shop" className="block py-4 px-6 bg-gray-50 rounded-2xl font-black text-sm text-gray-900">দোকান খুঁজুন</Link>
                <Link to="/find-agent" className="block py-4 px-6 bg-gray-50 rounded-2xl font-black text-sm text-gray-900">এজেন্ট খুঁজুন</Link>
                <Link to="/contact" className="block py-4 px-6 bg-gray-50 rounded-2xl font-black text-sm text-gray-900">সহায়তা কেন্দ্র</Link>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100">
                {user ? (
                  <div className="space-y-3">
                    <Link to="/dashboard" className="block w-full py-4 bg-gray-900 text-white text-center rounded-[20px] font-black uppercase text-xs tracking-widest">ড্যাশবোর্ড</Link>
                    <button onClick={logout} className="block w-full py-4 bg-red-50 text-red-500 text-center rounded-[20px] font-black uppercase text-xs tracking-widest">লগআউট</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/login" className="py-4 bg-gray-50 rounded-[20px] text-center font-black uppercase text-xs tracking-widest">লগইন</Link>
                    <Link to="/signup" className="py-4 bg-primary-green text-white rounded-[20px] text-center font-black uppercase text-xs tracking-widest shadow-xl shadow-green-100">নিবন্ধন</Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
