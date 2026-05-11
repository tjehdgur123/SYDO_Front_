import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../lib/CartContext';

interface RecommendationSectionProps {
  filter: string;
  onSelectItem: (item: any) => void;
}

const recommendations = [
  {
    id: 1,
    tag: "STYLING PICK",
    title: "보유하신 '와이드 슬랙스'와 어울리는 루즈핏 니트",
    price: "MATCH 98%",
    subPrice: "₩89,000",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    category: "MINIMAL",
    aiDescription: "현재 옷장에 있는 '검정 와이드 슬랙스'와 톤온톤으로 매치하기 가장 좋은 아이템입니다."
  },
  {
    id: 2,
    tag: "STREET VIBE",
    title: "보유하신 '조거 팬츠'와 매치할 고프코어 윈드브레이커",
    price: "MATCH 94%",
    subPrice: "₩145,000",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=600&q=80",
    category: "STREET",
    aiDescription: "업로드하신 '나일론 조거'와 함께 고프코어 룩을 완성하기에 최적의 실루엣입니다."
  },
  {
    id: 3,
    tag: "VINTAGE MOOD",
    title: "보유하신 '생지 데님'과 찰떡인 워싱 체크 셔츠",
    price: "MATCH 91%",
    subPrice: "₩68,000",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80",
    category: "VINTAGE",
    aiDescription: "작년에 업로드하신 '생지 데님 팬츠'의 에이징 컬러와 이 셔츠의 워싱이 아주 잘 어우러집니다."
  },
  {
    id: 4,
    tag: "AI CLOSET SYNC",
    title: "디지털 옷장에 옷을 추가하고 더 정확한 추천을 받으세요",
    price: "SYDO AI",
    subPrice: "무료 서비스",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    category: "SERVICE",
    aiDescription: "옷을 더 많이 업로드할수록 SYDO의 AI 추천 엔진이 당신의 취향을 더 정밀하게 파악합니다."
  }
];

export default function RecommendationSection({ filter, onSelectItem }: RecommendationSectionProps) {
  const { addToCart } = useCart();

  const filteredItems = filter === 'ALL' 
    ? recommendations 
    : recommendations.filter(item => item.category === filter || item.tag.includes(filter.toUpperCase()));

  return (
    <section className="px-5 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2 text-gray-400">
            {filter === 'ALL' ? 'Personalized for you' : `Filtering by: ${filter}`}
          </p>
          <h3 className="text-3xl font-black tracking-tighter">당신의 옷장 기반 추천 아이템</h3>
        </div>
        <a href="#" className="group flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black transition-colors">
          VIEW ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center border-y border-gray-100">
          <p className="text-gray-400 text-sm font-medium tracking-tight">'{filter}' 카테고리에 해당하는 추천 아이템이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gray-50 mb-5 overflow-hidden relative" onClick={() => onSelectItem(item)}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...item, price: item.price });
                    }}
                    className="w-full bg-white/90 backdrop-blur-md text-black py-4 text-[10px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
              
              <div className="space-y-1" onClick={() => onSelectItem(item)}>
                <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">{item.tag}</p>
                <h4 className="text-sm font-medium leading-snug group-hover:underline decoration-1 underline-offset-4 h-10 overflow-hidden text-balance">
                  {item.title}
                </h4>
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-sm font-black text-sydo-accent">{item.price}</span>
                  {item.subPrice && <span className="text-[11px] font-medium text-gray-400">{item.subPrice}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
