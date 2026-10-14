import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2 } from 'lucide-react';
import { fireKpopConfetti } from '../utils/confetti';

const MODES = [
  { name: 'Rosa Idol', color: '#ff2a85', glow: 'rgba(255,42,133,0.85)', text: 'text-pink-300' },
  { name: 'Cian Neón', color: '#00f0ff', glow: 'rgba(0,240,255,0.85)', text: 'text-cyan-300' },
  { name: 'Oro Estelar', color: '#ffd152', glow: 'rgba(255,209,82,0.85)', text: 'text-yellow-300' },
  { name: 'Violeta Disco', color: '#9b30ff', glow: 'rgba(155,48,255,0.85)', text: 'text-purple-300' },
  { name: 'Fiesta Total', color: '#00ff88', glow: 'rgba(0,255,136,0.85)', text: 'text-emerald-300' },
];

export default function LightstickInteractive() {
  const [modeIndex, setModeIndex] = useState(0);
  const current = MODES[modeIndex];

  const handleNextMode = () => {
    const next = (modeIndex + 1) % MODES.length;
    setModeIndex(next);

    fireKpopConfetti({
      origin: { y: 0.6 },
      particleCount: 15,
      spread: 45,
      colors: [MODES[next].color, '#ffffff'],
    });
  };

  return (
    <div className="relative my-3 w-full max-w-sm rounded-3xl border border-pink-500/30 bg-black/40 p-4 backdrop-blur-md shadow-xl text-center select-none overflow-hidden">
      {/* Resplandor del color actual */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 transition-all duration-500 blur-xl"
        style={{ background: current.glow }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
          <Wand2 className="h-3.5 w-3.5 text-yellow-300 animate-bounce" />
          <span>Lightstick Virtual de Sofi</span>
          <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
        </div>

        {/* Varita de Luz interactiva */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleNextMode}
          className="relative my-1 cursor-pointer flex flex-col items-center py-2 px-6 rounded-2xl bg-black/60 border border-white/10 hover:border-white/30 transition-all shadow-lg"
          title="¡Tocá para cambiar el color de tu Lightstick!"
        >
          {/* Cabeza del lightstick */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2"
            style={{
              borderColor: current.color,
              boxShadow: `0 0 25px ${current.glow}`,
              background: `radial-gradient(circle, ${current.color} 30%, #11031d 90%)`,
            }}
          >
            <motion.img
              src="/corona.png"
              alt="Corona"
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            />
          </div>

          {/* Mango del lightstick */}
          <div className="w-3.5 h-10 bg-linear-to-b from-gray-300 to-gray-600 rounded-b-md shadow-md -mt-1 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.color }} />
          </div>

          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300" style={{ color: current.color }}>
            <span>Modo: {current.name}</span>
            <Sparkles className="h-3 w-3" />
          </div>
        </motion.div>

        <p className="mt-1 text-[11px] text-pink-200/70">
          ¡Tocá la varita para cambiar las luces y alentar a la cumpleañera!
        </p>
      </div>
    </div>
  );
}
