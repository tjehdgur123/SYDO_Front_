/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import CategoryModal from './components/CategoryModal';
import MainBanner from './components/MainBanner';
import RecommendationSection from './components/RecommendationSection';
import FloatingAIButton from './components/FloatingAIButton';
import AIStylingModal from './components/AIStylingModal';
import CommunityView from './components/CommunityView';
import LoginView from './components/LoginView';
import MyPageView from './components/MyPageView';
import MagazineView from './components/MagazineView';
import EventView from './components/EventView';
import CartView from './components/CartView';
import ProductDetailView from './components/ProductDetailView';
import SearchView from './components/SearchView';

import { CartProvider } from './lib/CartContext';
import { View } from './types';

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
  };

  const handleNavigateWithFilter = (view: View, filter: string = 'ALL') => {
    setCurrentView(view);
    setCategoryFilter(filter);
    setIsMenuOpen(false);
    if (view !== 'productDetail') {
      setSelectedProduct(null);
    }
  };

  const handleSelectProduct = (item: any) => {
    if (item.category === 'SERVICE') {
      if (item.title.includes('옷장') || item.title.includes('AI')) {
        setIsAIModalOpen(true);
      } else {
        alert(`${item.title} 서비스는 준비 중입니다.`);
      }
      return;
    }
    setSelectedProduct(item);
    setCurrentView('productDetail');
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch (currentView) {
      case 'search':
        return (
          <SearchView 
            onClose={() => handleNavigateWithFilter('home')} 
            onSelectItem={handleSelectProduct}
            initialQuery={categoryFilter !== 'ALL' ? categoryFilter : ''}
          />
        );
      case 'community':
        return <CommunityView />;
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'mypage':
        return isLoggedIn ? <MyPageView onLogout={handleLogout} /> : <LoginView onLogin={handleLogin} />;
      case 'magazine':
        return <MagazineView />;
      case 'event':
        return <EventView />;
      case 'cart':
        return <CartView onContinueShopping={() => handleNavigateWithFilter('home')} />;
      case 'productDetail':
        return selectedProduct ? (
          <ProductDetailView 
            item={selectedProduct} 
            onBack={() => handleNavigateWithFilter('home')} 
          />
        ) : <RecommendationSection filter={categoryFilter} onSelectItem={handleSelectProduct} />;
      default:
        return (
          <>
            <MainBanner 
              onSelectItem={handleSelectProduct} 
              onStartAI={() => setIsAIModalOpen(true)} 
            />
            <RecommendationSection filter={categoryFilter} onSelectItem={handleSelectProduct} />
            <MissionSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      <Header 
        onToggleMenu={() => setIsMenuOpen(true)} 
        onNavigate={(view: View) => handleNavigateWithFilter(view, 'ALL')}
        onSearch={(query) => handleNavigateWithFilter('search', query)}
        currentView={currentView}
        isLoggedIn={isLoggedIn}
      />
      
      <CategoryModal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={(cat) => {
          setIsMenuOpen(false);
          const aiServices = ['오늘의 코디 추천', '디지털 옷장 관리', 'AI 스타일 분석'];
          const communityServices = ['A/B 코디 투표', '스타일 쉐어링'];
          
          if (aiServices.includes(cat)) {
            setIsAIModalOpen(true);
          } else if (communityServices.includes(cat)) {
            setCurrentView('community');
          } else {
            // Navigate to search for product categories
            handleNavigateWithFilter('search', cat);
          }
        }}
      />

      <AIStylingModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer 
        onNavigate={(view: View) => handleNavigateWithFilter(view)} 
        onStartAI={() => setIsAIModalOpen(true)} 
      />

      <FloatingAIButton onClick={() => setIsAIModalOpen(true)} />
    </div>
  );
}

function MissionSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 border-y border-gray-200">
      <div className="max-w-4xl mx-auto text-center px-6">
        <p className="text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase mb-4 md:mb-6 text-gray-400">Our Mission</p>
        <h2 className="text-3xl md:text-5xl font-serif italic font-black mb-6 md:mb-8 tracking-tighter text-balance leading-tight">
          "당신의 옷장에 잠든 가능성을 깨우는 가장 스마트한 방법"
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10 text-balance">
          SYDO는 단순히 옷을 추천하는 것을 넘어, 당신이 이미 소유한 아이템들을 가장 가치 있게 활용할 수 있도록 돕습니다. 
          AI 기술과 패션 큐레이션이 만나 탄생한 당신만의 디지털 스타일리스트를 경험해보세요.
        </p>
        <button 
          onClick={() => alert('SYDO 서비스 소개 페이지는 준비 중입니다.')}
          className="px-8 md:px-10 py-3 md:py-4 bg-black text-white text-[10px] md:text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          ABOUT SYDO
        </button>
      </div>
    </section>
  );
}

