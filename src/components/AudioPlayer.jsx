import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioPlayer({ isPlaying, togglePlay, isMuted, toggleMute }) {
  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={togglePlay || toggleMute}
        className="flex items-center gap-2 rounded-full border border-pink-500/40 bg-black/70 px-3.5 py-2 text-pink-400 backdrop-blur-md shadow-[0_0_15px_rgba(255,42,133,0.35)] transition-colors hover:bg-black/90 hover:border-pink-400"
        aria-label="Controlar música"
      >
        {/* Equalizer animation when playing */}
        {isPlaying && !isMuted ? (
          <div className="flex items-end gap-0.5 h-3.5">
            <span className="w-1 bg-pink-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.2s] h-4" />
            <span className="w-1 bg-yellow-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.4s] h-2.5" />
          </div>
        ) : (
          <Music className="h-4 w-4 text-pink-300 opacity-60" />
        )}

        {/* Volume Icon */}
        {isPlaying && !isMuted ? (
          <Volume2 className="h-4 w-4 text-pink-300" />
        ) : (
          <VolumeX className="h-4 w-4 text-pink-300" />
        )}

        <span className="text-[11px] font-bold tracking-wider text-pink-200 hidden sm:inline">
          {isPlaying && !isMuted ? 'Música ON' : 'Música'}
        </span>
      </motion.button>
    </div>
  );
}
