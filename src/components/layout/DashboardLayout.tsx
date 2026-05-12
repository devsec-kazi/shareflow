import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Search, 
  History, 
  Ticket, 
  Bell, 
  Wallet, 
  LogOut, 
  Package, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  ShieldCheck,
  QrCode,
  Tablet,
  ShoppingCart,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems: Record<UserRole, any[]> = {
    customer: [
      { label: 'ওভারভিউ', icon: LayoutDashboard, href: '/dashboard/customer' },
      { label: 'দোকান খুঁজুন', icon: Search, href: '/find-shop' },
      { label: 'কেনাকাটার ইতিহাস', icon: History, href: '#' },
      { label: 'অফার ও কুপন', icon: Ticket, href: '#' },
      { label: 'ওয়ালেট ও লেনদেন', icon: Wallet, href: '#' },
      { label: 'প্রোফাইল সেটিংস', icon: Settings, href: '#' },
    ],
    shop_owner: [
      { label: 'ড্যাশবোর্ড', icon: LayoutDashboard, href: '/dashboard/shop' },
      { label: 'ইনভেন্টরি', icon: Package, href: '#' },
      { label: 'বিক্রয় রিপোর্ট', icon: BarChart3, href: '#' },
      { label: 'কাস্টমার লিস্ট', icon: Users, href: '#' },
      { label: 'অর্ডার ইনভয়েস', icon: FileText, href: '#' },
      { label: 'ব্যালেন্স', icon: Wallet, href: '#' },
    ],
    agent: [
      { label: 'ওভারভিউ', icon: LayoutDashboard, href: '/dashboard/agent' },
      { label: 'ট্রানজেকশন খতিয়ান', icon: FileText, href: '#' },
      { label: 'কমিশন এনালাইটিক্স', icon: BarChart3, href: '#' },
      { label: 'ইউজার ভেরিফিকেশন', icon: ShieldCheck, href: '#' },
      { label: 'ফান্ড ম্যানেজমেন্ট', icon: Wallet, href: '#' },
    ],
    admin: [
      { label: 'অ্যাডমিন প্যানেল', icon: LayoutDashboard, href: '/dashboard/admin' },
      { label: 'ইউজার ম্যানেজমেন্ট', icon: Users, href: '#' },
      { label: 'পেন্ডিং ভেরিফিকেশন', icon: ShieldCheck, href: '#' },
      { label: 'সিস্টেম লগ', icon: FileText, href: '#' },
      { label: 'সেটিংস', icon: Settings, href: '#' },
    ]
  };

  const roleLabels: Record<UserRole, string> = {
    customer: 'কাস্টমার',
    shop_owner: 'মালিক',
    agent: 'এজেন্ট',
    admin: 'অ্যাডমিন'
  };

  const role = user?.role || 'customer';

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col h-full hidden lg:flex relative z-50">
        <div className="p-10 flex flex-col h-full">
          <Link to="/" className="flex items-center gap-3 mb-16 group">
            <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-white shadow-xl shadow-green-100 group-hover:rotate-6 transition-transform">
              <ShoppingCart size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900 tracking-tighter leading-none mb-1">শেয়ার<span className="text-primary-green">ফ্লো</span></span>
              <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none">ShareFlow</span>
            </div>
          </Link>

          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6 pl-4">মেনু অপশন</p>
            {menuItems[role].map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                    isActive 
                      ? "bg-gray-900 text-white shadow-2xl shadow-gray-300" 
                      : "text-gray-400 hover:text-primary-green hover:bg-green-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 bg-primary-green rounded-full"></div>}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-10 border-t border-gray-50 flex flex-col gap-4">
             <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">কারেন্ট ব্যালেন্স</p>
                <p className="text-xl font-black text-gray-900 tracking-tighter">৳{user?.walletBalance?.toLocaleString() || '০'}</p>
             </div>
             <button 
                onClick={handleLogout}
                className="flex items-center gap-4 px-6 py-4 w-full rounded-2xl text-[10px] font-black text-red-400 uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all border border-transparent"
              >
                <LogOut size={18} /> লগ আউট
              </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-24 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 md:px-12 relative z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-gray-50 rounded-xl text-gray-900"
            >
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-4">
              <h1 className="text-xl font-black text-gray-900 tracking-tighter leading-none">{roleLabels[role]} প্যানেল</h1>
              <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">শেয়ারফ্লো ড্যাশবোর্ড</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <button className="relative w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary-green transition-all hover:bg-white border border-transparent hover:border-gray-100">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             
             <div className="h-10 w-px bg-gray-100 mx-2 hidden sm:block"></div>
             
             <div className="flex items-center gap-4 group cursor-pointer pl-4">
                <div className="text-right hidden md:block">
                   <p className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none mb-1 group-hover:text-primary-green transition-colors">{user?.name}</p>
                   <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{user?.role === 'customer' ? 'মেম্বার' : 'ভেরিফাইড পাার্টনার'}</p>
                </div>
                <div className="w-12 h-12 bg-gray-900 rounded-[18px] flex items-center justify-center text-white font-black text-xs shadow-xl shadow-gray-200 transition-transform group-hover:rotate-6">
                   {user?.name?.[0] || 'U'}
                </div>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 relative z-30">
          <Outlet />
        </main>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-[80%] bg-white z-[70] lg:hidden p-10 flex flex-col shadow-2xl"
              >
                <div className="flex justify-between items-center mb-16">
                   <Link to="/" className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-white">
                        <ShoppingCart size={20} strokeWidth={2.5} />
                      </div>
                      <span className="text-xl font-black text-gray-900 tracking-tighter">শেয়ার<span className="text-primary-green">ফ্লো</span></span>
                   </Link>
                   <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-50 rounded-xl">
                      <X size={20} />
                   </button>
                </div>

                <nav className="flex-1 space-y-2">
                   {menuItems[role].map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-5 px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                          location.pathname === item.href 
                            ? "bg-gray-900 text-white shadow-xl" 
                            : "text-gray-400 hover:text-primary-green hover:bg-green-50"
                        )}
                      >
                        <item.icon size={20} />
                        {item.label}
                      </Link>
                   ))}
                </nav>

                <div className="mt-auto pt-10 border-t border-gray-50">
                   <div className="p-6 bg-gray-50 rounded-3xl mb-4">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">ব্যালেন্স</p>
                      <p className="text-xl font-black text-gray-900">৳{user?.walletBalance?.toLocaleString() || '০'}</p>
                   </div>
                   <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-5 w-full text-red-500 font-black text-[10px] uppercase tracking-widest">
                      <LogOut size={20} /> লগ আউট
                   </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