interface FooterProps {
  onNavigate: (view: View) => void;
  onStartAI: () => void;
}

function Footer({ onNavigate, onStartAI }: FooterProps) {
  const handleJoinNewsletter = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert('구독해주셔서 감사합니다! 최신 스타일 레터를 보내드릴게요.');
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12 md:py-16 px-6 md:px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <div className="text-2xl font-black tracking-tighter mb-4 md:mb-6">SYDO</div>
          <p className="text-[10px] md:text-[11px] text-gray-400 leading-relaxed">
            (주) 시도 | 대표이사: 시도 | 평택대 123<br />
            사업자등록번호: 123-45-67890 | 통신판매업신고: 2024-1234-0000
          </p>
        </div>
        <div>
          <h5 className="text-[10px] md:text-[11px] font-black tracking-widest uppercase mb-4 md:mb-6">Support</h5>
          <ul className="text-[10px] md:text-[11px] text-gray-500 space-y-2 md:space-y-3">
            <li onClick={() => alert('준비 중')} className="hover:text-black cursor-pointer transition-colors">공지사항</li>
            <li onClick={() => alert('준비 중')} className="hover:text-black cursor-pointer transition-colors">자주 묻는 질문</li>
            <li onClick={() => alert('준비 중')} className="hover:text-black cursor-pointer transition-colors">1:1 문의</li>
            <li onClick={() => alert('준비 중')} className="hover:text-black cursor-pointer transition-colors">이용약관</li>
          </ul>
        </div>
        <div>
          <h5 className="text-[10px] md:text-[11px] font-black tracking-widest uppercase mb-4 md:mb-6">Services</h5>
          <ul className="text-[10px] md:text-[11px] text-gray-500 space-y-2 md:space-y-3">
            <li onClick={onStartAI} className="hover:text-black cursor-pointer transition-colors">디지털 옷장</li>
            <li onClick={onStartAI} className="hover:text-black cursor-pointer transition-colors">AI 코디 추천</li>
            <li onClick={() => alert('스타일 쉐어링 서비스 준비 중')} className="hover:text-black cursor-pointer transition-colors">스타일 쉐어링</li>
            <li onClick={() => onNavigate('magazine')} className="hover:text-black cursor-pointer transition-colors">매거진</li>
          </ul>
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <h5 className="text-[10px] md:text-[11px] font-black tracking-widest uppercase mb-4 md:mb-6">Newsletter</h5>
          <p className="text-[10px] md:text-[11px] text-gray-500 mb-4">매주 새로운 스타일링 팁과 혜택을 받아보세요.</p>
          <div className="flex border-b border-black pb-2" onClick={handleJoinNewsletter}>
            <input type="email" placeholder="Email Address" className="bg-transparent text-[10px] md:text-[11px] outline-none flex-grow" />
            <button className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] md:text-[10px] text-gray-300 uppercase tracking-widest">© 2024 SYDO. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4 md:gap-6 text-[9px] md:text-[10px] text-gray-300 uppercase tracking-widest font-bold">
          <span className="hover:text-black cursor-pointer transition-colors">Instagram</span>
          <span className="hover:text-black cursor-pointer transition-colors">Pinterest</span>
          <span className="hover:text-black cursor-pointer transition-colors">Twitter</span>
        </div>
      </div>
    </footer>
  );
}

