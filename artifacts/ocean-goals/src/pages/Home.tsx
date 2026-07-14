import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomCreatureType, CreatureGraphic } from '../components/Creatures';
import { Sparkles, Check, X, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TimeSpan = '3months' | '6months' | '9months';

type Goal = {
  id: string;
  text: string;
  timeSpan: TimeSpan;
  creatureType: string;
  completed: boolean;
  createdAt: number;
};

type Physics = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const CREATURE_SIZE = 110;
const SEABED_H = 100;
const MAX_SPEED = 0.35;
const MIN_DIST = CREATURE_SIZE * 1.4;
const TIME_LABELS: Record<TimeSpan, string> = {
  '3months': '3 months',
  '6months': '6 months',
  '9months': '9 months',
};
const TIME_COLORS: Record<TimeSpan, string> = {
  '3months': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  '6months': 'bg-violet-100 text-violetald-700 border-violet-200',
  '9months': 'bg-rose-100 text-rose-700 border-rose-200',
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export default function Home() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('ocean-goals-v2', []);
  const [inputValue, setInputValue] = useState('');
  const [timeSpan, setTimeSpan] = useState<TimeSpan>('3months');
  const [isAdding, setIsAdding] = useState(false);

  const oceanRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<Map<string, Physics>>(new Map());
  const elemsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const rafRef = useRef<number>(0);
  const goalsRef = useRef(goals);
  goalsRef.current = goals;

  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;

  // Sync physics map when goals change
  useEffect(() => {
    const ocean = oceanRef.current;
    if (!ocean) return;
    const W = ocean.clientWidth;
    const H = ocean.clientHeight;
    const maxX = W - CREATURE_SIZE;
    const maxY = H - CREATURE_SIZE - SEABED_H;
    const physics = physicsRef.current;
    const ids = new Set(goals.map(g => g.id));

    // Remove old
    for (const id of physics.keys()) {
      if (!ids.has(id)) physics.delete(id);
    }

    // Add new
    for (const goal of goals) {
      if (!physics.has(goal.id)) {
        physics.set(goal.id, {
          x: clamp(Math.random() * maxX, 0, maxX),
          y: clamp(Math.random() * maxY * 0.85, 0, maxY),
          vx: (Math.random() - 0.5) * MAX_SPEED * 2,
          vy: (Math.random() - 0.5) * MAX_SPEED,
        });
      }
    }
  }, [goals]);

  // Physics animation loop
  const animate = useCallback(() => {
    const ocean = oceanRef.current;
    if (!ocean) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    const W = ocean.clientWidth;
    const H = ocean.clientHeight;
    const maxX = W - CREATURE_SIZE;
    const maxY = H - CREATURE_SIZE - SEABED_H;

    const physics = physicsRef.current;
    const entries = Array.from(physics.entries());

    // Separation forces
    for (let i = 0; i < entries.length; i++) {
      const [, posA] = entries[i];
      for (let j = i + 1; j < entries.length; j++) {
        const [, posB] = entries[j];
        const dx = posA.x - posB.x;
        const dy = posA.y - posB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MIN_DIST && dist > 0.5) {
          const force = ((MIN_DIST - dist) / MIN_DIST) * 0.06;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          posA.vx += fx;
          posA.vy += fy;
          posB.vx -= fx;
          posB.vy -= fy;
        }
      }
    }

    // Integrate & bounce
    for (const [id, pos] of physics) {
      // Gentle random drift to keep things lively
      pos.vx += (Math.random() - 0.5) * 0.01;
      pos.vy += (Math.random() - 0.5) * 0.005;

      pos.vx = clamp(pos.vx, -MAX_SPEED, MAX_SPEED);
      pos.vy = clamp(pos.vy, -MAX_SPEED * 0.6, MAX_SPEED * 0.6);

      pos.x += pos.vx;
      pos.y += pos.vy;

      if (pos.x <= 0) { pos.x = 0; pos.vx = Math.abs(pos.vx) * 0.8; }
      if (pos.x >= maxX) { pos.x = maxX; pos.vx = -Math.abs(pos.vx) * 0.8; }
      if (pos.y <= 0) { pos.y = 0; pos.vy = Math.abs(pos.vy) * 0.8; }
      if (pos.y >= maxY) { pos.y = maxY; pos.vy = -Math.abs(pos.vy) * 0.8; }

      const el = elemsRef.current.get(id);
      if (el) {
        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleAddGoal = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);

    const newGoal: Goal = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      timeSpan,
      creatureType: getRandomCreatureType(),
      completed: false,
      createdAt: Date.now(),
    };

    setGoals([...goals, newGoal]);
    setInputValue('');
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id: string) => {
    elemsRef.current.delete(id);
    physicsRef.current.delete(id);
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #fff5ee 0%, #fce9d8 30%)' }}>

      {/* Header */}
      <div className="w-full relative z-20 pt-10 pb-20 px-6 flex flex-col items-center">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-7">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1e5a73] tracking-tight mb-2">Ocean Goals</h1>
          <p className="text-lg text-[#3b82a0] font-medium opacity-75">your dreams, swimming in the deep</p>
        </motion.div>

        {/* Stats */}
        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50 text-[#1e5a73] font-semibold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          {completedCount} of {totalCount} achieved
        </div>

        {/* Input */}
        <form onSubmit={handleAddGoal} className="w-full max-w-xl relative z-30 flex flex-col items-center gap-3">
          <div className="relative flex items-center w-full">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What's your next dream?"
              data-testid="input-goal"
              className="w-full h-14 pl-6 pr-36 rounded-full text-lg shadow-lg border-2 border-white/60 bg-white/90 backdrop-blur-sm focus-visible:ring-[#f06292] focus-visible:border-[#f06292] text-[#1e5a73] placeholder:text-[#3b82a0]/40"
            />
            <Button
              type="submit"
              data-testid="button-release"
              className="absolute right-2 h-10 px-5 rounded-full bg-[#f06292] hover:bg-[#e91e63] text-white font-semibold transition-transform active:scale-95"
            >
              Release!
            </Button>
            <AnimatePresence>
              {isAdding && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -inset-4 pointer-events-none z-50 flex items-center justify-center"
                >
                  <Sparkles className="w-10 h-10 text-pink-400 absolute top-0 right-12" />
                  <Sparkles className="w-7 h-7 text-amber-400 absolute bottom-0 left-10" />
                  <Sparkles className="w-9 h-9 text-blue-400 absolute top-2 left-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Timespan selector */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3b82a0] opacity-60" />
            <span className="text-sm text-[#3b82a0] opacity-70 mr-1">Goal timeline:</span>
            {(['3months', '6months', '9months'] as TimeSpan[]).map(ts => (
              <button
                key={ts}
                type="button"
                data-testid={`button-timespan-${ts}`}
                onClick={() => setTimeSpan(ts)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  timeSpan === ts
                    ? 'bg-[#f06292] text-white border-[#f06292] scale-105 shadow-md'
                    : 'bg-white/70 text-[#3b82a0] border-white/50 hover:bg-white'
                }`}
              >
                {TIME_LABELS[ts]}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Ocean */}
      <div ref={oceanRef} className="flex-1 w-full relative z-10" style={{ background: 'linear-gradient(to bottom, #b8e8f0 0%, #8dd4e0 60%, #6ec4d4 100%)' }}>

        {/* Wave horizon */}
        <div className="absolute top-[-28px] left-0 right-0 w-full h-[56px] overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="w-full h-full" style={{ fill: '#b8e8f0' }}>
            <path d="M0,28 C150,0 350,56 600,28 C850,0 1050,56 1200,28 L1200,56 L0,56 Z" />
          </svg>
        </div>

        {/* Light rays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <div className="absolute top-0 left-[15%] w-24 h-full bg-gradient-to-b from-white to-transparent -skew-x-6 blur-2xl" />
          <div className="absolute top-0 left-[40%] w-40 h-full bg-gradient-to-b from-white to-transparent -skew-x-12 blur-3xl" />
          <div className="absolute top-0 left-[72%] w-20 h-full bg-gradient-to-b from-white to-transparent -skew-x-6 blur-2xl" />
        </div>

        {/* Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 18 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/50 bg-white/10 animate-bubble"
              style={{
                left: `${5 + (i * 5.3) % 90}%`,
                animationDelay: `${(i * 0.7) % 12}s`,
                animationDuration: `${9 + (i * 1.1) % 6}s`,
                width: `${4 + (i * 2.3) % 10}px`,
                height: `${4 + (i * 2.3) % 10}px`,
              }}
            />
          ))}
        </div>

        {/* Creatures */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence>
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ type: 'spring', damping: 14, stiffness: 80 }}
                ref={(el) => {
                  if (el) elemsRef.current.set(goal.id, el);
                  else elemsRef.current.delete(goal.id);
                }}
                className="absolute"
                style={{ top: 0, left: 0, willChange: 'transform' }}
                data-testid={`creature-${goal.id}`}
              >
                <div className={`relative group flex flex-col items-center gap-2 ${goal.completed ? 'drop-shadow-[0_0_18px_rgba(251,192,45,0.9)]' : ''}`}>

                  {/* Creature */}
                  <div className="relative">
                    <CreatureGraphic
                      type={goal.creatureType}
                      size={CREATURE_SIZE}
                      className={`transition-all duration-700 select-none ${goal.completed ? 'scale-110' : ''}`}
                    />
                    {goal.completed && (
                      <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-2xl -z-10 animate-pulse" />
                    )}
                  </div>

                  {/* Label */}
                  <div className={`px-3 py-1.5 rounded-2xl text-xs font-semibold max-w-[140px] text-center shadow-sm backdrop-blur-md transition-all duration-500 ${
                    goal.completed
                      ? 'bg-amber-100/90 text-amber-900 border-2 border-amber-300/60 line-through'
                      : 'bg-white/90 text-[#1e5a73] border border-white/60'
                  }`}>
                    {goal.text}
                    <div className={`mt-1 text-[10px] font-medium rounded-full px-1.5 py-0.5 inline-block ${
                      goal.timeSpan === '3months' ? 'text-emerald-600' :
                      goal.timeSpan === '6months' ? 'text-violet-600' : 'text-rose-500'
                    }`}>
                      {TIME_LABELS[goal.timeSpan]}
                    </div>
                  </div>

                  {/* Complete / Undo button */}
                  {!goal.completed ? (
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      data-testid={`button-complete-${goal.id}`}
                      title="Mark done"
                      className="absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full shadow-lg border-2 border-[#81c784] text-[#4caf50] flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all hover:bg-[#e8f5e9] cursor-pointer z-10"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      data-testid={`button-undo-${goal.id}`}
                      title="Mark undone"
                      className="absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full shadow-lg border-2 border-rose-300 text-rose-400 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all hover:bg-rose-50 cursor-pointer z-10"
                    >
                      <X className="w-4 h-4 stroke-[3]" />
                    </button>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    data-testid={`button-delete-${goal.id}`}
                    title="Remove goal"
                    className="absolute -top-3 -left-3 w-9 h-9 bg-white rounded-full shadow-lg border-2 border-slate-200 text-slate-400 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all hover:bg-red-50 hover:border-red-300 hover:text-red-400 cursor-pointer z-10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Seabed decorations */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: `${SEABED_H + 20}px` }}>
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sandy floor */}
            <path d="M0 80 Q300 70 600 80 Q900 90 1200 75 L1200 120 L0 120Z" fill="#c8e6b0" opacity="0.4" />

            {/* Seaweed cluster 1 */}
            <path className="animate-sway origin-bottom" d="M60 120 Q75 85 65 50 Q50 85 60 120" fill="#4caf50" opacity="0.85" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '0.8s' }} d="M78 120 Q90 90 80 55 Q65 90 78 120" fill="#66bb6a" opacity="0.7" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '0.3s' }} d="M48 120 Q58 95 50 68 Q38 95 48 120" fill="#388e3c" opacity="0.6" />

            {/* Coral bush 1 - pink */}
            <circle cx="200" cy="105" r="12" fill="#f48fb1" opacity="0.9" />
            <circle cx="215" cy="98" r="9" fill="#f06292" opacity="0.85" />
            <circle cx="190" cy="100" r="8" fill="#ec407a" opacity="0.8" />
            <circle cx="207" cy="91" r="7" fill="#f48fb1" opacity="0.75" />
            <rect x="205" y="105" width="4" height="15" rx="2" fill="#c2185b" opacity="0.6" />

            {/* Coral bush 2 - orange */}
            <circle cx="370" cy="108" r="10" fill="#ffab76" opacity="0.9" />
            <circle cx="382" cy="101" r="8" fill="#ff8a65" opacity="0.85" />
            <circle cx="360" cy="103" r="7" fill="#ff7043" opacity="0.8" />
            <circle cx="375" cy="95" r="6" fill="#ffab76" opacity="0.7" />
            <rect x="373" y="108" width="3" height="12" rx="2" fill="#e64a19" opacity="0.6" />

            {/* Seaweed cluster 2 */}
            <path className="animate-sway origin-bottom" style={{ animationDelay: '1.2s' }} d="M450 120 Q465 80 455 40 Q438 80 450 120" fill="#388e3c" opacity="0.8" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '0.5s' }} d="M468 120 Q480 88 472 55 Q456 88 468 120" fill="#4caf50" opacity="0.9" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '1.8s' }} d="M436 120 Q448 92 440 65 Q426 92 436 120" fill="#81c784" opacity="0.7" />

            {/* Anemone - purple */}
            <ellipse cx="580" cy="115" rx="18" ry="6" fill="#9575cd" opacity="0.5" />
            <path d="M570 115 Q568 100 570 88" stroke="#7e57c2" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M576 115 Q574 98 578 84" stroke="#9575cd" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M582 115 Q582 97 582 83" stroke="#7e57c2" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M588 115 Q590 100 586 87" stroke="#9575cd" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="570" cy="88" r="4" fill="#ce93d8" />
            <circle cx="578" cy="84" r="4" fill="#b39ddb" />
            <circle cx="582" cy="83" r="4" fill="#ce93d8" />
            <circle cx="586" cy="87" r="4" fill="#b39ddb" />

            {/* Seaweed cluster 3 */}
            <path className="animate-sway origin-bottom" style={{ animationDelay: '0.9s' }} d="M700 120 Q715 82 705 45 Q688 82 700 120" fill="#4caf50" opacity="0.85" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '1.5s' }} d="M718 120 Q730 90 720 58 Q704 90 718 120" fill="#66bb6a" opacity="0.7" />

            {/* Starfish */}
            <g transform="translate(820, 108) scale(0.7)">
              <path d="M0,-20 L4,-7 L18,-7 L7,0 L11,14 L0,6 L-11,14 L-7,0 L-18,-7 L-4,-7 Z" fill="#ff8a65" opacity="0.9" />
            </g>

            {/* Coral bush 3 - teal */}
            <circle cx="920" cy="106" r="11" fill="#4dd0e1" opacity="0.85" />
            <circle cx="933" cy="99" r="8" fill="#26c6da" opacity="0.8" />
            <circle cx="910" cy="101" r="7" fill="#00bcd4" opacity="0.75" />
            <circle cx="925" cy="93" r="6" fill="#4dd0e1" opacity="0.7" />
            <rect x="922" y="106" width="3" height="14" rx="2" fill="#0097a7" opacity="0.6" />

            {/* Seaweed cluster 4 */}
            <path className="animate-sway origin-bottom" style={{ animationDelay: '0.2s' }} d="M1050 120 Q1065 83 1055 48 Q1038 83 1050 120" fill="#388e3c" opacity="0.8" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '1.1s' }} d="M1068 120 Q1080 90 1072 57 Q1056 90 1068 120" fill="#4caf50" opacity="0.9" />
            <path className="animate-sway origin-bottom" style={{ animationDelay: '0.6s' }} d="M1036 120 Q1046 94 1040 68 Q1026 94 1036 120" fill="#81c784" opacity="0.65" />

            {/* Small pebbles */}
            <ellipse cx="150" cy="118" rx="8" ry="4" fill="#90a4ae" opacity="0.5" />
            <ellipse cx="310" cy="116" rx="6" ry="3" fill="#b0bec5" opacity="0.4" />
            <ellipse cx="640" cy="119" rx="10" ry="4" fill="#90a4ae" opacity="0.4" />
            <ellipse cx="860" cy="117" rx="7" ry="3" fill="#b0bec5" opacity="0.5" />
            <ellipse cx="1130" cy="118" rx="9" ry="4" fill="#90a4ae" opacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
