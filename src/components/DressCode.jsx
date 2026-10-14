import React from 'react';
import { Sparkles, Shirt } from 'lucide-react';

export default function DressCode() {
  return (
    <div className="relative my-3 w-full max-w-sm rounded-3xl border border-pink-500/30 bg-black/40 p-4 backdrop-blur-md shadow-lg text-center select-none">
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500/30 to-purple-600/30 border border-pink-400/40 text-pink-300 shadow-inner mb-2">
          <Shirt className="h-5 w-5 text-yellow-300" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-widest text-pink-300">
          Código de Vestimenta
        </span>
        <h4 className="font-baloo text-lg font-bold text-white m-0 mt-0.5 inline-flex items-center gap-1.5">
          <span>K-Pop & Disco Glam</span>
          <Sparkles className="h-4 w-4 text-yellow-300" />
        </h4>
        <p className="mt-1 text-xs text-pink-100/80 leading-relaxed max-w-67.5">
          Vení con ropa cómoda para bailar y jugar, con mucho brillo, toques de rosa, flúor o tu look K-Pop preferido.
        </p>
      </div>
    </div>
  );
}
