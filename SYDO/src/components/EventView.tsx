import { motion } from 'motion/react';
import { Calendar, Gift, Star } from 'lucide-react';

const events = [
  {
    id: 1,
    status: "ONGOING",
    title: "첫 옷장 등록 이벤트",
    description: "내 옷장에 아이템을 5개 이상 등록하면 AI 코디 프리미엄 분석권 1회를 드립니다.",
    period: "2024.05.01 - 2024.05.31",
    bgColor: "bg-black text-white"
  },
  {
    id: 2,
    status: "ONGOING",
    title: "OOTD 스타일 쉐어링",
    description: "커뮤니티에 오늘의 코디를 공유하고 가장 많은 '좋아요'를 받은 분께 트렌드 아이템을 선물합니다.",
    period: "2024.05.10 - 2024.06.10",
    bgColor: "bg-sydo-pink text-black"
  },
  {
    id: 3,
    status: "UPCOMING",
    title: "여름 캡슐 워드로브 챌린지",
    description: "단 10벌로 완성하는 시원한 여름 룩. AI의 가이드와 함께 챌린지에 도전하세요.",
    period: "2024.06.15 - 2024.07.15",
    bgColor: "bg-gray-100 text-gray-400"
  }
];

export default function EventView() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-20">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase mb-4 text-gray-400">Limited Offers</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">이벤트</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-10 md:p-12 rounded-sm flex flex-col justify-between min-h-[350px] cursor-pointer group ${event.bgColor}`}
          >
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className={`text-[8px] font-black px-2 py-1 tracking-widest rounded-full border ${event.status === 'ONGOING' ? 'border-current' : 'border-gray-200 text-gray-300'}`}>
                  {event.status}
                </span>
                <span className="text-[8px] font-black tracking-widest opacity-60">
                  {event.period}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 group-hover:translate-x-2 transition-transform">
                {event.title}
              </h3>
              <p className="text-sm md:text-base opacity-70 leading-relaxed font-medium">
                {event.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-12">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/10">
                  <Gift size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/10">
                  <Star size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/10">
                  <Calendar size={18} />
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest border-b border-current pb-1">
                자세히 보기
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
