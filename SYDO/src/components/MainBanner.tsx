import { motion } from 'motion/react';

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    title: "있는 옷으로\n완성하는 미니멀 룩",
    subtitle: "SYDO MINIMAL",
    color: "bg-[#F8F8F8]",
    style: "MINIMAL"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
    title: "자유로운 실루엣\n힙스터 스트릿 바이브",
    subtitle: "SYDO STREET",
    color: "bg-[#EFEFEF]",
    style: "STREET"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
    title: "오리지널의 품격\n타임리스 빈티지 룩",
    subtitle: "SYDO VINTAGE",
    color: "bg-[#F3F3F3]",
    style: "VINTAGE"
  }
];

interface MainBannerProps {
  onStartAI?: () => void;
  onSelectItem?: (item: any) => void;
}

export default function MainBanner({ onStartAI, onSelectItem }: MainBannerProps) {
  const handleBannerClick = (banner: typeof banners[0]) => {
    if (onSelectItem) {
      const mockProduct = {
        id: `banner-${banner.id}`,
        title: banner.title.replace('\n', ' '),
        price: banner.id === 1 ? "₩249,000" : (banner.id === 2 ? "₩159,000" : "₩198,000"),
        image: banner.image,
        category: banner.style,
        tag: "EDITORS PICK",
        subPrice: "Members Only",
        aiDescription: banner.id === 1 
          ? "보유하신 '화이트 슬랙스'와 매치하면 가장 정갈한 미니멀 룩이 연출됩니다."
          : (banner.id === 2 
            ? "보유하신 '그레이 스웻팬츠'와 믹스매치하여 스트릿한 무드를 강조해보세요."
            : "보유하신 '브라운 레더 벨트'와 함께 클래식한 빈티지 무드를 완성하세요.")
      };
      onSelectItem(mockProduct);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[550px] overflow-hidden border-b border-gray-200">
      {banners.map((banner, index) => (
        <motion.div 
          key={banner.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleBannerClick(banner)}
          className={`group relative flex-1 h-[400px] md:h-full border-b md:border-b-0 md:border-r border-white last:border-r-0 overflow-hidden cursor-pointer ${banner.color} ${index > 0 ? 'hidden md:block' : ''}`}
        >
          <motion.img 
            src={banner.image} 
            alt={banner.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.85] transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
          
          <div className="absolute bottom-10 md:bottom-12 left-6 md:left-8 right-6 md:right-8 text-white">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-2 md:mb-3 opacity-80"
            >
              {banner.subtitle}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="text-2xl md:text-3xl font-serif italic font-black leading-[1.1] whitespace-pre-line text-balance drop-shadow-lg"
            >
              {banner.title}
            </motion.h2>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              className="h-[2px] bg-white mt-4 md:mt-6 group-hover:w-full transition-all duration-500 origin-left"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
