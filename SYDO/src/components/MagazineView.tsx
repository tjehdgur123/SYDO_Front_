import { motion } from 'motion/react';

const magazineArticles = [
  {
    id: 1,
    category: "TREND",
    title: "2024 SS 미니멀리즘의 귀환",
    description: "올해 가장 주목해야 할 패션 키워드는 단연 '조용한 럭셔리'입니다. 과도한 로고 대신 실루엣과 소재에 집중한 미니멀리즘 스타일링을 제안합니다.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    date: "2024.05.01"
  },
  {
    id: 2,
    category: "STYLING",
    title: "셔츠 한 벌로 완성하는 일주일 코디",
    description: "기본 화이트 셔츠 한 벌로 월요일부터 일요일까지, 오피스룩부터 위켄드 룩까지 활용하는 완벽 가이드를 확인해보세요.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    date: "2024.04.28"
  },
  {
    id: 3,
    category: "INTERVIEW",
    title: "디지털 옷장의 선구자, SYDO 팀을 만나다",
    description: "기술이 어떻게 패션을 더 지속 가능하게 만들 수 있을까요? SYDO 개발팀이 꿈꾸는 미래의 옷장에 대해 이야기를 나누었습니다.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    date: "2024.04.15"
  }
];

export default function MagazineView() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-16">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase mb-3 text-gray-400">SYDO Editorial</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">SYDO 매거진</h2>
      </div>

      <div className="space-y-24">
        {magazineArticles.map((article, index) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center cursor-pointer"
          >
            <div className={`overflow-hidden h-[400px] md:h-[600px] ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="space-y-6">
              <span className="text-[10px] font-black tracking-widest text-sydo-accent bg-sydo-pink/30 px-3 py-1 rounded-sm">
                {article.category}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif italic font-black leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {article.description}
              </p>
              <div className="pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-300">
                <span>{article.date}</span>
                <span className="text-black border-b border-black pb-1 group-hover:pr-4 transition-all">Read More</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
