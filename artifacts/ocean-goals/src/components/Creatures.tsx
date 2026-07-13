import React from 'react';

// Common SVG props
export interface CreatureProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const BlueSpottedFish = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size} height={size} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Tail */}
    <path d="M40 50L10 25C8 23 5 25 5 28L15 50L5 72C5 75 8 77 10 75L40 50Z" fill="#42A5F5" stroke="#1E88E5" strokeWidth="4" strokeLinejoin="round"/>
    {/* Body */}
    <ellipse cx="70" cy="50" rx="40" ry="30" fill="#64B5F6" stroke="#1E88E5" strokeWidth="4" />
    {/* Spots */}
    <circle cx="55" cy="40" r="4" fill="#1E88E5" />
    <circle cx="65" cy="65" r="5" fill="#1E88E5" />
    <circle cx="80" cy="35" r="3" fill="#1E88E5" />
    {/* Eye */}
    <circle cx="90" cy="45" r="7" fill="white" />
    <circle cx="92" cy="45" r="3" fill="#1A237E" />
    {/* Smile */}
    <path d="M95 60C95 60 100 65 105 60" stroke="#1E88E5" strokeWidth="3" strokeLinecap="round" />
    {/* Fin */}
    <path d="M60 55C60 55 65 70 75 65" stroke="#1E88E5" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const OrangeStripedFish = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size} height={size} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Tail */}
    <path d="M30 50L5 20C2 17 -1 20 1 24L10 50L1 76C-1 80 2 83 5 80L30 50Z" fill="#FF7043" stroke="#E64A19" strokeWidth="4" strokeLinejoin="round"/>
    {/* Body */}
    <path d="M30 50C30 20 70 10 95 35C115 55 105 85 70 90C40 90 30 70 30 50Z" fill="#FFB74D" stroke="#F57C00" strokeWidth="4" />
    {/* Stripes */}
    <path d="M45 25C45 25 55 50 45 75" stroke="#FF7043" strokeWidth="6" strokeLinecap="round" />
    <path d="M65 20C65 20 75 50 65 85" stroke="#FF7043" strokeWidth="6" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="85" cy="45" r="6" fill="white" />
    <circle cx="87" cy="45" r="3" fill="black" />
    {/* Mouth */}
    <path d="M98 60C98 60 102 65 105 60" stroke="#E64A19" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Jellyfish = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Tentacles */}
    <path d="M30 60C30 80 20 90 30 110" stroke="#CE93D8" strokeWidth="5" strokeLinecap="round" />
    <path d="M50 60C50 85 40 95 50 115" stroke="#BA68C8" strokeWidth="5" strokeLinecap="round" />
    <path d="M70 60C70 80 80 90 70 110" stroke="#CE93D8" strokeWidth="5" strokeLinecap="round" />
    {/* Body */}
    <path d="M20 60C20 20 80 20 80 60C80 65 20 65 20 60Z" fill="#E1BEE7" stroke="#AB47BC" strokeWidth="4" strokeLinejoin="round" />
    {/* Frill */}
    <path d="M20 60C30 65 40 55 50 60C60 65 70 55 80 60" stroke="#AB47BC" strokeWidth="4" strokeLinecap="round" />
    {/* Eyes */}
    <circle cx="40" cy="45" r="4" fill="#4A148C" />
    <circle cx="60" cy="45" r="4" fill="#4A148C" />
    {/* Blush */}
    <ellipse cx="33" cy="50" rx="4" ry="2" fill="#F48FB1" opacity="0.6" />
    <ellipse cx="67" cy="50" rx="4" ry="2" fill="#F48FB1" opacity="0.6" />
  </svg>
);

