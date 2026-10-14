import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Heart, X, ZoomIn, Star } from 'lucide-react';
import { fireKpopConfetti } from '../utils/confetti';

export default function PhotoShootSection({ photos = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleFlash = () => {
    setIsFlashing(true);
    fireKpopConfetti({
      origin: { y: 0.65 },
      particleCount: 25,
      spread: 60,
      colors: ['#ffffff', '#ff2a85', '#ffd152'],
    });
    setTimeout(() => setIsFlashing(false), 300);
  };

  const hasPhotos = photos && photos.length > 0;

  return (
    <div className="relative my-4 w-full max-w-sm rounded-3xl border border-pink-500/30 bg-black/50 p-5 backdrop-blur-md shadow-xl text-center select-none overflow-hidden">
      {/* Destello de Flash fotográfico simulado */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 z-30 bg-white"
          />
        )}
      </AnimatePresence>

      {/* Encabezado */}
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-[10px] font-black uppercase tracking-widest text-pink-300 mb-2">
          <Camera className="h-3.5 w-3.5 text-yellow-300" />
          <span>SESIÓN DE FOTOS OFICIAL</span>
          <Sparkles className="h-3 w-3 text-yellow-300" />
        </div>

        <h3 className="font-baloo text-xl font-bold text-white leading-tight m-0 inline-flex items-center gap-1.5">
          <span>Idol Lookbook de Sofi</span>
          <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
        </h3>
      </div>

      {!hasPhotos ? (
        /* Estado: Próximamente (Sesión en camino) */
        <div className="mt-4 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFlash}
            className="relative cursor-pointer w-full max-w-70 rounded-2xl border-2 border-dashed border-pink-400/60 bg-linear-to-br from-pink-500/10 via-purple-600/10 to-cyan-500/10 p-6 flex flex-col items-center justify-center transition-all hover:border-pink-300 hover:bg-pink-500/20 group shadow-inner"
            title="¡Tocá la cámara para activar el flash!"
          >
            {/* Cámara animada con halo */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-pink-500/30 rounded-full blur-xl group-hover:scale-125 transition-transform" />
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(255,42,133,0.5)]">
                <Camera className="h-8 w-8 text-white group-hover:rotate-6 transition-transform" />
              </div>
            </div>

            <div className="mt-3">
              <div className="inline-flex items-center gap-1 rounded-full bg-yellow-400/20 border border-yellow-400/50 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-yellow-300">
                <Sparkles className="h-3 w-3" />
                <span>PRÓXIMAMENTE</span>
                <Sparkles className="h-3 w-3" />
              </div>
              <p className="mt-2 text-xs font-semibold text-pink-100/90 leading-relaxed">
                ¡Estamos preparando la sesión de fotos de la estrella!
              </p>
              <p className="mt-1 text-[11px] text-pink-200/70 inline-flex items-center justify-center gap-1">
                <span>Muy pronto podrás ver acá el book exclusivo de Sofi</span>
                <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
              </p>
            </div>

            <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-pink-300/80 font-bold underline decoration-dotted">
              <Camera className="h-3 w-3" />
              <span>Tocá para probar el flash</span>
            </span>
          </motion.div>
        </div>
      ) : (
        /* Estado: Galería activa cuando se carguen las fotos */
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative cursor-pointer overflow-hidden rounded-xl border border-pink-400/40 bg-black/40 aspect-square group"
            >
              <img
                src={photo.src || photo}
                alt={photo.alt || `Foto de Sofi ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                <ZoomIn className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de foto ampliada (Lightbox) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-sm w-full rounded-2xl overflow-hidden border border-pink-400/50"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedPhoto.src || selectedPhoto}
                alt="Foto ampliada"
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
