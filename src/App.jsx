import React, { useState, useRef, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';
import WelcomeGate from './components/WelcomeGate';
import BackgroundEffects from './components/BackgroundEffects';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './components/HeroSection';
import RumiHero from './components/RumiHero';
import LightstickInteractive from './components/LightstickInteractive';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import DressCode from './components/DressCode';
import PhotoShootSection from './components/PhotoShootSection';
import RSVPForm from './components/RSVPForm';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  // Inicializar audio
  useEffect(() => {
    audioRef.current = new Audio('/kpop-song.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Bloqueo total del scroll de la página mientras el modal de inicio está activo
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    };
  }, [hasEntered]);

  // Ingreso con música
  const handleEnterWithMusic = () => {
    setHasEntered(true);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('Reproducción inicial bloqueada por el navegador:', e);
          setIsPlaying(false);
        });
    }
  };

  // Ingreso silencioso sin música
  const handleEnterWithoutMusic = () => {
    setHasEntered(true);
    setIsPlaying(false);
    setIsMuted(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.muted = true;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.muted = false;
      setIsMuted(false);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn(e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-[#12021c] text-white">
      {/* Fondo de luces y efectos atmosféricos */}
      <BackgroundEffects />

      {/* Pantalla de Entrada VIP Pass (Bloquea todo hasta interactuar) */}
      {!hasEntered ? (
        <WelcomeGate
          onEnterWithMusic={handleEnterWithMusic}
          onEnterWithoutMusic={handleEnterWithoutMusic}
        />
      ) : (
        <>
          {/* Control de Audio flotante en la esquina */}
          <AudioPlayer
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />

          {/* Contenido Principal de la Tarjeta (Mobile-first, sólo scrollable una vez que se entra) */}
          <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-3.5 py-6 sm:px-6">
            {/* 1. Encabezado con Nombre y Número 5 */}
            <HeroSection />

            {/* 2. Rumi Estrella K-Pop con Interacciones y Bailarines */}
            <RumiHero />

            {/* 3. Novedad: Lightstick Virtual Interactivo */}
            <LightstickInteractive />

            {/* 4. Cuenta Regresiva */}
            <Countdown targetDate="2026-11-28T18:00:00" />

            {/* 5. Detalles de Fecha, Hora y Salón con GPS */}
            <EventDetails
              dateText="Sábado, 28 de Noviembre"
              timeText="18:00 a 22:00 hs"
              placeName="Salón de Jubilados"
              addressText="Barrio Siglo XXI"
              cityText="Salta Capital"
              mapsQuery="Salon de Jubilados Barrio Siglo XXI Salta Capital"
            />

            {/* 6. Código de Vestimenta (Dress Code) */}
            <DressCode />

            {/* 7. Sección de Sesión de Fotos Oficial (Preparada para el book) */}
            <PhotoShootSection />

            {/* 8. Formulario de Confirmación por WhatsApp con Validaciones */}
            <RSVPForm phone="5491133229376" />

            {/* Pie de página tierno sin emojis */}
            <footer className="mt-8 mb-4 text-center select-none">
              <div className="inline-flex items-center gap-1.5 text-xs text-pink-300/80 font-medium">
                <span>¡Te esperamos para festejar con Sofi!</span>
                <Heart className="h-3 w-3 fill-pink-500 text-pink-400 animate-pulse" />
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-pink-200/50">
                <span>Fiesta K-Pop & Boliche</span>
                <span>•</span>
                <span>Cumple de 5 de Sofía Moreno</span>
                <Star className="h-2.5 w-2.5 fill-yellow-300 text-yellow-300" />
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}
