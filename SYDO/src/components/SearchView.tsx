import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { View } from '../types';

interface SearchViewProps {
  initialQuery?: string;
  onClose: () => void;
  onSelectItem: (item: any) => void;
}

export default function SearchView({ initialQuery = '', onClose, onSelectItem }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(initialQuery !== '');
  const [activeTab, setActiveTab] = useState('상품');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string | null>(null);
  const [selectedSubFilters, setSelectedSubFilters] = useState<Record<string, string>>({});
  const [recentSearches, setRecentSearches] = useState(['와이드 슬랙스', '니트가디건', '미니멀 셋업', '빈티지 셔츠']);
  const [trendingKeywords, setTrendingKeywords] = useState([
    '린넨 셔츠', '벌룬 팬츠', '실버 액세서리', '메리제인 슈즈', '크롭 티셔츠'
  ]);

  const tabs = ['상품', '브랜드', '스냅/코디', '혜택', '콘텐츠', '발매'];
  
  const filterData: Record<string, string[]> = {
    '성별': ['전체', '남성', '여성', '공용'],
    '컬러': ['블랙', '화이트', '그레이', '네이비', '베이지', '블루', '그린', '레드'],
    '패턴/무늬': ['무지', '스트라이프', '체크', '도트', '플라워', '프린팅'],
    '소재': ['면', '데님', '레더', '린넨', '나일론', '울', '실크'],
    '가격': ['~3만원', '3~5만원', '5~10만원', '10~20만원', '20만원 이상'],
    '카테고리': ['아우터', '상의', '바지', '스커트', '원피스', '신발', '가방'],
    '사이즈': ['XS', 'S', 'M', 'L', 'XL', 'FREE'],
    '핏': ['슬림', '스트레이트', '와이드', '오버사이즈', '테이퍼드']
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setIsSearching(true);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches.slice(0, 4)]);
      }
    }
  };

  const toggleSubFilter = (category: string, option: string) => {
    setSelectedSubFilters(prev => {
      const next = { ...prev };
      if (next[category] === option) {
        delete next[category];
      } else {
        next[category] = option;
      }
      return next;
    });
    setActiveFilterCategory(null);
  };

  const removeRecentSearch = (item: string) => {
    setRecentSearches(recentSearches.filter(s => s !== item));
  };

  const renderSearchResults = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search Header Info */}
      <div className="flex items-baseline gap-4 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-black">"{query}"</h2>
        <p className="text-sm text-gray-400 font-bold">검색 결과 0개</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-black tracking-widest transition-all relative shrink-0 ${
              activeTab === tab ? 'text-black' : 'text-gray-300 hover:text-black'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="searchTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="relative">
        <div className="flex flex-wrap gap-2 items-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-black rounded-sm group hover:bg-gray-800 transition-colors">
            <TrendingUp size={12} className="group-hover:scale-110 transition-transform" />
            TRENDING
          </button>
          
          {Object.keys(filterData).map((category) => (
            <div key={category} className="relative">
              <button 
                onClick={() => setActiveFilterCategory(activeFilterCategory === category ? null : category)}
                className={`flex items-center gap-2 px-4 py-2 border text-[10px] font-bold transition-all ${
                  selectedSubFilters[category]
                    ? 'bg-black text-white border-black'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-black hover:text-black'
                }`}
              >
                {selectedSubFilters[category] || category}
                <motion.div
                  animate={{ rotate: activeFilterCategory === category ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={10} className="rotate-90" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeFilterCategory === category && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setActiveFilterCategory(null)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl z-20 overflow-hidden"
                    >
                      <div className="max-h-60 overflow-y-auto py-2 outline-none">
                        {filterData[category].map((option) => (
                          <button
                            key={option}
                            onClick={() => toggleSubFilter(category, option)}
                            className={`w-full text-left px-5 py-3 text-[11px] font-bold tracking-tight hover:bg-gray-50 transition-colors flex justify-between items-center ${
                              selectedSubFilters[category] === option ? 'text-sydo-accent' : 'text-gray-600'
                            }`}
                          >
                            {option}
                            {selectedSubFilters[category] === option && (
                              <div className="w-1.5 h-1.5 bg-sydo-accent rounded-full" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ))}

          {Object.keys(selectedSubFilters).length > 0 && (
            <button 
              onClick={() => setSelectedSubFilters({})}
              className="px-4 py-2 text-[10px] font-black text-gray-300 hover:text-red-500 uppercase flex items-center gap-1"
            >
              Reset All <X size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Placeholder Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="space-y-4 group cursor-pointer"
            onClick={() => {
              const mockProduct = {
                id: `search-mock-${i}`,
                title: `${query} 스타일링 아이템 ${i + 1}`,
                price: "MATCH PRICE",
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
                category: "AI_PICK",
                tag: "STYLING",
                aiDescription: `"${query}" 검색 결과로 제안드리는 AI 추천 아이템입니다.`
              };
              onSelectItem(mockProduct);
            }}
          >
            <div className="aspect-[3/4] bg-gray-50 border border-gray-100 relative overflow-hidden group-hover:border-black transition-all">
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                 <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:text-black group-hover:border-black transition-all">
                    <Search size={20} />
                 </div>
                 <p className="text-[10px] font-black text-gray-200 tracking-widest group-hover:text-black transition-colors">STYLING_SYNC</p>
               </div>
               {/* Hover Accent */}
               <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-1/3 bg-gray-100 rounded group-hover:bg-sydo-accent/20 transition-colors" />
              <div className="h-4 w-full bg-gray-50 rounded" />
              <div className="h-4 w-2/3 bg-gray-50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-[200] overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        {/* Search Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-grow relative">
            <form onSubmit={handleSearch}>
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!e.target.value) setIsSearching(false);
                }}
                placeholder="찾고 있는 스타일이나 아이템을 입력하세요"
                className="w-full text-2xl md:text-5xl font-black tracking-tighter outline-none placeholder:text-gray-100 border-b-[3px] border-black pb-5"
              />
              <button type="submit" className="absolute right-0 top-3 text-black hover:scale-110 transition-transform">
                <Search size={32} />
              </button>
            </form>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <X size={36} />
          </button>
        </div>

        {isSearching ? renderSearchResults() : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            {/* Recent Searches */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                  <Clock size={14} />
                  Recently Explored
                </h3>
                <button 
                  onClick={() => setRecentSearches([])}
                  className="text-[10px] font-bold text-gray-300 hover:text-black transition-colors"
                  style={{ visibility: recentSearches.length > 0 ? 'visible' : 'hidden' }}
                >
                  REMOVE HISTORY
                </button>
              </div>
              {recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((item) => (
                    <div 
                      key={item}
                      className="group flex items-center gap-3 bg-gray-50 pl-5 pr-3 py-3 rounded-full border border-gray-100 hover:border-black hover:bg-white transition-all cursor-pointer"
                      onClick={() => { setQuery(item); setIsSearching(true); }}
                    >
                      <span className="text-sm font-bold tracking-tight">{item}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeRecentSearch(item); }}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-300 italic font-medium">검색 기록이 없습니다.</p>
              )}
            </div>

            {/* Trending Keywords */}
            <div className="space-y-8">
              <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                <TrendingUp size={14} />
                Real-time Pulse
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {trendingKeywords.map((keyword, index) => (
                  <div 
                    key={keyword}
                    onClick={() => { setQuery(keyword); setIsSearching(true); }}
                    className="flex items-center justify-between group cursor-pointer py-4 border-b border-gray-50 hover:border-black transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-black text-gray-300 group-hover:text-black transition-colors">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-lg font-bold tracking-tight group-hover:translate-x-1 transition-transform">{keyword}</span>
                    </div>
                    <ArrowRight size={18} className="text-gray-200 group-hover:text-black opacity-0 group-hover:opacity-100 transition-all translate-x-[-15px] group-hover:translate-x-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
