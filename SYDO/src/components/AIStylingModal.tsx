import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';
import { getStylingAdvice } from '../services/geminiService';

interface AIStylingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIStylingModal({ isOpen, onClose }: AIStylingModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    try {
      const result = await getStylingAdvice(selectedImage);
      setAnalysisResult(result);
    } catch (error) {
      alert(error instanceof Error ? error.message : '분석 실패');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000]"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:h-[650px] bg-white rounded-3xl shadow-2xl z-[1001] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-sydo-accent" />
                <h3 className="text-lg font-black tracking-tighter">AI 스타일 분석</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {!selectedImage ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-all group"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={24} className="text-gray-400 group-hover:text-black" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-sm mb-1">사진을 업로드하거나 끌어다 놓으세요</p>
                    <p className="text-xs text-gray-400">분석하고 싶은 아이템 사진을 선택해주세요</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner">
                    <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
                    {!isAnalyzing && !analysisResult && (
                      <button 
                        onClick={reset}
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black transition-colors"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="py-8 text-center space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="inline-block"
                      >
                        <Sparkles size={32} className="text-sydo-accent" />
                      </motion.div>
                      <p className="text-sm font-bold animate-pulse">AI가 스타일을 분석하고 있습니다...</p>
                    </div>
                  )}

                  {analysisResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-sydo-pink/30 p-6 rounded-2xl border border-sydo-pink"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-sydo-accent rounded-full" />
                        <p className="text-[10px] font-black tracking-widest uppercase text-sydo-accent">Analysis Detail</p>
                      </div>
                      <div className="prose prose-sm max-w-none text-gray-800">
                        <Markdown>{analysisResult}</Markdown>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
              {selectedImage && !isAnalyzing && !analysisResult && (
                <button 
                  onClick={startAnalysis}
                  className="w-full bg-black text-white py-4 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  분석 시작하기
                </button>
              )}
              {analysisResult && (
                <button 
                  onClick={reset}
                  className="w-full border border-black py-4 rounded-xl text-xs font-black tracking-widest uppercase hover:bg-gray-50 transition-colors"
                >
                  다른 사진 업로드
                </button>
              )}
              {!selectedImage && (
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Powered by SYDO AI Engine
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
