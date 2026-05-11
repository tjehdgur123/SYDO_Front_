import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      alert('이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 md:py-32">
      <motion.div
        key={isSignUp ? 'signup' : 'login'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 uppercase">
          {isSignUp ? 'Join SYDO' : 'Welcome Back'}
        </h2>
        <p className="text-xs md:text-sm text-gray-400 tracking-tight">
          {isSignUp ? '당신만의 디지털 옷장을 시작해보세요.' : 'SYDO와 함께 당신의 스타일을 완성하세요.'}
        </p>
      </motion.div>

      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] block mb-2 text-gray-400 group-focus-within:text-black transition-colors">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-0 text-gray-300 group-focus-within:text-black transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-200 py-3 pl-8 outline-none text-sm focus:border-black transition-colors font-medium" 
                placeholder="example@sydo.com" 
              />
            </div>
          </div>

          <div className="relative group">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] block mb-2 text-gray-400 group-focus-within:text-black transition-colors">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-0 text-gray-300 group-focus-within:text-black transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-200 py-3 pl-8 outline-none text-sm focus:border-black transition-colors font-medium" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="group w-full bg-black text-white py-5 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
          >
            {isSignUp ? 'Create Account' : 'Login'}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest">
            <span className="bg-white px-4 text-gray-300">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => alert('Google 로그인 서비스는 안정화 작업 중입니다.')}
            className="flex items-center justify-center gap-3 border border-gray-100 p-4 hover:border-black transition-colors group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" height="18" alt="Google" />
            <span className="text-[9px] font-black uppercase tracking-widest">Google</span>
          </button>
          <button 
            onClick={() => alert('GitHub 로그인 서비스는 안정화 작업 중입니다.')}
            className="flex items-center justify-center gap-3 border border-gray-100 p-4 hover:border-black transition-colors group"
          >
            <Github size={18} />
            <span className="text-[9px] font-black uppercase tracking-widest">GitHub</span>
          </button>
        </div>

        <div className="pt-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-black hover:underline cursor-pointer"
            >
              {isSignUp ? 'Login Now' : 'Sign Up Free'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
