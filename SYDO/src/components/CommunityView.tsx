import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageSquare, Share2, Plus } from 'lucide-react';

const initialPosts = [
  {
    id: 1,
    user: "style_guru_01",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    title: "오늘의 미니멀 시티룩",
    content: "SYDO에서 추천받은 가디건과 제 슬랙스를 매치해봤어요. 미니멀한 느낌이 너무 마음에 드네요!",
    likes: 124,
    comments: 12
  },
  {
    id: 2,
    user: "fashion_lover",
    image: "https://images.unsplash.com/photo-1539109132381-31512579f455?auto=format&fit=crop&w=600&q=80",
    title: "레이어드 스타일링 팁",
    content: "환절기에는 역시 레이어드가 최고죠. 톤온톤으로 맞춰봤습니다.",
    likes: 89,
    comments: 5
  },
  {
    id: 3,
    user: "closet_master",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    title: "디지털 옷장의 편리함",
    content: "SYDO로 옷장 정리하니까 코디 고민이 반으로 줄었어요. 강추!",
    likes: 210,
    comments: 18
  },
  {
    id: 4,
    user: "daily_outfit",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80",
    title: "데님 자켓 코디",
    content: "빈티지한 느낌의 데님 자켓과 화이트 티셔츠. 실패 없는 조합!",
    likes: 156,
    comments: 7
  }
];

export default function CommunityView() {
  const [posts, setPosts] = useState(initialPosts);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      const wasLiked = newSet.has(postId);
      
      if (wasLiked) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }

      // Update posts count based on the REAL toggle action
      setPosts(currentPosts => currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: wasLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));

      return newSet;
    });
  };

  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (postId: number) => {
    if (!commentText.trim()) return;
    
    setPosts(currentPosts => currentPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
    
    setCommentText('');
    setActiveCommentId(null);
    alert('댓글이 등록되었습니다!');
  };

  const handlePostOOTD = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const newPost = {
            id: Date.now(),
            user: "sydo_user",
            image: event.target?.result as string,
            title: "새로운 OOTD",
            content: "나만의 스타일링을 공유합니다!",
            likes: 0,
            comments: 0
          };
          setPosts(prev => [newPost, ...prev]);
          alert('포스팅이 성공적으로 등록되었습니다!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-12 md:py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2 text-gray-400">Share your style</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">SYDO 커뮤니티</h2>
        </div>
        <button 
          onClick={handlePostOOTD}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          <Plus size={14} /> POST OOTD
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer border-b border-gray-100 pb-8"
          >
            <div className="aspect-[4/5] bg-gray-50 mb-5 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                <span className="text-[9px] font-black tracking-wider text-black">@{post.user}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-base tracking-tight">{post.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {post.content}
              </p>
              
              <div className="flex items-center gap-6 pt-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                  className={`flex items-center gap-1.5 transition-colors ${
                    likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart size={16} fill={likedPosts.has(post.id) ? "currentColor" : "none"} />
                  <span className="text-[10px] font-black tracking-widest">{post.likes}</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveCommentId(activeCommentId === post.id ? null : post.id); }}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-black transition-colors"
                >
                  <MessageSquare size={16} />
                  <span className="text-[10px] font-black tracking-widest">{post.comments}</span>
                </button>
                <div className="flex items-center gap-1.5 text-gray-400 hover:text-black transition-colors ml-auto">
                  <Share2 size={16} />
                </div>
              </div>

              {/* Inline Comment Input */}
              {activeCommentId === post.id && (
                <div 
                  className="pt-4 animate-in fade-in slide-in-from-top-2 duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      autoFocus
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                      placeholder="Comment..."
                      className="flex-grow bg-gray-50 border-b border-gray-200 py-2 px-3 text-xs outline-none focus:border-black transition-colors"
                    />
                    <button 
                      onClick={() => handleCommentSubmit(post.id)}
                      className="bg-black text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
