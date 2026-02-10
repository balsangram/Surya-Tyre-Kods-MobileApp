import React, { useState, useEffect } from 'react';
import {
  Search, ShoppingBag, User, Home, MapPin, ChevronLeft,
  Filter, Star, Plus, Minus, Truck, Settings, X, CheckCircle,
  Menu, ArrowRight, ShieldCheck, Phone, CreditCard, Banknote, Landmark,
  Wallet, LogOut, Package, HelpCircle, ChevronRight, Car, Edit3, FileText,
  Download, Loader, MessageCircle, Navigation, Info, AlertCircle, Clock, Wrench, Zap,
  Signal, Wifi, UploadCloud, Camera, Video, File
} from 'lucide-react';

// --- FONTS & STYLES ---
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap');
    
    .font-heading { font-family: 'Oswald', sans-serif; }
    .font-body { font-family: 'Open Sans', sans-serif; }
    
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    .animate-spin-slow { animation: spin 8s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .marquee-container { overflow: hidden; white-space: nowrap; }
    .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `}</style>
);

// --- MOCK DATA ---
const BANNERS = [
  { id: 1, title: "MONSOON READY", sub: "UNBEATABLE GRIP ON WET ROADS", bg: "bg-black", text: "text-white", accent: "text-red-600" },
  { id: 2, title: "CEAT SECURA DRIVE", sub: "DESIGNED FOR INDIAN ROADS", bg: "bg-red-700", text: "text-white", accent: "text-black" },
  { id: 3, title: "FREE ALIGNMENT", sub: "WITH EVERY 4 TYRE PURCHASE", bg: "bg-zinc-800", text: "text-white", accent: "text-yellow-400" },
];

const TYRES = [
  {
    id: 101, brand: "MRF", model: "Perfinza CLX1", size: "205/65 R16", price: 8500, mrp: 9800, rating: 4.8, reviews: 215, stock: 4,
    features: ["Fuel Efficient", "Wet Grip", "Low Noise"], vehicle: "Innova, Creta",
    image: "https://cdn.pixabay.com/photo/2020/01/31/07/13/tire-4807271_1280.jpg", emi: "1,417"
  },
  {
    id: 102, brand: "APOLLO", model: "Apterra AT2", size: "215/65 R16", price: 7200, mrp: 8100, rating: 4.6, reviews: 180, stock: 12,
    features: ["All Terrain", "Long Tread Life", "Durability"], vehicle: "Duster, Scorpio",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HG/EU/OW/83652467/apollo-jcb-tyre-1000x1000.jpg", emi: "1,200"
  },
  {
    id: 103, brand: "BRIDGESTONE", model: "Sturdo", size: "195/55 R16", price: 6800, mrp: 7500, rating: 4.7, reviews: 340, stock: 8,
    features: ["Long Life", "Road Hazard Warranty", "Fuel Efficient"], vehicle: "i20, Baleno",
    image: "https://cdn.pixabay.com/photo/2020/01/31/07/13/tire-4807271_1280.jpg", emi: "1,133"
  },
  {
    id: 104, brand: "MICHELIN", model: "Primacy 4 ST", size: "195/65 R15", price: 9100, mrp: 9900, rating: 4.9, reviews: 110, stock: 2,
    features: ["Silent Ride", "Max Safety", "Premium"], vehicle: "City, Verna",
    image: "https://m.media-amazon.com/images/I/71aUR3UmBlL._SL1500_.jpg", emi: "1,517"
  },
  {
    id: 105, brand: "CEAT", model: "SecuraDrive", size: "185/65 R15", price: 5500, mrp: 6200, rating: 4.5, reviews: 95, stock: 6,
    features: ["Control", "Stability", "Comfort"], vehicle: "Swift, i10",
    image: "https://cdn.pixabay.com/photo/2020/01/31/07/13/tire-4807271_1280.jpg", emi: "917"
  },
  {
    id: 106, brand: "JK TYRE", model: "UX Royale", size: "195/55 R16", price: 4800, mrp: 5500, rating: 4.2, reviews: 150, stock: 10,
    features: ["Value for Money", "Durable", "City Drive"], vehicle: "Polo, Fabia",
    image: "https://m.media-amazon.com/images/I/71aUR3UmBlL._SL1500_.jpg", emi: "800"
  },
  {
    id: 201, brand: "CEAT", model: "FuelSmarrt", size: "165/70 R14", price: 3200, mrp: 3800, rating: 4.3, reviews: 120, stock: 20,
    features: ["Budget Friendly", "Fuel Efficient", "City Drive"], vehicle: "Maruti Alto, Wagon R",
    image: "https://m.media-amazon.com/images/I/71aUR3UmBlL._SL1500_.jpg", emi: "533"
  },
  {
    id: 202, brand: "CEAT", model: "Milaze X5", size: "195/55 R16", price: 5800, mrp: 6500, rating: 4.5, reviews: 310, stock: 15,
    features: ["Long Life", "Durable", "Balanced Grip"], vehicle: "Baleno, i20, Ciaz",
    image: "http://rukmini1.flixcart.com/image/300/300/xif0q/vehicle-tire/f/g/q/t-milaze-x5-145-80r12-800-1-tube-type-ceat-original-imah2urc3prvgp7d.jpeg", emi: "966"
  },
  {
    id: 203, brand: "CEAT", model: "Gripp LN", size: "205/65 R15", price: 6200, mrp: 6900, rating: 4.4, reviews: 85, stock: 8,
    features: ["Low Noise", "Comfort", "Wet Grip"], vehicle: "Swift Dzire, Honda City, Verna",
    image: "https://cdn.pixabay.com/photo/2020/01/31/07/13/tire-4807271_1280.jpg", emi: "1,033"
  },
  {
    id: 204, brand: "CEAT", model: "SportDrive SUV", size: "255/55 R19", price: 18500, mrp: 21000, rating: 4.9, reviews: 40, stock: 2,
    features: ["Performance Handling", "High Speed Stability", "Premium SUV"], vehicle: "Fortuner, Endeavour, XUV700",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HG/EU/OW/83652467/apollo-jcb-tyre-1000x1000.jpg", emi: "3,083"
  },
  {
    id: 205, brand: "CEAT", model: "CrossDrive AT", size: "285/60 R18", price: 14500, mrp: 16000, rating: 4.7, reviews: 25, stock: 4,
    features: ["All Terrain", "Off-Road Ready", "Robust"], vehicle: "Land Cruiser, Thar",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/2/HG/EU/OW/83652467/apollo-jcb-tyre-1000x1000.jpg", emi: "2,416"
  },
  {
    id: 301, brand: "JK TYRE", model: "Ultima Neo", size: "145/80 R13", price: 2600, mrp: 3100, rating: 4.1, reviews: 400, stock: 25,
    features: ["Very Affordable", "Standard Grip", "Entry Level"], vehicle: "Alto, Santro, Kwid",
    image: "http://rukmini1.flixcart.com/image/300/300/xif0q/vehicle-tire/f/g/q/t-milaze-x5-145-80r12-800-1-tube-type-ceat-original-imah2urc3prvgp7d.jpeg", emi: "433"
  },
  {
    id: 302, brand: "JK TYRE", model: "Taximax", size: "165/80 R14", price: 3400, mrp: 3900, rating: 4.0, reviews: 550, stock: 30,
    features: ["High Durability", "Taxi Special", "Rough Road"], vehicle: "Dzire Tour, Etios",
    image: "https://m.media-amazon.com/images/I/71aUR3UmBlL._SL1500_.jpg", emi: "566"
  }
];

// --- PHONE FRAME COMPONENT (Realistic iPhone 17) ---
const PhoneFrame = ({ children }) => (
  <div className="w-full h-screen bg-white flex justify-center items-center font-body antialiased text-gray-900 p-4 sm:p-0">
    <FontStyles />
    {/* Frame with realistic borders and shadow */}
    <div className="w-[393px] h-[852px] bg-white relative overflow-hidden shadow-[0_0_0_12px_#111,0_0_0_16px_#666,0_30px_60px_rgba(0,0,0,0.5)] rounded-[50px]">

      {/* STATUS BAR & DYNAMIC ISLAND */}
      <div className="absolute top-0 w-full h-[54px] flex justify-between px-9 items-end pb-3 z-[100] text-black select-none pointer-events-none">
        {/* Time */}
        <span className="font-semibold text-[15px] leading-none">9:41</span>

        {/* Dynamic Island */}
        <div className="absolute top-[11px] left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-[101] flex items-center justify-end px-4">
          <div className="w-2 h-2 rounded-full bg-[#333] shadow-inner opacity-60"></div>
        </div>

        {/* Status Icons */}
        <div className="flex gap-1.5 items-center">
          <Signal size={16} strokeWidth={2.5} className="text-black" />
          <Wifi size={16} strokeWidth={2.5} className="text-black" />
          {/* Custom Battery Icon */}
          <div className="relative w-[24px] h-[12px] border-[1.5px] border-black rounded-[3px] opacity-90 p-[1.5px]">
            <div className="h-full w-[70%] bg-black rounded-[1px]"></div>
            <div className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-[2px] h-[4px] bg-black rounded-r-[1px]"></div>
          </div>
        </div>
      </div>

      {/* SCREEN CONTENT */}
      <div className="h-full w-full overflow-hidden bg-white relative">
        {children}
      </div>

      {/* HOME INDICATOR */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-[100] pointer-events-none opacity-90"></div>
    </div>
  </div>
);

// --- SCREENS ---

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-heading text-white">
      <div className="flex flex-col items-center z-10 animate-fade-in-up">

        {/* Custom Tyre Logo with 'S' */}
        <div className="w-28 h-28 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(220,38,38,0.3)] border-[6px] border-zinc-800 border-dashed relative">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center border-4 border-black">
            <span className="text-4xl font-bold italic text-white">S</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tighter mb-1 text-center uppercase italic">SURYA TYRES</h1>
        <p className="text-red-600 text-sm tracking-[0.2em] uppercase font-bold">Trading Co.</p>
        <div className="mt-8 flex gap-2 items-center text-xs font-medium bg-neutral-900 px-4 py-1 border border-neutral-800">
          <MapPin size={12} className="text-red-600" /> TUMKUR
        </div>
      </div>
    </div>
  );
};

const AuthScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleVerify = () => {
    if (otp.join('').length === 4) onLogin();
  };

  return (
    <div className="h-full w-full bg-white px-6 flex flex-col font-body pt-32 animate-fade-in-up">
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-black uppercase italic">Welcome Back</h2>
        <p className="text-neutral-500 text-sm mt-1">Login to access exclusive dealer prices.</p>
        <div className="w-12 h-1 bg-red-600 mt-4"></div>
      </div>

      {step === 'phone' ? (
        <div className="space-y-6 flex-1">
          <div className="border-b-2 border-black py-2 flex items-center">
            <span className="text-black font-bold mr-3 text-lg">+91</span>
            <input
              type="tel"
              className="bg-transparent w-full text-lg font-medium text-black outline-none placeholder-gray-400"
              placeholder="Mobile Number"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6 flex-1">
          <p className="text-sm text-gray-500 mb-4">Enter the code sent to +91 {phone}</p>
          <div className="flex gap-4">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="tel"
                maxLength={1}
                className="w-12 h-14 border border-gray-300 text-center text-2xl font-heading font-bold text-black focus:border-red-600 focus:ring-0 outline-none transition-all"
                value={d}
                onChange={(e) => {
                  const val = e.target.value;
                  const newOtp = [...otp];
                  newOtp[i] = val;
                  setOtp(newOtp);
                  if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="pb-10">
        <button
          onClick={step === 'phone' ? () => setStep('otp') : handleVerify}
          disabled={step === 'phone' ? phone.length !== 10 : otp.join('').length !== 4}
          className={`w-full py-4 font-heading font-bold text-lg uppercase tracking-wider transition-all ${(step === 'phone' ? phone.length === 10 : otp.join('').length === 4)
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-neutral-200 text-neutral-400'
            }`}
        >
          {step === 'phone' ? "Next" : "Login"}
        </button>
      </div>
    </div>
  );
};

// --- APP CONTENT ---

const HomeScreen = ({ navigate }) => {
  return (
    <div className="pb-24 font-body h-full overflow-y-auto hide-scrollbar bg-white animate-fade-in-up">
      {/* Dealer Header */}
      <div className="bg-white border-b border-gray-200 pt-[60px] pb-0 sticky top-0 z-30">
        <div className="px-5 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading font-bold text-black uppercase italic leading-none">
              Surya Tyres<br /><span className="text-red-600">Trading Co.</span>
            </h1>
          </div>
          <div onClick={() => navigate('profile')} className="w-10 h-10 bg-black text-white flex items-center justify-center cursor-pointer">
            <User size={20} />
          </div>
        </div>

        {/* Search Bar - Squared & Clean */}
        <div className="px-5 pb-4">
          <div
            onClick={() => navigate('search')}
            className="h-10 bg-gray-100 flex items-center px-4 gap-3 text-gray-500 border border-gray-200"
          >
            <Search size={16} />
            <span className="font-medium text-xs uppercase tracking-wide">Find Your Tyre...</span>
          </div>
        </div>
      </div>

      {/* Marquee - Black & Yellow */}
      <div className="bg-black text-yellow-400 py-2 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content text-xs font-bold font-heading tracking-widest uppercase">
            // MONSOON SALE: UP TO 20% OFF ON PREMIUM TYRES // FREE ALIGNMENT ON PURCHASE OF 4 TYRES // AUTHORIZED DEALER // CALL FOR BULK ORDERS //
          </div>
        </div>
      </div>

      {/* Hero Banners */}
      <div className="mt-0">
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory">
          {BANNERS.map(b => (
            <div key={b.id} className={`min-w-full h-64 ${b.bg} flex flex-col justify-center items-center relative text-center px-8 snap-center`}>
              <h3 className={`text-4xl font-heading font-bold italic leading-none ${b.text}`}>{b.title}</h3>
              <p className={`text-sm font-bold mt-2 uppercase tracking-widest ${b.accent}`}>{b.sub}</p>
              <button className="mt-6 border-2 border-white px-6 py-2 text-white text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors">
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid - Clean & Technical */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
          <h3 className="text-xl font-heading font-bold text-black uppercase italic">Tyre Catalogue</h3>
          <span className="text-xs font-bold text-red-600 uppercase">View All</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {TYRES.map((tyre) => (
            <div
              key={tyre.id}
              onClick={() => navigate('details', tyre)}
              className="bg-white border border-gray-200 p-0 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="bg-white h-32 flex items-center justify-center p-4 relative border-b border-gray-100 overflow-hidden">
                {/* Highlight Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent)]"></div>
                <img src={tyre.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10" alt={tyre.model} />
                {tyre.brand === 'MRF' && <span className="absolute top-2 left-2 bg-black text-white text-[8px] px-1 font-bold uppercase">Best Seller</span>}
              </div>
              <div className="p-3">
                <p className="text-[10px] font-bold text-gray-500 uppercase">{tyre.brand}</p>
                <h4 className="font-heading font-bold text-sm text-black leading-tight line-clamp-1">{tyre.model}</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium">{tyre.size}</p>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="font-heading font-bold text-lg text-red-600">₹{tyre.price}</span>
                  <div className="w-6 h-6 bg-black flex items-center justify-center text-white">
                    <Plus size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileScreen = ({ navigate, onLogout }) => (
  <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
    {/* Profile Header - Now White */}
    <div className="px-6 pt-[64px] pb-8 bg-white text-black rounded-b-sm shadow-md z-10 border-b border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <button onClick={() => navigate('home')} className="text-black"><ChevronLeft size={24} /></button>
        <h2 className="text-2xl font-heading font-bold uppercase italic">Account</h2>
        <button onClick={onLogout} className="text-red-500 hover:text-red-400 transition-colors">
          <LogOut size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-black font-heading font-bold text-2xl border-2 border-red-600">
          SY
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-xl uppercase">Surya User</h3>
          <p className="text-sm text-gray-600">+91 98765 43210</p>
        </div>
        <button className="text-sm text-red-500 font-bold uppercase underline">Edit</button>
      </div>
    </div>

    {/* Menu Items */}
    <div className="flex-1 overflow-y-auto px-0 py-4">
      {[
        { icon: MapPin, label: "Saved Addresses", sub: "Manage delivery locations", action: () => navigate('saved-addresses') },
        { icon: Package, label: "My Orders", sub: "Track active & past orders", action: () => navigate('orders') },
        { icon: ShieldCheck, label: "Warranty Claim", sub: "Register Complaint & Upload Proof", action: () => navigate('warranty') },
        { icon: Info, label: "About Us", sub: "Our Story", action: () => navigate('about') },
        { icon: FileText, label: "Terms & Conditions", sub: "Legal", action: () => navigate('terms') },
      ].map((item, idx) => (
        <div key={idx} onClick={item.action} className="px-6 py-5 border-b border-gray-100 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer">
          <item.icon size={20} className="text-black" />
          <div className="flex-1">
            <p className="font-heading font-bold text-black uppercase text-sm">{item.label}</p>
            <p className="text-xs text-gray-500">{item.sub}</p>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
      ))}
    </div>
  </div>
);

const WarrantyClaimScreen = ({ navigate }) => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="h-full bg-white flex flex-col font-body animate-fade-in-up items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <ShieldCheck size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-black uppercase italic mb-2">Claim Submitted</h2>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
          Your warranty claim has been received. Our Super Admin will verify the documents and contact you shortly.
        </p>
        <button onClick={() => navigate('profile')} className="w-full bg-black text-white py-4 font-heading font-bold text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors">
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
      <div className="px-6 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10 pt-[60px] bg-white">
        <button onClick={() => navigate('profile')} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
        <span className="font-heading font-bold text-xl uppercase italic ml-2">Warranty Claim</span>
      </div>
      <div className="p-6 overflow-y-auto">
        <p className="text-sm text-gray-500 mb-6">Upload proof of purchase and damage to initiate a warranty claim.</p>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-black mb-2">Order ID / Invoice No.</label>
            <input type="text" placeholder="#SURYA-XXXX" className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-red-600 font-heading" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-black mb-2">Issue Description</label>
            <textarea placeholder="Describe the defect..." className="w-full border-2 border-gray-200 p-3 rounded-none outline-none focus:border-black text-sm h-24"></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors">
              <Camera size={24} className="text-gray-400 mb-2" />
              <span className="text-[10px] font-bold uppercase text-gray-500">Upload Photo</span>
            </div>
            <div className="border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors">
              <Video size={24} className="text-gray-400 mb-2" />
              <span className="text-[10px] font-bold uppercase text-gray-500">Upload Video</span>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors">
            <FileText size={24} className="text-gray-400 mb-2" />
            <span className="text-[10px] font-bold uppercase text-gray-500">Upload Bill / Invoice</span>
          </div>
        </div>

        <button onClick={() => setSubmitted(true)} className="w-full bg-red-600 text-white py-4 font-heading font-bold text-lg uppercase tracking-widest mt-8 hover:bg-red-700 transition-colors">
          Submit Claim
        </button>
      </div>
    </div>
  );
};

const AboutScreen = ({ navigate }) => (
  <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
    <div className="px-6 py-4 flex items-center border-b border-gray-200 pt-[60px]">
      <button onClick={() => navigate('profile')} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
      <span className="font-heading font-bold text-xl uppercase italic ml-2">About Us</span>
    </div>
    <div className="p-6 overflow-y-auto">
      <div className="w-16 h-16 bg-black flex items-center justify-center mb-6 border-b-4 border-red-600">
        <span className="text-white font-heading font-bold text-xl">ST</span>
      </div>
      <h2 className="text-2xl font-heading font-bold text-black uppercase italic mb-2">Surya Tyres<br />Trading Co.</h2>
      <div className="w-12 h-1 bg-red-600 mb-6"></div>

      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        Established in 1998, Surya Tyres Trading Co. is Tumkur's premier destination for high-performance tyres and automotive services. We are proud to be an authorized <strong>Multi-Brand Dealer</strong>.
      </p>

      <h3 className="font-heading font-bold text-lg mt-6 mb-3 uppercase">Why Choose Us?</h3>
      <ul className="list-none text-sm text-gray-700 space-y-3">
        <li className="flex gap-2"><CheckCircle size={16} className="text-red-600 shrink-0" /> Genuine Products Guarantee</li>
        <li className="flex gap-2"><CheckCircle size={16} className="text-red-600 shrink-0" /> Advanced 3D Wheel Alignment</li>
        <li className="flex gap-2"><CheckCircle size={16} className="text-red-600 shrink-0" /> Expert Technical Staff</li>
      </ul>
    </div>
  </div>
);

// Reusing existing screens with style tweaks for consistency
const TermsScreen = ({ navigate }) => (
  <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
    <div className="px-6 py-4 flex items-center border-b border-gray-200 pt-[60px]">
      <button onClick={() => navigate('profile')} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
      <span className="font-heading font-bold text-xl uppercase italic ml-2">Terms & Conditions</span>
    </div>
    <div className="p-6 overflow-y-auto text-sm text-gray-600 space-y-6">
      <div>
        <h3 className="font-heading font-bold text-black uppercase mb-2">1. Orders & Availability</h3>
        <p>All orders are subject to stock availability. Prices are subject to change without prior notice.</p>
      </div>
      <div>
        <h3 className="font-heading font-bold text-black uppercase mb-2">2. Warranty</h3>
        <p>Warranty claims are subject to the respective manufacturer's policy. Surya Tyres facilitates the process but is not the final authority.</p>
      </div>
      <div>
        <h3 className="font-heading font-bold text-black uppercase mb-2">3. Payments</h3>
        <p>We accept all major credit/debit cards, UPI, and cash. Orders above ₹20,000 for home delivery must be prepaid.</p>
      </div>
    </div>
  </div>
);

const MyOrdersScreen = ({ navigate }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  }

  // --- Tracking Steps ---
  const trackingSteps = ['Ordered', 'Packed', 'Dispatched', 'Delivered', 'Installation Done'];

  return (
    <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
      <div className="px-6 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10 pt-[60px] bg-white">
        <button onClick={() => navigate('home')} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
        <span className="font-heading font-bold text-xl uppercase italic ml-2">My Orders</span>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto pb-24 bg-gray-50 flex-1">
        {[
          {
            id: '#ORD-9921',
            date: '24 Oct 2023',
            status: 'Processing',
            total: '₹8,500',
            items: 'MRF Perfinza CLX1 (x1)',
            statusColor: 'text-orange-600',
            currentStep: 1
          },
          {
            id: '#ORD-8812',
            date: '12 Sep 2023',
            status: 'Delivered',
            total: '₹14,400',
            items: 'APOLLO Apterra AT2 (x2)',
            statusColor: 'text-green-600',
            currentStep: 4 // All steps done
          },
        ].map((order, idx) => (
          <div key={idx} className="bg-white p-5 border border-gray-200 shadow-sm transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-heading font-bold text-black text-sm tracking-wide">{order.id}</p>
                <p className="text-xs text-gray-500 font-medium">{order.date}</p>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${order.statusColor}`}>{order.status}</span>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-sm text-gray-800 mb-2 font-medium">{order.items}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase font-bold">Total</span>
                <span className="font-heading font-bold text-black text-lg">{order.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4 border-t border-gray-100 pt-4">
              <button className="flex-1 py-2 border border-gray-300 flex items-center justify-center gap-2 text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors text-gray-700">
                <FileText size={14} /> Invoice
              </button>
              <button className="flex-1 py-2 border border-gray-300 flex items-center justify-center gap-2 text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors text-gray-700">
                <FileText size={14} /> E-Way Bill
              </button>
            </div>

            <button
              onClick={() => toggleDetails(order.id)}
              className="w-full mt-3 py-3 text-xs font-bold text-white bg-black hover:bg-gray-900 transition-colors uppercase tracking-widest"
            >
              {expandedOrder === order.id ? "Close Tracking" : "Track Order"}
            </button>

            {/* EXPANDED TRACKING TIMELINE */}
            {expandedOrder === order.id && (
              <div className="mt-6 pl-2 animate-fade-in-up">
                <h4 className="font-heading font-bold text-xs uppercase mb-4 text-gray-400 tracking-wider">Shipment Journey</h4>
                <div className="space-y-6 relative border-l-2 border-gray-200 ml-2 pl-6 pb-2">
                  {trackingSteps.map((step, stepIdx) => {
                    const isCompleted = stepIdx <= order.currentStep;
                    const isCurrent = stepIdx === order.currentStep;
                    return (
                      <div key={step} className="relative">
                        {/* Dot on Timeline */}
                        <div className={`absolute -left-[31px] top-0 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${isCompleted ? 'bg-red-600 border-red-600' : 'bg-white border-gray-300'}`}></div>

                        <p className={`text-xs uppercase font-bold tracking-wide transition-colors duration-300 ${isCompleted ? 'text-black' : 'text-gray-300'}`}>
                          {step}
                        </p>
                        {isCompleted && (
                          <p className="text-[10px] text-gray-400 mt-0.5">Completed</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SavedAddressesScreen = ({ navigate }) => (
  <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
    <div className="px-6 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10 pt-[60px] bg-white">
      <button onClick={() => navigate('profile')} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
      <span className="font-heading font-bold text-xl uppercase italic ml-2">Addresses</span>
    </div>
    <div className="p-4 space-y-4 overflow-y-auto pb-24 bg-gray-50 flex-1">
      <div className="bg-white p-5 border-l-4 border-red-600 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading font-bold text-black uppercase text-sm">Home</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">Default</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Flat 402, Oakwood Apartments,<br />12th Main Road, Tumkur - 572101
        </p>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <button className="text-black">Edit</button>
          <button className="text-gray-400">Delete</button>
        </div>
      </div>

      <div className="bg-white p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading font-bold text-black uppercase text-sm">Work</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Surya Tyres Trading Co,<br />Ring Road, Tumkur - 572101
        </p>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <button className="text-black">Edit</button>
          <button className="text-gray-400">Delete</button>
        </div>
      </div>

      <button className="w-full py-4 border-2 border-dashed border-gray-300 text-gray-500 font-heading font-bold text-sm uppercase hover:border-black hover:text-black transition-colors">
        + Add New Address
      </button>
    </div>
  </div>
);

const ProductDetails = ({ tyre, navigate, addToCart, cartLength }) => (
  <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 sticky top-0 z-10 pt-[60px] bg-white">
      <button onClick={() => navigate('back')} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
      <span className="font-heading font-bold text-lg uppercase">Details</span>
      <div onClick={() => navigate('cart')} className="relative p-2 text-black">
        <ShoppingBag size={22} />
        {cartLength > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border border-white"></span>}
      </div>
    </div>

    <div className="flex-1 overflow-y-auto hide-scrollbar">
      <div className="h-72 bg-white flex items-center justify-center p-8 border-b border-gray-100">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent)]"></div>
          <img src={tyre.image} className="w-full h-full object-contain relative z-10" alt={tyre.model} />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6">
          <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">{tyre.brand}</span>
          <h1 className="text-3xl font-heading font-bold text-black mt-2 uppercase italic leading-none">{tyre.model}</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-wide">Fits: {tyre.vehicle}</p>
        </div>

        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 line-through">MRP ₹{tyre.mrp}</p>
            <p className="text-4xl font-heading font-bold text-red-600">₹{tyre.price}</p>
            <p className="text-xs font-bold text-green-600 mt-1">INCLUSIVE OF ALL TAXES</p>

            {/* Bajaj Finserv EMI Tag */}
            <div className="mt-3 flex items-center gap-2">
              <div className="bg-[#005a87] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm">Bajaj Finserv</div>
              <p className="text-xs font-bold text-gray-700">No Cost EMI from ₹{tyre.emi}/mo</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1">
            <span className="font-bold text-black">{tyre.rating}</span>
            <Star size={12} className="text-black fill-black" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border border-gray-200 p-3">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Size</p>
            <p className="font-heading font-bold text-black text-lg">{tyre.size}</p>
          </div>
          <div className="border border-gray-200 p-3">
            <p className="text-[10px] text-gray-400 font-bold uppercase">Warranty</p>
            <p className="font-heading font-bold text-black text-lg">5 Years</p>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-bold text-black uppercase mb-3 text-sm">Performance Features</h3>
          <div className="flex flex-wrap gap-2">
            {tyre.features.map((f, i) => (
              <span key={i} className="bg-gray-100 px-3 py-1.5 text-xs font-bold text-black uppercase">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 border-t border-gray-200 bg-white pb-8">
      <button
        onClick={() => addToCart(tyre)}
        className="w-full bg-red-600 text-white h-14 font-heading font-bold text-lg uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        Add to Cart <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

const CartScreen = ({ cart, navigate, goBack, updateQuantity }) => {
  // New Calculation: Price is inclusive of tax
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const gstContent = (total - (total / 1.18)).toFixed(0);
  const basePrice = (total - gstContent).toFixed(0);

  return (
    <div className="h-full bg-white flex flex-col font-body animate-fade-in-up">
      <div className="px-6 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10 pt-[60px] bg-white">
        <button onClick={goBack} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
        <span className="font-heading font-bold text-xl uppercase italic ml-2">My Cart</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 hide-scrollbar pb-[160px]">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 pb-20">
            <ShoppingBag size={48} className="opacity-20 mb-4" />
            <h3 className="font-heading font-bold text-black text-xl">CART IS EMPTY</h3>
            <p className="text-sm mt-2">Find the perfect tyres for your ride.</p>
          </div>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="flex gap-4 border-b border-gray-100 pb-6">
              <div className="w-24 h-24 bg-white border border-gray-200 flex items-center justify-center p-2">
                <img src={item.image} className="w-full h-full object-contain" alt={item.model} />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{item.brand}</p>
                  <h4 className="font-heading font-bold text-black text-lg leading-none">{item.model}</h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{item.size}</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-heading font-bold text-red-600 text-lg">₹{item.price * item.qty}</span>
                  <div className="flex items-center border border-black h-8">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center text-black hover:bg-gray-100"><Minus size={12} /></button>
                    <span className="w-8 text-center text-sm font-bold text-black border-x border-black h-full flex items-center justify-center">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-black hover:bg-gray-100"><Plus size={12} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="bg-gray-50 p-5 border border-gray-200">
            <h4 className="font-heading font-bold text-sm uppercase mb-4 text-black">Order Summary</h4>
            <div className="flex justify-between mb-2 text-sm text-gray-600"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="flex justify-between mb-4 text-sm text-green-600"><span>GST (18% Included)</span><span>₹{gstContent}</span></div>
            <div className="border-t border-gray-300 pt-4 flex justify-between font-heading font-bold text-xl text-black">
              <span>To Pay</span>
              <span>₹{total}</span>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="absolute bottom-[80px] w-full p-4 bg-white border-t border-gray-200 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigate('payment')} className="w-full bg-red-600 text-white py-4 font-heading font-bold text-lg uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
            Proceed to Pay <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

// Reusing Payment and Success screens with only style tweaks to match new fonts/colors
const PaymentScreen = ({ cart, navigate, goBack }) => {
  const [deliveryMode, setDeliveryMode] = useState('store');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Revised Calculation logic
  const totalAmount = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const subTotal = (totalAmount / 1.18);
  const gstAmount = totalAmount - subTotal;
  const isHighValue = totalAmount > 20000;

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigate('success');
      }, 2500);
    } else {
      navigate('success');
    }
  };

  return (
    <div className="h-full bg-white flex flex-col font-body relative animate-fade-in-up">
      {isProcessing && (
        <div className="absolute inset-0 bg-white/95 z-[60] flex flex-col items-center justify-center text-black">
          <Loader className="animate-spin text-red-600 mb-4" size={40} />
          <h3 className="text-xl font-heading font-bold uppercase">Processing...</h3>
          <p className="text-sm text-gray-500 mt-2">Connecting to Secure Gateway</p>
        </div>
      )}

      <div className="px-6 py-4 flex items-center border-b border-gray-200 sticky top-0 z-10 pt-[60px] bg-white">
        <button onClick={goBack} className="p-2 -ml-2 text-black"><ChevronLeft size={24} /></button>
        <span className="font-heading font-bold text-xl uppercase italic ml-2">Payment</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 hide-scrollbar pb-32">

        {/* GST & Price Breakdown - Revised */}
        <div className="bg-gray-50 border border-gray-200 p-4">
          <h4 className="font-heading font-bold text-sm uppercase mb-3 text-black">Price Details</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Base Value</span><span>₹{subTotal.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>GST (18% Included)</span><span>₹{gstAmount.toFixed(0)}</span></div>
            <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold text-black text-base">
              <span>Total Payable</span><span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Delivery Mode */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery Method</h3>
          <div className="flex gap-4">
            <div onClick={() => setDeliveryMode('store')} className={`flex-1 p-4 border-2 cursor-pointer transition-all ${deliveryMode === 'store' ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'}`}>
              <Settings size={24} className={deliveryMode === 'store' ? "text-red-600" : "text-gray-400"} />
              <p className="font-heading font-bold text-sm mt-3 uppercase text-black">Store Fitment</p>
            </div>
            <div onClick={() => setDeliveryMode('home')} className={`flex-1 p-4 border-2 cursor-pointer transition-all ${deliveryMode === 'home' ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'}`}>
              <Truck size={24} className={deliveryMode === 'home' ? "text-red-600" : "text-gray-400"} />
              <p className="font-heading font-bold text-sm mt-3 uppercase text-black">Home Delivery</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="border border-gray-200 p-5 bg-gray-50">
          <h4 className="font-heading font-bold text-sm uppercase mb-2 text-black">{deliveryMode === 'store' ? "Store Location" : "Shipping Address"}</h4>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {deliveryMode === 'store'
              ? "Surya Tyres Trading Co, Near HP Petrol Bunk, Ring Road, Tumkur - 572101"
              : "Flat 402, Oakwood Apartments, MG Road, Tumkur - 572101"}
          </p>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Method</h3>
          <div className="space-y-3">
            {[
              { id: 'upi', icon: Phone, label: "UPI", sub: "Google Pay, PhonePe" },
              { id: 'card', icon: CreditCard, label: "Cards", sub: "Credit / Debit" },
              { id: 'netbanking', icon: Landmark, label: "Net Banking", sub: "All Banks" },
              // Added Bajaj Finserv EMI
              { id: 'bajaj', icon: CreditCard, label: "Bajaj Finserv EMI", sub: "No Cost EMI" }
            ].map(method => (
              <div key={method.id} onClick={() => setPaymentMethod(method.id)} className={`p-4 border cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === method.id ? 'border-red-600 bg-white shadow-sm' : 'border-gray-200 bg-white'}`}>
                <method.icon size={20} className="text-black" />
                <div className="flex-1">
                  <p className="font-bold text-sm text-black uppercase">{method.label}</p>
                  {method.sub && <p className="text-xs text-gray-500">{method.sub}</p>}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-red-600' : 'border-gray-300'}`}>
                  {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>}
                </div>
              </div>
            ))}

            <div
              onClick={() => !isHighValue && setPaymentMethod('cod')}
              className={`p-4 border cursor-pointer flex items-center gap-4 relative overflow-hidden ${isHighValue ? 'opacity-50 grayscale' : ''} ${paymentMethod === 'cod' ? 'border-red-600 bg-white shadow-sm' : 'border-gray-200 bg-white'}`}
            >
              <Banknote size={20} className="text-black" />
              <div className="flex-1">
                <p className="font-bold text-sm text-black uppercase">Cash on Delivery</p>
              </div>
              {!isHighValue && (
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-red-600' : 'border-gray-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>}
                </div>
              )}
              {isHighValue && (
                <div className="absolute inset-0 bg-gray-100/90 flex items-center justify-center border border-red-200">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Online Only ({'>'} ₹20k)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200 pb-8 z-50">
        <button
          disabled={!paymentMethod}
          onClick={handlePayment}
          className={`w-full py-4 font-heading font-bold text-lg uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${paymentMethod ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-300 text-gray-500'}`}
        >
          Pay ₹{totalAmount} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const SuccessScreen = ({ navigate, setCart }) => (
  <div className="h-full w-full bg-white flex flex-col items-center justify-center p-8 text-center font-body animate-fade-in-up">
    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
      <CheckCircle size={48} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-heading font-bold text-black uppercase italic mb-2">Order Confirmed</h2>
    <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
      Thank you for choosing Surya Tyres.<br />Order #SURYA-9921 confirmed.
    </p>

    <button className="w-full bg-black text-white py-4 font-heading font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 mb-4 hover:bg-gray-900 transition-colors">
      <FileText size={18} /> Download Invoice & E-Way Bill
    </button>

    <button onClick={() => { setCart([]); navigate('home'); }} className="w-full bg-white text-black border-2 border-black py-4 font-heading font-bold text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors">
      Back to Garage
    </button>
  </div>
);

const SearchScreen = ({ navigate }) => (
  <div className="h-full flex flex-col bg-white font-body animate-fade-in-up">
    <div className="px-4 py-3 bg-white sticky top-0 z-10 border-b border-gray-200 pt-[60px]">
      <div className="flex gap-2">
        <button onClick={() => navigate('back')}><ChevronLeft size={24} className="text-black" /></button>
        <div className="flex-1 bg-gray-100 h-10 flex items-center px-4 gap-3 text-gray-500">
          <Search size={18} />
          <input autoFocus placeholder="SEARCH TYRES..." className="bg-transparent w-full outline-none text-sm font-bold uppercase" />
        </div>
      </div>
    </div>
    <div className="p-4 space-y-3 flex-1 overflow-y-auto hide-scrollbar pb-24">
      {TYRES.map(tyre => (
        <div key={tyre.id} onClick={() => navigate('details', tyre)} className="bg-white border border-gray-200 p-3 flex gap-3 hover:border-black cursor-pointer transition-colors">
          <div className="w-16 h-16 bg-white border border-gray-100 p-1"><img src={tyre.image} className="w-full h-full object-contain" /></div>
          <div><h4 className="font-heading font-bold text-sm text-black uppercase">{tyre.brand} {tyre.model}</h4><p className="text-xs text-gray-500 font-medium">{tyre.size}</p><p className="font-heading font-bold text-red-600 text-sm mt-1">₹{tyre.price}</p></div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN CONTROLLER ---

const App = () => {
  const [loading, setLoading] = useState(true);
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [screenStack, setScreenStack] = useState(['home']);
  const [selectedTyre, setSelectedTyre] = useState(null);

  const navigate = (screen, data = null) => {
    if (screen === 'back') {
      if (screenStack.length > 1) {
        const newStack = [...screenStack];
        newStack.pop();
        setScreenStack(newStack);
        const prev = newStack[newStack.length - 1];
        if (['home', 'search', 'cart', 'orders', 'profile'].includes(prev)) setActiveTab(prev);
      }
      return;
    }

    if (data) setSelectedTyre(data);
    setScreenStack([...screenStack, screen]);
    if (['home', 'search', 'cart', 'orders', 'profile'].includes(screen)) setActiveTab(screen);
  };

  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
    navigate('cart');
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const currentScreen = screenStack[screenStack.length - 1];

  const renderContent = () => {
    if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;
    if (!user) return <AuthScreen onLogin={() => setUser({ name: 'User' })} />;

    switch (currentScreen) {
      case 'home': return <HomeScreen navigate={navigate} />;
      case 'search': return <SearchScreen navigate={navigate} />;
      case 'details': return <ProductDetails tyre={selectedTyre} navigate={navigate} addToCart={addToCart} cartLength={cart.length} />;
      case 'cart': return <CartScreen cart={cart} navigate={navigate} goBack={() => navigate('back')} updateQuantity={updateQuantity} />;
      case 'payment': return <PaymentScreen cart={cart} navigate={navigate} goBack={() => navigate('back')} />;
      case 'success': return <SuccessScreen navigate={navigate} setCart={setCart} />;
      case 'profile': return <ProfileScreen navigate={navigate} onLogout={() => setUser(null)} />;
      case 'about': return <AboutScreen navigate={navigate} />;
      case 'terms': return <TermsScreen navigate={navigate} />;
      case 'saved-addresses': return <SavedAddressesScreen navigate={navigate} />;
      case 'orders': return <MyOrdersScreen navigate={navigate} />;
      case 'warranty': return <WarrantyClaimScreen navigate={navigate} />;
      default: return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <PhoneFrame>
      {renderContent()}

      {/* BOTTOM NAV BAR - Always visible for main screens, but hidden for checkout flow if needed, currently kept visible as requested */}
      {user && ['home', 'search', 'cart', 'orders', 'profile'].includes(currentScreen) && currentScreen !== 'payment' && (
        <div className="absolute bottom-0 w-full h-[80px] bg-white border-t border-gray-200 flex justify-around items-start pt-3 z-40 safe-area-bottom">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'cart', icon: ShoppingBag, label: 'Cart', badge: cart.length },
            { id: 'orders', icon: Package, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.id ? 'text-red-600' : 'text-gray-400 hover:text-black'}`}
            >
              <div className="relative">
                <tab.icon size={24} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold border border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </PhoneFrame>
  );
};

export default App;