import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, ExternalLink, CalendarPlus, Clock } from 'lucide-react';
import { buildGoogleCalendarLink } from '../utils/calendar';

export default function EventDetails({
  dateText = 'Sábado, 28 de Noviembre',
  timeText = '18:00 a 22:00 hs',
  placeName = 'Salón de Jubilados',
  addressText = 'Barrio Siglo XXI',
  cityText = 'Salta Capital',
  mapsQuery = 'Salon de Jubilados Barrio Siglo XXI Salta Capital',
}) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const calendarUrl = buildGoogleCalendarLink({
    title: 'Cumple de 5 de Sofía Moreno (Fiesta K-Pop)',
    location: `${placeName}, ${addressText}, ${cityText}`,
    startDate: '2026-11-28T18:00:00',
    endDate: '2026-11-28T22:00:00',
  });

  return (
    <div className="w-full max-w-sm my-3 flex flex-col gap-3">
      {/* Tarjeta de Fecha & Hora */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3.5 rounded-2xl border border-pink-500/30 bg-black/50 p-4 backdrop-blur-md shadow-lg"
      >
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(255,42,133,0.4)]">
          <CalendarDays className="h-6 w-6" />
        </div>
        <div className="flex-1 text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-pink-300">
            Día del evento
          </span>
          <p className="font-baloo text-lg font-bold text-white leading-tight m-0">
            {dateText}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-pink-200/80 mt-0.5">
            <Clock className="h-3 w-3 text-cyan-300" />
            <span>{timeText}</span>
          </div>
        </div>

        {/* Botón Agendar */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-pink-500/20 border border-pink-400/40 px-2.5 py-2 text-[10px] font-bold text-pink-200 hover:bg-pink-500/30 transition-colors no-underline"
          title="Guardar en Google Calendar"
        >
          <CalendarPlus className="h-4 w-4 text-yellow-300" />
          <span>Agendar</span>
        </motion.a>
      </motion.div>

      {/* Tarjeta de Ubicación */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex flex-col gap-3 rounded-2xl border border-pink-500/30 bg-black/50 p-4 backdrop-blur-md shadow-lg text-left"
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
              Lugar de la Fiesta
            </span>
            <p className="font-baloo text-lg font-bold text-white leading-tight m-0">
              {placeName}
            </p>
            <p className="text-xs text-pink-100/90 m-0 mt-0.5 font-medium">
              {addressText}
            </p>
            <p className="text-[11px] text-pink-200/70 m-0">
              {cityText}
            </p>
          </div>
        </div>

        {/* Botón Abrir Mapa */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 py-2.5 px-4 text-xs font-bold text-cyan-200 shadow-sm transition-all hover:border-cyan-300 hover:bg-cyan-500/40 no-underline"
        >
          <MapPin className="h-4 w-4 text-cyan-300" />
          <span>CÓMO LLEGAR (VER EN GOOGLE MAPS)</span>
          <ExternalLink className="h-3.5 w-3.5 text-cyan-300" />
        </motion.a>
      </motion.div>
    </div>
  );
}
