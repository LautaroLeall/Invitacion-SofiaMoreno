import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, Star, VolumeX, X } from 'lucide-react';
import { fireSuperCelebration } from '../utils/confetti';

export default function WelcomeGate({ onEnterWithMusic, onEnterWithoutMusic }) {
  const handleWithMusic = () => {
    fireSuperCelebration();
    onEnterWithMusic();
  };

  const handleWithoutMusic = () => {
    onEnterWithoutMusic();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none overflow-hidden touch-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #3a0a4e 0%, #170426 65%, #0a0110 100%)',
      }}
    >
      {/* Luces ambientales estroboscópicas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* Contenedor tipo Tarjeta VIP Pass */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 25 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm rounded-4xl border-2 border-pink-500/40 bg-black/75 p-6 sm:p-7 text-center backdrop-blur-2xl shadow-[0_0_50px_rgba(255,42,133,0.4)] flex flex-col items-center"
      >
        {/* Botón X superior para entrar sin música */}
        <button
          onClick={handleWithoutMusic}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          title="Ingresar sin música"
          aria-label="Cerrar y entrar sin música"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Badge VIP Pass */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-400/50 bg-linear-to-r from-pink-500/20 to-purple-500/20 px-3.5 py-1 text-xs font-black tracking-widest text-pink-300 uppercase shadow-inner mb-3">
          <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>VIP IDOL PASS</span>
          <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
        </div>

        {/* Bola de Boliche giratoria */}
        <div className="relative my-2 w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-tr from-pink-500 via-cyan-400 to-purple-600 rounded-full blur-xl opacity-60 animate-glow-pulse" />
          <motion.img
            src="/bola-boliche.png"
            alt="Bola de boliche"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="relative z-10 w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.7)]"
          />
          <motion.img
            src="/corona.png"
            alt="Corona"
            animate={{ y: [-3, 3, -3], rotate: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-1 z-20 w-11 h-11 object-contain drop-shadow-[0_0_10px_rgba(255,209,82,0.8)]"
          />
        </div>

        {/* Textos sin emojis */}
        <div className="mt-2 mb-1">
          <span className="font-fredoka text-xs font-semibold tracking-wider text-pink-300 uppercase">
            Te invito a celebrar
          </span>
          <h1 className="mt-1 font-baloo text-3xl font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-pink-200 to-cyan-300 drop-shadow-[0_2px_10px_rgba(255,42,133,0.5)]">
            SOFÍA MORENO
          </h1>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30">
            <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
            <span className="font-fredoka text-sm font-bold text-yellow-300">
              ¡Mis 5 Añitos!
            </span>
            <span className="text-xs text-pink-200 font-medium">Fiesta K-Pop & Disco</span>
          </div>
        </div>

        <p className="mt-2.5 text-xs text-pink-100/80 max-w-65 leading-relaxed">
          La música de fondo es parte de la experiencia. Elegí cómo preferís ingresar:
        </p>

        {/* Acciones del Modal */}
        <div className="mt-5 flex w-full flex-col gap-2.5">
          {/* Botón Principal: Con música */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleWithMusic}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 py-3.5 px-4 font-baloo text-base font-black text-white shadow-[0_0_25px_rgba(255,42,133,0.6)] animate-heartbeat cursor-pointer"
          >
            <Music className="h-4 w-4 text-yellow-300" />
            <span>ENTRAR AL SHOW (CON MÚSICA)</span>
          </motion.button>

          {/* Botón Secundario: Sin música */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleWithoutMusic}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 py-2.5 px-4 font-baloo text-xs font-bold text-pink-200 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <VolumeX className="h-3.5 w-3.5 text-white/70" />
            <span>Ingresar sin música</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