const SeaTurtle = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size * 1.2} height={size} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Flippers */}
    <path d="M40 30C30 10 10 20 20 40Z" fill="#81C784" stroke="#388E3C" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M40 70C30 90 10 80 20 60Z" fill="#81C784" stroke="#388E3C" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M80 30C90 10 110 20 100 40Z" fill="#81C784" stroke="#388E3C" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M80 70C90 90 110 80 100 60Z" fill="#81C784" stroke="#388E3C" strokeWidth="3" strokeLinejoin="round"/>
    {/* Head */}
    <ellipse cx="100" cy="50" rx="15" ry="12" fill="#A5D6A7" stroke="#388E3C" strokeWidth="3" />
    {/* Eyes */}
    <circle cx="105" cy="45" r="3" fill="black" />
    {/* Shell */}
    <ellipse cx="60" cy="50" rx="35" ry="28" fill="#4CAF50" stroke="#2E7D32" strokeWidth="4" />
    {/* Shell Pattern */}
    <path d="M45 40L60 30L75 40L75 60L60 70L45 60Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="2" strokeLinejoin="round" />
    <path d="M45 40L35 30" stroke="#2E7D32" strokeWidth="2" />
    <path d="M60 30L60 22" stroke="#2E7D32" strokeWidth="2" />
    <path d="M75 40L85 30" stroke="#2E7D32" strokeWidth="2" />
    <path d="M75 60L85 70" stroke="#2E7D32" strokeWidth="2" />
    <path d="M60 70L60 78" stroke="#2E7D32" strokeWidth="2" />
    <path d="M45 60L35 70" stroke="#2E7D32" strokeWidth="2" />
  </svg>
);

const Octopus = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Tentacles */}
    <path d="M25 65C15 80 5 70 15 90C20 100 30 95 25 85" fill="none" stroke="#F06292" strokeWidth="8" strokeLinecap="round" />
    <path d="M40 70C35 90 25 85 35 105C40 110 50 105 45 95" fill="none" stroke="#EC407A" strokeWidth="8" strokeLinecap="round" />
    <path d="M60 70C65 90 75 85 65 105C60 110 50 105 55 95" fill="none" stroke="#F06292" strokeWidth="8" strokeLinecap="round" />
    <path d="M75 65C85 80 95 70 85 90C80 100 70 95 75 85" fill="none" stroke="#EC407A" strokeWidth="8" strokeLinecap="round" />
    {/* Head */}
    <path d="M20 50C20 20 80 20 80 50C80 70 20 70 20 50Z" fill="#F48FB1" stroke="#D81B60" strokeWidth="4" />
    {/* Eyes */}
    <circle cx="40" cy="45" r="5" fill="black" />
    <circle cx="60" cy="45" r="5" fill="black" />
    {/* Sparkles */}
    <circle cx="42" cy="43" r="2" fill="white" />
    <circle cx="62" cy="43" r="2" fill="white" />
    {/* Mouth */}
    <path d="M48 55C48 55 50 60 52 55" stroke="#D81B60" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Seahorse = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size * 0.8} height={size * 1.2} viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Dorsal Fin */}
    <path d="M20 50C10 55 10 70 25 70" fill="#FFF176" stroke="#FBC02D" strokeWidth="3" />
    {/* Body */}
    <path d="M40 20C20 20 25 50 40 60C50 65 50 80 40 90C30 100 20 90 30 110C40 120 60 110 55 95C50 80 65 70 55 50C50 40 60 20 40 20Z" fill="#FFEE58" stroke="#F57F17" strokeWidth="4" />
    {/* Snout */}
    <path d="M45 25C60 20 70 30 65 35C55 40 45 35 45 35" fill="#FFEE58" stroke="#F57F17" strokeWidth="4" strokeLinejoin="round" />
    {/* Eye */}
    <circle cx="48" cy="28" r="3" fill="black" />
    <circle cx="49" cy="27" r="1" fill="white" />
    {/* Belly lines */}
    <path d="M38 65L48 65" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
    <path d="M35 75L45 75" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
    <path d="M38 85L45 85" stroke="#F57F17" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Pufferfish = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Spikes */}
    <path d="M50 10L45 0L55 0Z" fill="#A1887F" />
    <path d="M20 20L10 15L15 25Z" fill="#A1887F" />
    <path d="M80 20L90 15L85 25Z" fill="#A1887F" />
    <path d="M10 50L0 45L0 55Z" fill="#A1887F" />
    <path d="M90 50L100 45L100 55Z" fill="#A1887F" />
    <path d="M20 80L10 85L15 75Z" fill="#A1887F" />
    <path d="M80 80L90 85L85 75Z" fill="#A1887F" />
    <path d="M50 90L45 100L55 100Z" fill="#A1887F" />
    
    {/* Tail */}
    <path d="M15 50L0 35V65Z" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="3" strokeLinejoin="round" />
    {/* Body */}
    <circle cx="50" cy="50" r="35" fill="#EFEBE9" stroke="#8D6E63" strokeWidth="4" />
    {/* Eyes */}
    <circle cx="65" cy="40" r="4" fill="black" />
    <circle cx="45" cy="40" r="4" fill="black" />
    {/* Mouth */}
    <circle cx="55" cy="55" r="4" fill="#FFCDD2" stroke="#E57373" strokeWidth="2" />
    {/* Blush */}
    <ellipse cx="35" cy="45" rx="5" ry="3" fill="#FFCDD2" opacity="0.8" />
    <ellipse cx="75" cy="45" rx="5" ry="3" fill="#FFCDD2" opacity="0.8" />
  </svg>
);

