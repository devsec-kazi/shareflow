import { motion } from 'motion/react';
import { Camera, Video, Newspaper, Play, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MediaPage() {
  const news = [
    { title: 'ShareFlow পেল ১০ মিলিয়ন ডলারের ফান্ডিং', date: '১২ অক্টোবর, ২০২৪', category: 'ঘোষণা', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800' },
    { title: 'নতুন ড্যাশবোর্ড আপডেট এখন সবার জন্য', date: '৩০ সেপ্টেম্বর, ২০২৪', category: 'প্রোডাক্ট', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  ];

  const galleryItems = [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1556742049-04ffbd36b57b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1454165833767-027baee9a3f7?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <div className="bg-[#fcfcfc] font-sans py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1 bg-white border border-gray-100 text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] rounded-full mb-6 shadow-sm">লেটেস্ট আপডেট</span>
            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight uppercase">মিডিয়া ও <br /><span className="text-blue-600 underline decoration-blue-600 decoration-8 underline-offset-4">গ্যালারি।</span></h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed italic">ShareFlow ইকোসিস্টেমের সর্বশেষ খবর, অ্যাসেটস এবং সাফল্যের গল্প।</p>
          </motion.div>
        </div>

        {/* Latest News */}
        <section className="mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">সর্বশেষ খবর</h2>
            </div>
            <Link to="#" className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-2 border-blue-50 px-6 py-3 rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">সবগুলো দেখুন <ExternalLink size={14}/></Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {news.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="group cursor-pointer bg-white p-6 rounded-[48px] border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all"
              >
                <div className="aspect-[16/9] rounded-[32px] overflow-hidden mb-8 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-xl">
                    {item.category}
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-[10px] text-gray-400 font-black mb-3 uppercase tracking-widest flex items-center gap-2">
                    <Newspaper size={12} className="text-blue-600" /> {item.date}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tighter leading-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16 px-4">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
               <Camera size={28} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">ফটো গ্যালারি</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4 sm:px-0">
            {galleryItems.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-square rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:rotate-2 transition-all group relative cursor-zoom-in"
              >
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Media" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Brand Assets */}
        <section className="bg-gray-900 rounded-[60px] p-12 sm:p-20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase underline decoration-blue-600 decoration-8 underline-offset-4">ব্র্যান্ড অ্যাসেটস</h2>
            <p className="text-gray-400 font-medium italic text-lg">আমাদের লোগো বা ব্র্যান্ড গাইডলাইন প্রয়োজন? সরাসরি ডাউনলোড করুন এখান থেকে।</p>
          </div>
          <button className="relative z-10 px-12 py-6 bg-blue-600 rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-900/50 hover:bg-blue-700 transition-all flex items-center justify-center gap-4 active:scale-95 group">
            ডাউনলোড কিটস <Newspaper className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  );
}
