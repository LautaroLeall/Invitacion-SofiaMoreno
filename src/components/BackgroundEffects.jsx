import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none">
      {/* Fondo base con imagen temática si existe, superpuesta con gradiente */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/fondo.png')" }}
      />

      {/* Gradiente atmosférico disco K-Pop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(255, 42, 133, 0.22) 0%, rgba(107, 20, 155, 0.35) 45%, #100219 90%)',
        }}
      />

      {/* Focos de luz y destellos difuminados */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute top-1/2 right-[-20%] w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-[-10%] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-glow-pulse" />

      {/* Estrellas y brillos flotantes */}
      <motion.img
        src="/estrella-brillo.png"
        alt=""
        animate={{ y: [-8, 8, -8], rotate: [-15, 15, -15], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[8%] w-8 sm:w-10 object-contain drop-shadow-[0_0_10px_rgba(255,209,82,0.7)]"
      />

      <motion.img
        src="/estrella.png"
        alt=""
        animate={{ y: [6, -6, 6], rotate: [10, -10, 10], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[28%] right-[8%] w-7 sm:w-9 object-contain drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]"
      />

      <motion.img
        src="/musica.png"
        alt=""
        animate={{ y: [-10, 10, -10], rotate: [-12, 12, -12], opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[25%] left-[6%] w-8 sm:w-10 object-contain drop-shadow-[0_0_12px_rgba(255,42,133,0.7)]"
      />

      <motion.img
        src="/corazon.png"
        alt=""
        animate={{ y: [8, -8, 8], scale: [0.95, 1.05, 0.95], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[10%] right-[10%] w-7 sm:w-9 object-contain drop-shadow-[0_0_10px_rgba(255,0,127,0.7)]"
      />
    </div>
  );
}
