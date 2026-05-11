import React from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  onToggleMenu: () => void;
  onNavigate: (view: View) => void;
  onSearch?: (query: string) => void;
  currentView: View;
  isLoggedIn?: boolean;
}

export default function Header({ onToggleMenu, onNavigate, onSearch, currentView, isLoggedIn }: HeaderProps) {
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (onSearch) onSearch(query);
  };

  return (
    <header className="w-full border-b border-gray-200 sticky top-0 bg-white z-[100]">
      <div className="hidden md:flex justify-between items-center px-5 py-2 text-[11px] border-b border-gray-50 text-gray-500 font-medium tracking-tight">
        <div className="flex gap-4">
          <span 
            className={`cursor-pointer hover:text-black transition-colors ${currentView === 'magazine' ? 'text-black font-bold' : ''}`}
            onClick={() => onNavigate('magazine')}
          >
            SYDO 매거진
          </span>
          <span 
            className={`cursor-pointer hover:text-black transition-colors ${currentView === 'community' ? 'text-black font-bold' : ''}`}
            onClick={() => onNavigate('community')}
          >
            커뮤니티
          </span>
          <span 
            className={`cursor-pointer hover:text-black transition-colors ${currentView === 'event' ? 'text-black font-bold' : ''}`}
            onClick={() => onNavigate('event')}
          >
            이벤트
          </span>
        </div>
        <div className="flex gap-4">
          {!isLoggedIn ? (
            <span 
              className={`cursor-pointer hover:text-black transition-colors ${currentView === 'login' ? 'text-black font-bold' : ''}`}
              onClick={() => onNavigate('login')}
            >
              로그인 / 회원가입
            </span>
          ) : (
            <span className="text-black font-black tracking-widest text-[9px] uppercase">Welcome to SYDO</span>
          )}
          <span 
            className={`cursor-pointer hover:text-black transition-colors ${currentView === 'mypage' ? 'text-black font-bold' : ''}`}
            onClick={() => onNavigate('mypage')}
          >
            마이페이지
          </span>
          <span 
            className={`cursor-pointer hover:text-black transition-colors ${currentView === 'cart' ? 'text-black font-bold' : ''}`}
            onClick={() => onNavigate('cart')}
          >
            장바구니
          </span>
        </div>
      </div>
      
      <div className="flex items-center px-4 md:px-5 py-3 md:py-4 gap-4 md:gap-8">
        <button 
          onClick={onToggleMenu}
          className="flex items-center gap-2 font-bold text-sm cursor-pointer hover:opacity-70 transition-opacity"
        >
          <Menu size={20} />
          <span className="hidden sm:inline">카테고리</span>
        </button>
        
        <div 
          className="text-xl md:text-2xl font-black tracking-tighter cursor-pointer select-none"
          onClick={() => onNavigate('home')}
        >
          SYDO
        </div>
        
        <form onSubmit={handleSearchSubmit} className="hidden md:block flex-grow max-w-md relative">
          <input 
            name="search"
            type="text" 
            onFocus={() => onNavigate('search')}
            placeholder="내 옷장 속 아이템으로 코디 검색"
            className="w-full pl-4 pr-10 py-2.5 border border-black outline-none text-sm placeholder:text-gray-400 cursor-text"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:scale-110 transition-transform">
            <Search size={18} />
          </button>
        </form>

        <div className="flex items-center gap-4 md:gap-5 ml-auto">
          <button 
            onClick={() => onNavigate('search')}
            className="md:hidden cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Search size={22} />
          </button>
          <User 
            size={22} 
            className={`cursor-pointer hover:opacity-70 transition-opacity ${currentView === 'mypage' ? 'text-sydo-accent' : ''}`} 
            onClick={() => onNavigate('mypage')}
          />
          <ShoppingBag 
            size={22} 
            className={`cursor-pointer hover:opacity-70 transition-opacity ${currentView === 'cart' ? 'text-sydo-accent' : ''}`} 
            onClick={() => onNavigate('cart')}
          />
        </div>
      </div>
    </header>
  );
}