const Crab = ({ size = 100, ...props }: CreatureProps) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Legs Left */}
    <path d="M30 50C15 50 10 65 10 75" fill="none" stroke="#E53935" strokeWidth="4" strokeLinecap="round" />
    <path d="M35 55C20 60 15 75 15 80" fill="none" stroke="#E53935" strokeWidth="4" strokeLinecap="round" />
    {/* Legs Right */}
    <path d="M70 50C85 50 90 65 90 75" fill="none" stroke="#E53935" strokeWidth="4" strokeLinecap="round" />
    <path d="M65 55C80 60 85 75 85 80" fill="none" stroke="#E53935" strokeWidth="4" strokeLinecap="round" />
    {/* Claws */}
    <path d="M30 40C10 20 20 10 25 15C30 20 25 35 30 40Z" fill="#EF5350" stroke="#C62828" strokeWidth="3" />
    <path d="M70 40C90 20 80 10 75 15C70 20 75 35 70 40Z" fill="#EF5350" stroke="#C62828" strokeWidth="3" />
    {/* Body */}
    <ellipse cx="50" cy="50" rx="25" ry="18" fill="#EF5350" stroke="#C62828" strokeWidth="4" />
    {/* Eyestalks */}
    <path d="M40 32V20" stroke="#C62828" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 32V20" stroke="#C62828" strokeWidth="4" strokeLinecap="round" />
    <circle cx="40" cy="18" r="4" fill="white" stroke="#C62828" strokeWidth="2" />
    <circle cx="60" cy="18" r="4" fill="white" stroke="#C62828" strokeWidth="2" />
    <circle cx="40" cy="18" r="1.5" fill="black" />
    <circle cx="60" cy="18" r="1.5" fill="black" />
    {/* Smile */}
    <path d="M45 55C45 55 50 60 55 55" stroke="#C62828" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const CREATURE_TYPES = [
  { id: 'blue-fish', Component: BlueSpottedFish },
  { id: 'orange-fish', Component: OrangeStripedFish },
  { id: 'jellyfish', Component: Jellyfish },
  { id: 'turtle', Component: SeaTurtle },
  { id: 'octopus', Component: Octopus },
  { id: 'seahorse', Component: Seahorse },
  { id: 'pufferfish', Component: Pufferfish },
  { id: 'crab', Component: Crab },
] as const;

export const getRandomCreatureType = () => {
  return CREATURE_TYPES[Math.floor(Math.random() * CREATURE_TYPES.length)].id;
};

export const CreatureGraphic = ({ type, ...props }: { type: string } & CreatureProps) => {
  const CreatureComponent = CREATURE_TYPES.find(c => c.id === type)?.Component || BlueSpottedFish;
  return <CreatureComponent {...props} />;
};
