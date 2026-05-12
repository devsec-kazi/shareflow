import { User, Store, UserCheck, ShoppingBag, Package, Heart, BookOpen, Home, Zap } from 'lucide-react';

export const CATEGORIES = [
  { id: 'grocery', name: 'মুদিপণ্য', icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'electronics', name: 'ইলেকট্রনিক্স', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'medicine', name: 'ঔষধ ও স্বাস্থ্য', icon: Package, color: 'text-red-600', bg: 'bg-red-50' },
  { id: 'cosmetics', name: 'কসমেটিকস', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-50' },
  { id: 'fashion', name: 'ফ্যাশন', icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'stationary', name: 'বই ও স্টেশনারি', icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'household', name: 'গৃহস্থালী', icon: Home, color: 'text-teal-600', bg: 'bg-teal-50' },
];

export const DEMO_SHOPS = [
  { id: 'shop1', name: 'নিউ জনতা স্টোর', owner: 'মোঃ রাকিব হাসান', location: 'মিরপুর ১০, ঢাকা', rating: 4.8, type: 'মুদি দোকান', image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=400&q=80' },
  { id: 'shop2', name: 'ভাই ভাই ট্রেডার্স', owner: 'মিলন হোসেন', location: 'উত্তরা সেক্টর ৭, ঢাকা', rating: 4.6, type: 'সুপার শপ', image: 'https://images.unsplash.com/photo-1604719312563-8912e9223c6a?w=400&q=80' },
  { id: 'shop3', name: 'রহমান ভ্যারাইটিজ', owner: 'নাঈম ইসলাম', location: 'ধানমন্ডি, ঢাকা', rating: 4.9, type: 'ড্রাগ স্টোর', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&q=80' },
  { id: 'shop4', name: 'সিটি মার্ট', owner: 'তানজিলা রহমান', location: 'বনানী, ঢাকা', rating: 4.7, type: 'ডিপার্টমেন্টাল স্টোর', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80' },
  { id: 'shop5', name: 'মা স্টোর', owner: 'আব্দুর রব', location: 'ফার্মগেট, ঢাকা', rating: 4.5, type: 'জেনারেল স্টোর', image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&q=80' },
];

export const DEMO_PRODUCTS = [
  // মুদিপণ্য
  { id: 'g1', name: 'মিনিকেট চাল ৫ কেজি', category: 'grocery', price: 527, mrp: 550, shop: 'নিউ জনতা স্টোর', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', discount: '4%' },
  { id: 'g2', name: 'মিনিকেট চাল ১০ কেজি', category: 'grocery', price: 1045, mrp: 1100, shop: 'নিউ জনতা স্টোর', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', discount: '5%' },
  { id: 'g3', name: 'সয়াবিন তেল ১ লিটার', category: 'grocery', price: 162, mrp: 180, shop: 'ভাই ভাই ট্রেডার্স', rating: 4.7, reviews: 56, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', discount: '10%' },
  { id: 'g4', name: 'সয়াবিন তেল ২ লিটার', category: 'grocery', price: 318, mrp: 350, shop: 'ভাই ভাই ট্রেডার্স', rating: 4.8, reviews: 45, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', discount: '9%' },
  { id: 'g5', name: 'মসুর ডাল ১ কেজি', category: 'grocery', price: 145, mrp: 160, shop: 'রহমান ভ্যারাইটিজ', rating: 4.6, reviews: 34, image: 'https://images.unsplash.com/photo-1585994192701-d703770415d8?w=400&q=80', discount: '9%' },
  { id: 'g6', name: 'চিনি ১ কেজি', category: 'grocery', price: 120, mrp: 130, shop: 'নিউ জনতা স্টোর', rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80', discount: '8%' },
  { id: 'g7', name: 'লবণ ১ কেজি', category: 'grocery', price: 45, mrp: 50, shop: 'মা স্টোর', rating: 4.7, reviews: 112, image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&q=80', discount: '10%' },
  { id: 'g8', name: 'চানাচুর', category: 'grocery', price: 35, mrp: 40, shop: 'মা স্টোর', rating: 4.4, reviews: 90, image: 'https://images.unsplash.com/photo-1605666804847-0ce66a1de541?w=400&q=80', discount: '12%' },
  { id: 'g9', name: 'নুডলস', category: 'grocery', price: 30, mrp: 35, shop: 'সিটি মার্ট', rating: 4.3, reviews: 156, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', discount: '14%' },
  { id: 'g10', name: 'বিস্কুট (প্যাক)', category: 'grocery', price: 50, mrp: 60, shop: 'সিটি মার্ট', rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1558961313-2895521406f0?w=400&q=80', discount: '16%' },
  { id: 'g11', name: 'দুধ পাউডার', category: 'grocery', price: 290, mrp: 320, shop: 'রহমান ভ্যারাইটিজ', rating: 4.8, reviews: 67, image: 'https://images.unsplash.com/photo-1550583724-125581fe2f83?w=400&q=80', discount: '9%' },
  { id: 'g12', name: 'আটা ২ কেজি', category: 'grocery', price: 135, mrp: 150, shop: 'নিউ জনতা স্টোর', rating: 4.7, reviews: 54, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', discount: '10%' },
  
  // ইলেকট্রনিক্স
  { id: 'e1', name: 'মোবাইল চার্জার', category: 'electronics', price: 322, mrp: 450, shop: 'সিটি মার্ট', rating: 4.5, reviews: 230, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80', discount: '28%' },
  { id: 'e2', name: 'ফাস্ট চার্জার', category: 'electronics', price: 580, mrp: 750, shop: 'সিটি মার্ট', rating: 4.8, reviews: 145, image: 'https://images.unsplash.com/photo-1625514523024-67a928175d1f?w=400&q=80', discount: '22%' },
  { id: 'e3', name: 'ইউএসবি ক্যাবল', category: 'electronics', price: 150, mrp: 250, shop: 'সিটি মার্ট', rating: 4.4, reviews: 320, image: 'https://images.unsplash.com/photo-1611082216373-7c0062bc4665?w=400&q=80', discount: '40%' },
  { id: 'e4', name: 'টাইপ-সি ক্যাবল', category: 'electronics', price: 190, mrp: 300, shop: 'রহমান ভ্যারাইটিজ', rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1611082216373-7c0062bc4665?w=400&q=80', discount: '36%' },
  { id: 'e5', name: 'ইয়ারফোন', category: 'electronics', price: 499, mrp: 799, shop: 'সিটি মার্ট', rating: 4.5, reviews: 560, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', discount: '37%' },
  { id: 'e6', name: 'ব্লুটুথ ইয়ারফোন', category: 'electronics', price: 850, mrp: 1200, shop: 'রহমান ভ্যারাইটিজ', rating: 4.7, reviews: 120, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80', discount: '29%' },
  { id: 'e7', name: 'পাওয়ার ব্যাংক ১০০০০ mAh', category: 'electronics', price: 1490, mrp: 1999, shop: 'সিটি মার্ট', rating: 4.9, reviews: 340, image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&q=80', discount: '25%' },
  { id: 'e8', name: 'মাল্টিপ্লাগ', category: 'electronics', price: 480, mrp: 650, shop: 'ভাই ভাই ট্রেডার্স', rating: 4.6, reviews: 56, image: 'https://images.unsplash.com/photo-1618146747167-27e1f40d7eba?w=400&q=80', discount: '26%' },
  { id: 'e9', name: 'মোবাইল স্ট্যান্ড', category: 'electronics', price: 180, mrp: 350, shop: 'রহমান ভ্যারাইটিজ', rating: 4.3, reviews: 78, image: 'https://images.unsplash.com/photo-1616440242371-19d290ca8595?w=400&q=80', discount: '48%' },

  // ঔষধ ও স্বাস্থ্য
  { id: 'm1', name: 'প্যারাসিটামল ৫০০ মি.গ্রা', category: 'medicine', price: 16, mrp: 20, shop: 'রহমান ভ্যারাইটিজ', rating: 4.9, reviews: 450, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', discount: '20%' },
  { id: 'm2', name: 'স্যালাইন', category: 'medicine', price: 25, mrp: 30, shop: 'রহমান ভ্যারাইটিজ', rating: 4.7, reviews: 670, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80', discount: '16%' },
  { id: 'm3', name: 'ব্যান্ডেজ', category: 'medicine', price: 45, mrp: 60, shop: 'সিটি মার্ট', rating: 4.8, reviews: 34, image: 'https://images.unsplash.com/photo-1626415250912-fdf49293b6e8?w=400&q=80', discount: '25%' },
  { id: 'm4', name: 'গ্লুকোজ', category: 'medicine', price: 85, mrp: 110, shop: 'ভাই ভাই ট্রেডার্স', rating: 4.6, reviews: 120, image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&q=80', discount: '22%' },
  { id: 'm5', name: 'হ্যান্ড স্যানিটাইজার', category: 'medicine', price: 120, mrp: 180, shop: 'সিটি মার্ট', rating: 4.7, reviews: 230, image: 'https://images.unsplash.com/photo-1584032762282-ec4f198a424b?w=400&q=80', discount: '33%' },
  { id: 'm6', name: 'মাস্ক (প্যাক)', category: 'medicine', price: 90, mrp: 150, shop: 'রহমান ভ্যারাইটিজ', rating: 4.5, reviews: 890, image: 'https://images.unsplash.com/photo-1586942229167-0c1537233ae5?w=400&q=80', discount: '40%' },

  // কসমেটিকস
  { id: 'c1', name: 'ফেসওয়াশ', category: 'cosmetics', price: 246, mrp: 350, shop: 'সিটি মার্ট', rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1556228578-8c7c2f90117b?w=400&q=80', discount: '29%' },
  { id: 'c2', name: 'শ্যাম্পু ৪০০ মি.লি', category: 'cosmetics', price: 280, mrp: 420, shop: 'সিটি মার্ট', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1535585209827-a15fefbcef6a?w=400&q=80', discount: '33%' },
  { id: 'c3', name: 'সাবান', category: 'cosmetics', price: 60, mrp: 85, shop: 'মা স্টোর', rating: 4.5, reviews: 230, image: 'https://images.unsplash.com/photo-1605264964528-06403738d6dc?w=400&q=80', discount: '29%' },
  { id: 'c4', name: 'বডি স্প্রে', category: 'cosmetics', price: 220, mrp: 380, shop: 'সিটি মার্ট', rating: 4.4, reviews: 120, image: 'https://images.unsplash.com/photo-1583467472621-e0066ba6f582?w=400&q=80', discount: '42%' },
  { id: 'c5', name: 'হেয়ার অয়েল', category: 'cosmetics', price: 175, mrp: 250, shop: 'ভাই ভাই ট্রেডার্স', rating: 4.6, reviews: 56, image: 'https://images.unsplash.com/photo-1626462719129-847385934509?w=400&q=80', discount: '30%' },
  { id: 'c6', name: 'টুথপেস্ট', category: 'cosmetics', price: 95, mrp: 130, shop: 'রহমান ভ্যারাইটিজ', rating: 4.8, reviews: 450, image: 'https://images.unsplash.com/photo-1559591937-e620a9a46377?w=400&q=80', discount: '27%' },

  // ফ্যাশন
  { id: 'f1', name: 'কটন শার্ট', category: 'fashion', price: 697, mrp: 1050, shop: 'সিটি মার্ট', rating: 4.5, reviews: 34, image: 'https://images.unsplash.com/photo-1596755094514-f87034a26cc1?w=400&q=80', discount: '33%' },
  { id: 'f2', name: 'টি-শার্ট', category: 'fashion', price: 390, mrp: 650, shop: 'সিটি মার্ট', rating: 4.7, reviews: 120, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', discount: '40%' },
  { id: 'f3', name: 'পাঞ্জাবি', category: 'fashion', price: 890, mrp: 1800, shop: 'সিটি মার্ট', rating: 4.8, reviews: 56, image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=400&q=80', discount: '50%' },
  { id: 'f4', name: 'জিন্স প্যান্ট', category: 'fashion', price: 1150, mrp: 2200, shop: 'সিটি মার্ট', rating: 4.6, reviews: 78, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', discount: '47%' },
  { id: 'f5', name: 'স্যান্ডেল', category: 'fashion', price: 680, mrp: 1200, shop: 'সিটি মার্ট', rating: 4.4, reviews: 23, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80', discount: '43%' },
  { id: 'f6', name: 'ক্যাপ', category: 'fashion', price: 190, mrp: 350, shop: 'রহমান ভ্যারাইটিজ', rating: 4.3, reviews: 12, image: 'https://images.unsplash.com/photo-1588850567047-3f27541bdd22?w=400&q=80', discount: '45%' },

  // বই ও স্টেশনারি
  { id: 's1', name: 'খাতা', category: 'stationary', price: 45, mrp: 60, shop: 'মা স্টোর', rating: 4.5, reviews: 230, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80', discount: '25%' },
  { id: 's2', name: 'কলম', category: 'stationary', price: 20, mrp: 25, shop: 'মা স্টোর', rating: 4.7, reviews: 560, image: 'https://images.unsplash.com/photo-1585336139118-132f70e4a7dd?w=400&q=80', discount: '20%' },
  { id: 's3', name: 'ফাইল ফোল্ডার', category: 'stationary', price: 75, mrp: 120, shop: 'সিটি মার্ট', rating: 4.4, reviews: 45, image: 'https://images.unsplash.com/photo-1591123109677-22d2b52780ce?w=400&q=80', discount: '37%' },
  { id: 's4', name: 'ক্যালকুলেটর', category: 'stationary', price: 380, mrp: 650, shop: 'সিটি মার্ট', rating: 4.8, reviews: 34, image: 'https://images.unsplash.com/photo-1574607383476-f517f220d398?w=400&q=80', discount: '41%' },
  { id: 's5', name: 'পেন্সিল বক্স', category: 'stationary', price: 110, mrp: 180, shop: 'সিটি মার্ট', rating: 4.5, reviews: 56, image: 'https://images.unsplash.com/photo-1510674485131-dc88d9834fe7?w=400&q=80', discount: '38%' },

  // গৃহস্থালী
  { id: 'h1', name: 'ডিটারজেন্ট পাউডার', category: 'household', price: 90, mrp: 120, shop: 'মা স্টোর', rating: 4.6, reviews: 230, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80', discount: '25%' },
  { id: 'h2', name: 'টিস্যু বক্স', category: 'household', price: 75, mrp: 95, shop: 'সিটি মার্ট', rating: 4.7, reviews: 450, image: 'https://images.unsplash.com/photo-1610485230005-97f39446960d?w=400&q=80', discount: '21%' },
  { id: 'h3', name: 'মগ', category: 'household', price: 120, mrp: 180, shop: 'মা স্টোর', rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fbed20?w=400&q=80', discount: '33%' },
  { id: 'h4', name: 'প্লাস্টিক কন্টেইনার', category: 'household', price: 160, mrp: 250, shop: 'সিটি মার্ট', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1530982299561-4ada1303ba67?w=400&q=80', discount: '36%' },
  { id: 'h5', name: 'ঝাড়ু', category: 'household', price: 140, mrp: 200, shop: 'সিটি মার্ট', rating: 4.3, reviews: 120, image: 'https://images.unsplash.com/photo-1585350849465-3035312726ed?w=400&q=80', discount: '30%' },
];

export const DEMO_AGENTS = [
  { id: 'agent1', name: 'রহমান এজেন্সি', location: 'মিরপুর ঢাকা', phone: '০১৭০০-০০০০০০', rating: 4.9 },
  { id: 'agent2', name: 'মেসার্স আলম ট্রেডার্স', location: 'গাজীপুর', phone: '০১৮০০-০০০০০০', rating: 4.7 },
];

export const DEMO_TRANSACTIONS = [
  { id: 'TXN-০০১', type: 'credit', amount: 5000, date: '১০ মে, ২০২৪', method: 'বিকাশ', status: 'সফল', description: 'ক্যাশ ইন' },
  { id: 'TXN-০০২', type: 'debit', amount: 1200, date: '০৯ মে, ২০২৪', method: 'ওয়ালেট', status: 'সফল', description: 'পেমেন্ট: সিটি মার্ট' },
  { id: 'TXN-০০৩', type: 'debit', amount: 2000, date: '০৮ মে, ২০২৪', method: 'নগদ', status: 'প্রক্রিয়াধীন', description: 'ক্যাশ আউট' },
];
