import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';
import { fireKpopConfetti } from '../utils/confetti';

export default function RumiHero() {
  const [rumiAnim, setRumiAnim] = useState('');
  const [hearts, setHearts] = useState([]);
  const [activeSpeech, setActiveSpeech] = useState(false);

  const speeches = [
    '¡A bailar sin parar!',
    '¡Sofi cumple 5!',
    '¡K-Pop Party Time!',
    '¡Te esperamos en la pista!',
  ];
  const [speechText, setSpeechText] = useState(speeches[0]);

  const handleTapRumi = () => {
    // 1. Animación aleatoria
    const anims = ['interact-jello', 'interact-rubber', 'interact-spin'];
    const chosen = anims[Math.floor(Math.random() * anims.length)];
    setRumiAnim(chosen);

    // 2. Confeti en la posición de Rumi
    fireKpopConfetti({
      origin: { y: 0.45 },
      particleCount: 45,
      spread: 75,
      colors: ['#ff2a85', '#00f0ff', '#ffd152', '#ffffff', '#ff007f'],
    });

    // 3. Globito de diálogo
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setSpeechText(randomSpeech);
    setActiveSpeech(true);

    // 4. Corazones flotantes efímeros
    const id = Date.now();
    setHearts((prev) => [...prev, id]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h !== id));
    }, 1200);

    setTimeout(() => {
      setRumiAnim('');
      setActiveSpeech(false);
    }, 2200);
  };

  const handleTapTeam = () => {
    fireKpopConfetti({
      origin: { y: 0.5 },
      particleCount: 20,
      spread: 50,
      colors: ['#00f0ff', '#ff2a85'],
    });
  };

  return (
    <div className="relative my-4 w-full flex flex-col items-center justify-center select-none">
      {/* Escenario Disco / Spotlight con gradiente y rayos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-linear-to-tr from-pink-600/30 via-purple-600/40 to-cyan-500/25 rounded-full blur-2xl animate-glow-pulse pointer-events-none" />

      {/* Rayos de luz de discoteca detrás de Rumi */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 opacity-25 rounded-full animate-disco-spin"
        style={{
          background: 'conic-gradient(from 0deg, #ff2a85 0deg, transparent 40deg, #00f0ff 90deg, transparent 130deg, #ffd152 180deg, transparent 220deg, #9b30ff 270deg, transparent 310deg, #ff2a85 360deg)',
        }}
      />

      {/* Bailarines del Team 1 (Izquierda) */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleTapTeam}
        className="absolute -left-4 sm:left-2 bottom-6 z-20 cursor-pointer"
        title="¡Tocá al Team K-Pop!"
      >
        <motion.img
          src="/kpop-team1.png"
          alt="Team K-Pop 1"
          animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 sm:w-24 object-contain drop-shadow-[0_4px_16px_rgba(0,240,255,0.45)] hover:brightness-110"
        />
      </motion.div>

      {/* Bailarines del Team 2 (Derecha) */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleTapTeam}
        className="absolute -right-4 sm:right-2 bottom-6 z-20 cursor-pointer"
        title="¡Tocá al Team K-Pop!"
      >
        <motion.img
          src="/kpop-team2.png"
          alt="Team K-Pop 2"
          animate={{ y: [5, -5, 5], rotate: [3, -3, 3] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 sm:w-24 object-contain drop-shadow-[0_4px_16px_rgba(255,42,133,0.45)] hover:brightness-110"
        />
      </motion.div>

      {/* Globito de Diálogo al tocar a Rumi */}
      <AnimatePresence>
        {activeSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            className="absolute -top-6 z-30 rounded-2xl border-2 border-pink-400 bg-black/90 px-3.5 py-1.5 text-xs font-black text-pink-200 shadow-[0_0_20px_rgba(255,42,133,0.6)] backdrop-blur-md flex items-center gap-1.5"
          >
            <Star className="h-3.5 w-3.5 text-yellow-300 fill-yellow-300" />
            <span>{speechText}</span>
            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-pink-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RUMI (Personaje Estrella) */}
      <div
        onClick={handleTapRumi}
        className={`relative z-20 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 flex flex-col items-center ${rumiAnim}`}
        title="¡Tocá a Rumi para verla bailar!"
      >
        {/* Corona pequeña sobre Rumi */}
        <motion.img
          src="/corona.png"
          alt="Corona"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(255,209,82,0.9)] -mb-2 z-30"
        />

        <img
          src="/kpop-runi.png"
          alt="Rumi K-Pop Estrella"
          className="h-56 sm:h-64 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,42,133,0.7)] animate-breathe"
        />

        {/* Insignia / Botón de Acción para invitar al usuario a tocar */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-pink-400/60 bg-linear-to-r from-pink-500/80 to-purple-600/80 px-3.5 py-1 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(255,42,133,0.5)] backdrop-blur-md cursor-pointer hover:brightness-110"
        >
          <Sparkles className="h-3 w-3 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          <span>¡Tocá a Rumi para bailar!</span>
          <Heart className="h-3 w-3 fill-pink-200 text-pink-200 animate-pulse" />
        </motion.div>
      </div>

      {/* Corazones animados que salen al hacer click */}
      {hearts.map((id) => (
        <motion.div
          key={id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -100, x: (Math.random() - 0.5) * 80 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none absolute z-40 text-pink-400"
          style={{ top: '40%' }}
        >
          <Heart className="h-8 w-8 fill-pink-500 text-pink-300 drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]" />
        </motion.div>
      ))}
    </div>
  );
}
