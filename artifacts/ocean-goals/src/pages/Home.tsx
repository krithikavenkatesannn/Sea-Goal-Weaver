import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { motion, AnimatePresence } from 'framer-motion';
import { CREATURE_TYPES, getRandomCreatureType, CreatureGraphic } from '../components/Creatures';
import { Sparkles, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Goal = {
  id: string;
  text: string;
  creatureType: string;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  completed: boolean;
  createdAt: number;
};

export default function Home() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('ocean-goals', []);
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;

  const handleAddGoal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    setIsAdding(true);
    
    // Sparkle effect at input
    setTimeout(() => setIsAdding(false), 600);

    const newGoal: Goal = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      creatureType: getRandomCreatureType(),
      x: 10 + Math.random() * 80, // 10% to 90%
      y: 10 + Math.random() * 70, // 10% to 80% (keep away from very bottom)
      completed: false,
      createdAt: Date.now(),
    };

    setGoals([...goals, newGoal]);
    setInputValue('');
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-b from-[#fdf6ee] to-[#fdf6ee]">
      {/* Sky & Header Area */}
      <div className="w-full relative z-20 pt-12 pb-24 px-6 md:px-12 flex flex-col items-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#1e5a73] tracking-tight mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            Ocean Goals
          </h1>
          <p className="text-xl text-[#3b82a0] font-medium opacity-80">
            your dreams, swimming in the deep
          </p>
        </motion.div>

        {/* Stats Pill */}
        <div className="absolute top-6 right-6 md:top-8 md:right-12 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50 text-[#1e5a73] font-semibold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          {completedCount} of {totalCount} goals achieved
        </div>

        {/* Input Area */}
        <form onSubmit={handleAddGoal} className="w-full max-w-lg relative z-30">
          <div className="relative flex items-center group">
            <Input 
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What's your next dream?"
              className="w-full h-14 pl-6 pr-32 rounded-full text-lg shadow-lg border-2 border-white/50 bg-white/90 backdrop-blur-sm focus-visible:ring-[#f06292] focus-visible:border-[#f06292] text-[#1e5a73] placeholder:text-[#3b82a0]/50"
            />
            <Button 
              type="submit" 
              size="sm"
              className="absolute right-2 h-10 px-6 rounded-full bg-[#f06292] hover:bg-[#e91e63] text-white shadow-sm font-semibold text-base transition-transform active:scale-95"
            >
              Release!
            </Button>
            
            {/* Input Sparkle Burst Animation */}
            <AnimatePresence>
              {isAdding && (
                <motion.div 
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -inset-4 pointer-events-none z-50 flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-pink-400 absolute top-0 right-10" />
                  <Sparkles className="w-8 h-8 text-amber-400 absolute bottom-0 left-10" />
                  <Sparkles className="w-10 h-10 text-blue-400 absolute top-2 left-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>

      {/* The Ocean */}
      <div className="flex-1 w-full relative z-10 bg-gradient-to-b from-[#b8e8f0] to-[#7ec8d4]">
        {/* Ocean Surface Line / Waves */}
        <div className="absolute top-[-30px] left-0 right-0 w-full h-[60px] overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-[#b8e8f0] fill-current scale-x-[2.0]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.42,126.3,190.75,108.62Z"></path>
          </svg>
        </div>

        {/* Light Caustics / Rays */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay flex justify-around">
          <div className="w-32 h-full bg-gradient-to-b from-white to-transparent transform -skew-x-12 blur-2xl opacity-50"></div>
          <div className="w-48 h-full bg-gradient-to-b from-white to-transparent transform -skew-x-12 blur-3xl opacity-30"></div>
          <div className="w-24 h-full bg-gradient-to-b from-white to-transparent transform -skew-x-12 blur-2xl opacity-60"></div>
        </div>

        {/* Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-3 h-3 rounded-full border border-white/40 bg-white/10 animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 5}s`,
                width: `${4 + Math.random() * 12}px`,
                height: `${4 + Math.random() * 12}px`,
              }}
            />
          ))}
        </div>

        {/* Creatures */}
        <div className="absolute inset-0 pointer-events-none px-12 py-12">
          <AnimatePresence>
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ x: -100, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 60 }}
                className="absolute pointer-events-auto"
                style={{ 
                  left: `${goal.x}%`, 
                  top: `${goal.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`relative group animate-float flex flex-col items-center gap-3 transition-all duration-1000 ${goal.completed ? 'drop-shadow-[0_0_15px_rgba(251,192,45,0.8)]' : 'hover:drop-shadow-xl'}`}>
                  
                  {/* The Creature SVG */}
                  <div className="relative">
                    <CreatureGraphic 
                      type={goal.creatureType} 
                      size={100} 
                      className={`transition-all duration-700 ${goal.completed ? 'scale-110' : ''}`}
                    />
                    
                    {/* Completion Glow Aura */}
                    {goal.completed && (
                      <div className="absolute inset-0 rounded-full bg-amber-300/20 blur-xl -z-10 animate-pulse" />
                    )}
                  </div>

                  {/* Goal Label */}
                  <div className={`
                    px-4 py-2 rounded-2xl text-sm font-semibold max-w-[160px] text-center shadow-sm backdrop-blur-md transition-all duration-500
                    ${goal.completed 
                      ? 'bg-amber-100/90 text-amber-900 border-2 border-amber-300/50 line-through opacity-80' 
                      : 'bg-white/90 text-[#1e5a73] border border-white/50'}
                  `}>
                    {goal.text}
                  </div>

                  {/* Complete Button (Hover) */}
                  {!goal.completed ? (
                    <button 
                      onClick={() => toggleGoal(goal.id)}
                      data-testid={`button-complete-${goal.id}`}
                      className="absolute -right-4 -top-4 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-[#81c784] text-[#4caf50] flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all hover:bg-[#e8f5e9] cursor-pointer"
                    >
                      <Check className="w-5 h-5 stroke-[3]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      data-testid={`button-undo-${goal.id}`}
                      title="Mark as not done"
                      className="absolute -right-4 -top-4 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-rose-300 text-rose-400 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all hover:bg-rose-50 cursor-pointer"
                    >
                      <X className="w-5 h-5 stroke-[3]" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Seaweed / Bottom Decor */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none flex items-end justify-around opacity-90">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="animate-sway origin-bottom" d="M100 100 Q 120 50 110 0 Q 90 50 100 100" fill="#4caf50" opacity="0.8"/>
            <path className="animate-sway origin-bottom" style={{animationDelay: '1s'}} d="M120 100 Q 140 60 125 10 Q 105 60 120 100" fill="#81c784" opacity="0.6"/>
            
            <path className="animate-sway origin-bottom" style={{animationDelay: '0.5s'}} d="M400 100 Q 380 40 395 0 Q 415 40 400 100" fill="#388e3c" opacity="0.7"/>
            <path className="animate-sway origin-bottom" style={{animationDelay: '1.5s'}} d="M380 100 Q 360 60 370 20 Q 390 60 380 100" fill="#4caf50" opacity="0.9"/>
            
            <path className="animate-sway origin-bottom" style={{animationDelay: '2s'}} d="M800 100 Q 820 30 805 -10 Q 785 30 800 100" fill="#66bb6a" opacity="0.8"/>
            
            <path className="animate-sway origin-bottom" style={{animationDelay: '0.2s'}} d="M900 100 Q 880 50 895 10 Q 915 50 900 100" fill="#4caf50" opacity="0.7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
