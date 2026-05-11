import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, Settings, Grid, List as ListIcon, Filter } from 'lucide-react';

interface MyPageViewProps {
  onLogout: () => void;
}

export default function MyPageView({ onLogout }: MyPageViewProps) {
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.category === activeTab);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'top', label: 'Tops' },
    { id: 'bottom', label: 'Bottoms' },
    { id: 'outer', label: 'Outer' },
    { id: 'shoes', label: 'Shoes' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-20">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
          <div className="group relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img src="https://picsum.photos/seed/sydouser/300/300" alt="profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Settings size={20} className="text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">시도하는 사람</h2>
            <p className="text-gray-400 text-xs md:text-sm font-medium">@sydo_minimalist • 스타일링 보고서 12회 완료</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert('프로필 편집 모드로 전환합니다.')}
            className="px-6 py-3 border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:border-black transition-colors"
          >
            Profile Edit
          </button>
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 mb-12 pb-6">
        <div className="flex overflow-x-auto no-scrollbar gap-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative pb-2 text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${activeTab === cat.id ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-[-25px] left-0 right-0 h-[2px] bg-black"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-gray-300">
          <div 
            onClick={() => alert('필터 기능이 준비 중입니다.')}
            className="flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
          >
            <Filter size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Sort By</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-100" />
          <Grid size={18} className="text-black cursor-pointer" />
          <ListIcon size={18} className="cursor-pointer hover:text-black" onClick={() => alert('리스트 뷰로 전환합니다.')} />
        </div>
      </div>
      
      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e: any) => {
              if (e.target.files?.length) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                  const newItem = {
                    id: Date.now(),
                    category: activeTab === 'all' ? 'top' : activeTab,
                    image: event.target?.result as string,
                    name: file.name.split('.')[0]
                  };
                  setItems(prev => [newItem, ...prev]);
                  alert(`${file.name} 아이템이 옷장에 등록되었습니다!`);
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
          className="border-2 border-dashed border-gray-100 aspect-[3/4] rounded-sm flex flex-col items-center justify-center text-gray-300 hover:border-black hover:text-black cursor-pointer transition-all bg-gray-50/50 group"
        >
          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Item</span>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group aspect-[3/4] bg-gray-50 relative cursor-pointer overflow-hidden rounded-sm"
            >
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                <p className="text-white text-[10px] font-black uppercase tracking-widest px-4 text-center">
                  {item.name}
                </p>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full text-white transition-colors">
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="p-2 bg-sydo-accent/80 hover:bg-sydo-accent backdrop-blur rounded-full text-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-[8px] font-black uppercase tracking-widest bg-white/80 backdrop-blur px-2 py-1 rounded-sm">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
