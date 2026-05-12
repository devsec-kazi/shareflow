export const CATEGORIES = [
  { id: 'groceries', name: 'মুদি বাজার', icon: 'ShoppingBasket', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'medicine', name: 'ঔষধ ও স্বাস্থ্য', icon: 'Pill', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'electronics', name: 'ইলেকট্রনিক্স', icon: 'Smartphone', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'accessories', name: 'মোবাইল এক্সেসরিজ', icon: 'Headphones', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'cosmetics', name: 'রূপচর্চা', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'beverages', name: 'পানীয়', icon: 'Coffee', image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'household', name: 'গৃহস্থালী', icon: 'Home', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'fashion', name: 'ফ্যাশন', icon: 'Shirt', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200&h=200' },
  { id: 'stationery', name: 'স্টেশনারি', icon: 'PenTool', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=200&h=200' },
];

export const DEMO_PRODUCTS = [
  { id: 'p1', name: 'প্রিমিয়াম মিনিকেট চাল', category: 'মুদি বাজার', mrp: 85.00, discountPrice: 78.00, purchasePrice: 70.00, quantity: 450, unit: 'কেজি', sku: 'GRO-RIC-001', status: 'available', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200', shopName: 'নিউ জনতা স্টোর' },
  { id: 'p2', name: 'পিওর সয়াবিন তেল - ৫ লিটার', category: 'মুদি বাজার', mrp: 850.00, discountPrice: 820.00, purchasePrice: 780.00, quantity: 120, unit: 'লিটার', sku: 'GRO-OIL-002', status: 'available', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=200', shopName: 'মা স্টোর' },
  { id: 'p3', name: 'নয়েজ বাডস ভিএস১০২', category: 'মোবাইল এক্সেসরিজ', mrp: 2500.00, discountPrice: 1850.00, purchasePrice: 1400.00, quantity: 8, unit: 'পিস', sku: 'ACC-EAR-003', status: 'available', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200', shopName: 'সিটি মার্ট' },
  { id: 'p4', name: 'ফাস্ট চার্জার ৬৫ ওয়াট', category: 'মোবাইল এক্সেসরিজ', mrp: 1200.00, discountPrice: 950.00, purchasePrice: 700.00, quantity: 2, unit: 'পিস', sku: 'ACC-CHA-004', status: 'low_stock', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=200', shopName: 'ভাই ভাই ট্রেডার্স' },
  { id: 'p5', name: 'প্যারাসিটামল ৫০০ মি.গ্রা.', category: 'ঔষধ ও স্বাস্থ্য', mrp: 15.00, discountPrice: 12.00, purchasePrice: 8.00, quantity: 1000, unit: 'পাতা', sku: 'MED-PAR-005', status: 'available', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200', shopName: 'রহমান ফার্মেসি' },
];

export const DEMO_TRANSACTIONS = [
  { id: 'TX-9901', userId: 'demo_user', type: 'credit', amount: 5000.00, status: 'সফল', date: '২০২৪-০৫-০৭', description: 'ওয়ালেট টপ-আপ' },
  { id: 'TX-9902', userId: 'demo_user', type: 'debit', amount: 1250.50, status: 'সফল', date: '২০২৪-০৫-০৬', description: 'কেনাকাটা' },
  { id: 'TX-9903', userId: 'demo_user', type: 'credit', amount: 150.00, status: 'সফল', date: '২০২৪-০৫-০৫', description: 'রেফারেল বোনাস' },
];

export const DEMO_USERS = {
  admin: { uid: 'admin_demo', email: 'admin@shareflow.demo', displayName: 'মোঃ রাকিব হাসান (অ্যাডমিন)', role: 'admin', verificationStatus: 'approved', walletBalance: 254500.00 },
  customer: { uid: 'cust_demo', email: 'customer@shareflow.demo', displayName: 'সুমাইয়া আক্তার', role: 'customer', verificationStatus: 'approved', walletBalance: 8500.50 },
  agent: { uid: 'agent_demo', email: 'agent@shareflow.demo', displayName: 'রফিক এন্টারপ্রাইজ', role: 'agent', verificationStatus: 'pending', walletBalance: 52000.00 },
  shop: { uid: 'shop_demo', email: 'shop@shareflow.demo', displayName: 'সিটি মার্ট (দোকান মালিক)', role: 'shop_owner', verificationStatus: 'approved', walletBalance: 12400.75 },
};
