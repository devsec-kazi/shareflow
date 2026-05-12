import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Order } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import jsPDF from 'jspdf';

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  const { user } = useAuth();

  if (!order) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ShareFlow Official Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Invoice No: ${order.id}`, 20, 35);
    doc.text(`Date: ${order.date}`, 20, 45);
    doc.text(`Customer Name: ${user?.name}`, 20, 55);
    doc.text(`Customer Email: ${user?.email}`, 20, 65);
    doc.text(`--------------------------------------------------`, 20, 75);
    
    let y = 85;
    order.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} x ${item.quantity}`, 20, y);
      doc.text(`BDT ${item.price * item.quantity}`, 160, y, { align: 'right' });
      y += 10;
    });
    
    doc.text(`--------------------------------------------------`, 20, y);
    y += 10;
    doc.text(`Subtotal:`, 20, y);
    doc.text(`BDT ${order.subtotal}`, 160, y, { align: 'right' });
    y += 10;
    doc.text(`Delivery Fee:`, 20, y);
    doc.text(`BDT ${order.deliveryFee}`, 160, y, { align: 'right' });
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total Amount:`, 20, y);
    doc.text(`BDT ${order.total}`, 160, y, { align: 'right' });
    
    doc.save(`Invoice_${order.id}.pdf`);
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[50px] w-full max-w-3xl overflow-hidden shadow-2xl relative z-[210] flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Invoice Sidebar Info */}
            <div className="md:w-72 bg-gray-900 p-10 text-white flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-primary-green rounded-[25px] flex items-center justify-center mb-8 shadow-xl shadow-green-500/20">
                  <CheckCircle2 size={40} />
               </div>
               <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">অর্ডার কনফার্মড</h3>
               <p className="text-gray-500 text-xs font-bold leading-relaxed mb-10 px-4">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে এবং প্রসেসিং শুরু হয়েছে।</p>
               
               <div className="w-full space-y-4 mt-auto">
                  <button onClick={downloadPDF} className="w-full py-4 bg-white/10 hover:bg-primary-green rounded-2xl flex items-center justify-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest group">
                    <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> ডাউনলোড করুন
                  </button>
                  <button onClick={printInvoice} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest">
                    <Printer size={16} /> প্রিন্ট রিসিট
                  </button>
               </div>
            </div>

            {/* Main Invoice Content */}
            <div className="flex-1 p-10 md:p-14 overflow-y-auto custom-scrollbar">
               <div className="flex justify-between items-start mb-12">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">ইনভয়েস রিসিট</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID: {order.id}</p>
                  </div>
                  <button onClick={onClose} className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:text-red-500 transition-all">
                     <X size={20} />
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">ক্রেতার তথ্য</p>
                    <p className="text-sm font-black text-gray-900 leading-tight mb-1">{user?.name}</p>
                    <p className="text-[10px] font-bold text-gray-400">{user?.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">তারিখ ও সময়</p>
                    <p className="text-sm font-black text-gray-900 leading-tight mb-1">{order.date}</p>
                    <p className="text-[10px] font-bold text-gray-400">০৫:২০ পিএম</p>
                  </div>
               </div>

               <div className="space-y-6 mb-12">
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-6">পণ্যের তালিকা</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary-green group-hover:scale-110 transition-transform">
                             <ShoppingBag size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-900 group-hover:text-primary-green transition-colors leading-none mb-1">{item.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                       </div>
                       <p className="font-black text-gray-900 tracking-tighter text-sm">৳{item.price * item.quantity}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-8 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <span>পণ্যের মোট মূল্য</span>
                     <span className="text-gray-900 uppercase">৳{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <span>ডেলিভারি চার্জ</span>
                     <span className="text-gray-900 uppercase">{order.deliveryFee === 0 ? "ফ্রি" : `৳${order.deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between items-center pt-8">
                     <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">সর্বমোটpayable</span>
                     <span className="text-3xl font-black text-primary-green tracking-tighter">৳{order.total}</span>
                  </div>
               </div>

               <div className="mt-12 p-8 bg-green-50 rounded-[30px] border border-green-100 flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm">
                     <CheckCircle2 size={24} />
                  </div>
                  <p className="text-[10px] font-bold text-primary-green-dark leading-relaxed italic uppercase">শেয়ারফ্লোর সাথে কেনাকাটা করার জন্য ধন্যবাদ। আপনার পণ্যটি খুব শীঘ্রই পৌঁছে যাবে।</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
