import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

const categories = [
  {
    title: '상의',
    items: ['반소매 티셔츠', '셔츠/블라우스', '니트/스웨터', '후드 티셔츠', '맨투맨', '가디건']
  },
  {
    title: '하의',
    items: ['데님 팬츠', '슬랙스', '트레이닝 팬츠', '숏 팬츠', '치마', '코튼 팬츠']
  },
  {
    title: '아우터',
    items: ['코트', '자켓', '점퍼', '가디건', '패딩']
  },
  {
    title: '서비스',
    items: ['오늘의 코디 추천', '디지털 옷장 관리', 'A/B 코디 투표', '스타일 쉐어링', 'AI 스타일 분석']
  }
];

export default function CategoryModal({ isOpen, onClose, onSelectCategory }: CategoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[900]"
          />
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-0 left-0 h-full w-full sm:w-[400px] md:w-[600px] bg-white border-r border-gray-200 shadow-2xl z-[1000] p-6 md:p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
              <h3 className="text-xl font-black tracking-tight uppercase">SYDO ARCHIVE</h3>
              <button onClick={onClose} className="cursor-pointer hover:rotate-90 transition-transform duration-300">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              {categories.map((cat) => (
                <div key={cat.title}>
                  <p className="font-black text-[10px] mb-4 uppercase tracking-[0.3em] text-gray-400">{cat.title}</p>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li 
                        key={item} 
                        onClick={() => onSelectCategory(item)}
                        className="text-sm font-medium text-gray-600 cursor-pointer hover:text-black hover:translate-x-1 transition-all"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-8 border-t border-gray-100">
              <p className="text-[9px] font-black tracking-[0.4em] uppercase text-gray-300">© 2024 SYDO CORP.</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
