import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, PartyPopper } from 'lucide-react';

export default function Countdown({ targetDate = '2026-11-28T18:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isCompleted) {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-pink-400/50 bg-pink-500/20 p-4 text-center backdrop-blur-md flex items-center justify-center gap-2">
        <PartyPopper className="h-5 w-5 text-yellow-300" />
        <h3 className="font-baloo text-xl font-bold text-yellow-300 m-0">
          ¡Llegó el gran día! ¡A bailar con Sofi!
        </h3>
        <PartyPopper className="h-5 w-5 text-yellow-300" />
      </div>
    );
  }

  const items = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEG', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-sm my-3 flex flex-col items-center">
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-300 mb-2">
        <Clock className="h-3.5 w-3.5 text-cyan-300" />
        <span>Cuenta regresiva para la fiesta</span>
        <Sparkles className="h-3 w-3 text-yellow-300" />
      </div>

      <div className="grid grid-cols-4 gap-2 w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-2xl border border-pink-500/40 bg-black/60 p-2.5 backdrop-blur-md shadow-[0_4px_15px_rgba(255,42,133,0.25)]"
          >
            <span className="font-baloo text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-b from-white via-pink-200 to-cyan-300 leading-none">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-pink-300/80">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
