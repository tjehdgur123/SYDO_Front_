import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Heart, ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../lib/CartContext';

interface ProductDetailViewProps {
  item: any;
  onBack: () => void;
}

export default function ProductDetailView({ item, onBack }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(item.category?.includes('데님') ? 'Washed Blue' : 'Neutral Black');
  const [isAdded, setIsAdded] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Neutral Black', hex: '#111111' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Washed Blue', hex: '#4A6FA5' }
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('사이즈를 선택해주세요.');
      return;
    }
    addToCart({ ...item, selectedSize, selectedColor });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-10 bg-white/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-4">
          <button className="p-2"><Share2 size={20} /></button>
          <button className="p-2"><Heart size={20} /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:px-5 md:py-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 lg:w-[55%]">
          <div className="sticky top-12 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[3/4] bg-gray-50 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Visual Accents */}
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-50 flex items-center justify-center">
                <p className="text-[10px] font-black tracking-widest text-gray-300 uppercase">Detail Cut 1</p>
              </div>
              <div className="aspect-square bg-gray-50 flex items-center justify-center">
                <p className="text-[10px] font-black tracking-widest text-gray-300 uppercase">Detail Cut 2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="w-full md:w-1/2 lg:w-[45%] px-6 md:px-0 py-4 md:py-0">
          <div className="space-y-10">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 bg-black text-white text-[9px] font-black tracking-widest uppercase">
                  {item.tag}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight text-balance">
                {item.title}
              </h1>
              <div className="flex items-baseline gap-4">
                <p className="text-2xl font-black text-sydo-accent">{item.price}</p>
                {item.subPrice && (
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.subPrice}</p>
                )}
              </div>
            </div>

            {/* SYDO AI Insights */}
            <div className="bg-sydo-pink/20 p-6 rounded-2xl border border-sydo-pink/30 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-sydo-accent rounded-full animate-pulse" />
                <p className="text-[11px] font-black uppercase tracking-widest text-sydo-accent">SYDO AI Style Index</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium leading-relaxed">
                  {item.aiDescription || `"보유하고 계신 '오버핏 셔츠'와 레이어링했을 때 가장 세련된 실루엣이 나타납니다."`}
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white text-[10px] font-black rounded-full border border-sydo-pink/50">#SYDO_AI_PICK</span>
                  <span className="px-3 py-1 bg-white text-[10px] font-black rounded-full border border-sydo-pink/50">#STYLE_SYNC</span>
                </div>
              </div>
            </div>

            {/* User Closet Matching - New Section */}
            <div className="space-y-4">
               <p className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                Match with Your Closet
                <span className="text-[9px] font-medium bg-gray-100 px-1.5 py-0.5 rounded">3 Items found</span>
               </p>
               <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center p-2 text-center group cursor-help">
                    <div className="w-10 h-10 rounded-full bg-white mb-2 shadow-sm flex items-center justify-center text-lg">👕</div>
                    <p className="text-[9px] font-bold text-gray-500 line-clamp-1">Blue Denim</p>
                    <p className="text-[8px] font-black text-sydo-accent">98% Match</p>
                  </div>
                  <div className="aspect-square bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-white mb-2 shadow-sm flex items-center justify-center text-lg">👖</div>
                    <p className="text-[9px] font-bold text-gray-500 line-clamp-1">White Slacks</p>
                    <p className="text-[8px] font-black text-sydo-accent">92% Match</p>
                  </div>
                  <div className="aspect-square bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center opacity-40">
                    <p className="text-[9px] font-black tracking-tighter">+ MORE</p>
                  </div>
               </div>
            </div>

            {/* Selection Form */}
            <div className="space-y-8">
              {/* Size Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-[11px] font-black uppercase tracking-widest">Select Size</p>
                  <button className="text-[10px] font-bold text-gray-400 underline underline-offset-4">SIZE GUIDE</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 md:py-4 text-xs font-black transition-all border ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-4">
                <p className="text-[11px] font-black uppercase tracking-widest">Select Color: <span className="text-gray-400">{selectedColor}</span></p>
                <div className="flex gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === color.name ? 'border-black scale-110' : 'border-transparent'
                      }`}
                    >
                      <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-12 md:pb-0">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-white text-black border border-black py-5 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-gray-50 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div
                      key="added"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={16} />
                      ADDED TO BAG
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      ADD TO BAG
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <button 
                onClick={() => alert('결제 단계로 이동합니다.')}
                className="flex-[1.5] bg-black text-white py-5 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
              >
                BUY NOW
              </button>
            </div>

            {/* Sticky Actions for Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 flex gap-3 z-50">
               <button 
                onClick={handleAddToCart}
                className="w-16 h-14 bg-white border border-gray-200 flex items-center justify-center relative"
              >
                <ShoppingBag size={20} />
                {isAdded && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-sydo-accent rounded-full flex items-center justify-center"
                  >
                    <Check size={10} className="text-white" />
                  </motion.div>
                )}
              </button>
              <button 
                onClick={() => alert('결제 단계로 이동합니다.')}
                className="flex-grow bg-black text-white text-[11px] font-black tracking-[0.3em] uppercase h-14"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
