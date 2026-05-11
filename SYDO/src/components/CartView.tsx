import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../lib/CartContext';

interface CartViewProps {
  onContinueShopping: () => void;
}

export default function CartView({ onContinueShopping }: CartViewProps) {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.length > 0 ? "계산 필요 (데모)" : "0 KRW";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 underline-offset-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">장바구니</h2>
        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Your items will be stored for 30 days</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow">
          {cartItems.length === 0 ? (
            <div className="py-32 border-y border-gray-100 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <ShoppingBag size={32} />
              </div>
              <div>
                <p className="text-xl font-black tracking-tight mb-2">장바구니가 비어 있습니다</p>
                <p className="text-sm text-gray-400 font-medium">SYDO가 추천하는 트렌디한 아이템들을 담아보세요.</p>
              </div>
              <button 
                onClick={onContinueShopping}
                className="px-10 py-4 bg-black text-white text-[10px] font-black tracking-[0.3em] uppercase hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-100">
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-6 py-8 border-b border-gray-100 group"
                >
                  <div className="w-24 h-32 bg-gray-50 overflow-hidden rounded-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Item</p>
                    <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
                    <div className="flex gap-2 text-[10px] font-bold text-gray-400 uppercase">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </div>
                    <p className="text-sm font-black text-sydo-accent">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-gray-300 hover:text-black transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
              <div className="py-10 text-center">
                <button 
                  onClick={onContinueShopping}
                  className="text-[10px] font-black tracking-widest uppercase border-b border-black pb-1 hover:pr-4 transition-all"
                >
                  + Add More Items
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="bg-gray-50 p-8 md:p-10 sticky top-32">
            <h3 className="text-lg font-black tracking-tighter uppercase mb-8 pb-4 border-b border-gray-200">Order Summary</h3>
            
            <div className="space-y-4 mb-10">
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span>{total}</span>
              </div>
              <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between text-xl font-black tracking-tighter">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>

            <button 
              disabled={cartItems.length === 0}
              onClick={() => alert('결제 시스템 연동 중입니다.')}
              className="w-full bg-black text-white py-5 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
              Checkout
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
