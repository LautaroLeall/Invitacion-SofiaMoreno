import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { fireKpopConfetti } from '../utils/confetti';

export default function HeroSection() {
  const [animClass, setAnimClass] = useState('');

  const handleTapFive = () => {
    setAnimClass('interact-jello');
    fireKpopConfetti({
      origin: { y: 0.25 },
      particleCount: 35,
      spread: 70,
    });
    setTimeout(() => setAnimClass(''), 850);
  };

  return (
    <div className="relative flex flex-col items-center text-center pt-2 pb-4 select-none">
      {/* Halo de luz central */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-linear-to-tr from-pink-500/25 via-purple-600/30 to-cyan-400/20 rounded-full blur-3xl animate-glow-pulse" />

      {/* Moño flotante superior */}
      <motion.img
        src="/mono.png"
        alt="Moño"
        animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-14 sm:w-16 object-contain mb-1 drop-shadow-[0_4px_12px_rgba(255,42,133,0.5)] cursor-pointer"
        whileTap={{ scale: 1.2, rotate: 15 }}
      />

      {/* Nombre Principal */}
      <div className="relative z-10 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-[11px] font-bold text-pink-300 uppercase tracking-widest mb-1 shadow-sm">
          <Sparkles className="h-3 w-3 text-yellow-300" />
          <span>FIESTA K-POP & BOLICHE</span>
          <Sparkles className="h-3 w-3 text-yellow-300" />
        </div>

        <h1 className="font-baloo text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-pink-100 to-cyan-300 drop-shadow-[0_0_20px_rgba(255,42,133,0.7)] leading-none m-0">
          SOFÍA MORENO
        </h1>
      </div>

      {/* Número 5 con Corona Interactiva */}
      <div className="relative my-3 flex items-center justify-center">
        {/* Corona arriba del 5 */}
        <motion.img
          src="/corona.png"
          alt="Corona de Sofi"
          animate={{ y: [-3, 3, -3], rotate: [2, -2, 2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-7 z-20 w-14 sm:w-16 object-contain drop-shadow-[0_0_15px_rgba(255,209,82,0.85)] cursor-pointer"
          whileTap={{ scale: 1.25, rotate: -15 }}
        />

        {/* Imagen del Número 5 */}
        <div
          onClick={handleTapFive}
          className={`relative z-10 cursor-pointer transition-transform hover:scale-105 active:scale-95 ${animClass}`}
          title="¡Tocá el 5 para festejar!"
        >
          <img
            src="/numero-5.png"
            alt="Mis 5 Años"
            className="h-28 sm:h-32 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,42,133,0.6)] animate-breathe"
          />
        </div>

        {/* Corazón decorativo flotante al lado */}
        <motion.img
          src="/corazon.png"
          alt="Corazón"
          animate={{ y: [4, -4, 4], scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -right-7 bottom-2 z-20 w-9 sm:w-10 object-contain drop-shadow-[0_0_12px_rgba(255,0,127,0.7)] cursor-pointer"
          whileTap={{ scale: 1.3 }}
        />

        {/* Música decorativa flotante al otro lado */}
        <motion.img
          src="/musica.png"
          alt="Nota musical"
          animate={{ y: [-4, 4, -4], rotate: [-10, 10, -10] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute -left-7 top-4 z-20 w-8 sm:w-9 object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] cursor-pointer"
          whileTap={{ scale: 1.3 }}
        />
      </div>

      {/* Subtítulo ¡Mis 5 Añitos! */}
      <div className="relative z-10">
        <p className="font-pacifico text-2xl sm:text-3xl text-pink-300 drop-shadow-[0_0_12px_rgba(255,42,133,0.8)] m-0">
          ¡Mis 5 Añitos!
        </p>
        <p className="text-xs sm:text-sm font-medium text-pink-100/90 max-w-xs mx-auto mt-1 leading-snug flex items-center justify-center gap-1.5">
          <span>Vení a bailar, cantar y divertirte en una tarde inolvidable de luces y música</span>
          <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400 shrink-0 inline" />
        </p>
      </div>
    </div>
  );
}
