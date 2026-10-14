import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, User, Users, MessageSquare, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { fireKpopConfetti } from '../utils/confetti';

export default function RSVPForm({ phone = '5491133229376' }) {
  const [asistira, setAsistira] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    invitados: 0,
    mensaje: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const newErrors = {};

    // Validación Nombre
    const trimmedName = formData.nombre.trim();
    if (!trimmedName) {
      newErrors.nombre = 'Por favor ingresá tu nombre completo.';
    } else if (trimmedName.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(trimmedName)) {
      newErrors.nombre = 'El nombre solo puede contener letras.';
    }

    // Validación Acompañantes
    if (asistira) {
      const guests = Number(formData.invitados);
      if (isNaN(guests) || guests < 0 || guests > 15) {
        newErrors.invitados = 'Ingresá un número válido entre 0 y 15.';
      }
    }

    // Validación Mensaje (opcional)
    if (formData.mensaje && formData.mensaje.length > 250) {
      newErrors.mensaje = 'El mensaje no puede superar los 250 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ nombre: true, invitados: true, mensaje: true });

    if (!validate()) {
      return;
    }

    setStatus('loading');
    fireKpopConfetti({
      origin: { y: 0.7 },
      particleCount: 35,
    });

    openWhatsApp({
      phone,
      nombre: formData.nombre,
      asistira,
      invitados: asistira ? Number(formData.invitados) : 0,
      mensaje: formData.mensaje,
    });

    setStatus('success');
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div className="relative my-4 w-full max-w-sm rounded-4xl border-2 border-pink-500/40 bg-black/65 p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(255,42,133,0.3)] text-left">
      <div className="mb-5 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-[10px] font-black uppercase tracking-widest text-pink-300 mb-1.5">
          <Sparkles className="h-3 w-3 text-yellow-300" />
          <span>CONFIRMACIÓN DE ASISTENCIA</span>
          <Sparkles className="h-3 w-3 text-yellow-300" />
        </div>
        <h3 className="font-baloo text-2xl font-black text-white m-0">
          ¿Venís a la Fiesta?
        </h3>
        <p className="mt-1 text-xs text-pink-100/80 leading-snug">
          Por favor confirmanos tu presencia para esperarte con todo listo.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Selector de Asistencia */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              setAsistira(true);
              validate();
            }}
            className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-3 px-2 text-xs font-black transition-all cursor-pointer ${asistira
              ? 'border-pink-400 bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(255,42,133,0.5)] scale-[1.02]'
              : 'border-white/10 bg-white/5 text-pink-200/60 hover:bg-white/10'
              }`}
          >
            <Check className="h-4 w-4" />
            <span>SÍ, VOY A IR</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAsistira(false);
              setErrors((prev) => {
                const next = { ...prev };
                delete next.invitados;
                return next;
              });
            }}
            className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-3 px-2 text-xs font-black transition-all cursor-pointer ${!asistira
              ? 'border-pink-400 bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(255,42,133,0.5)] scale-[1.02]'
              : 'border-white/10 bg-white/5 text-pink-200/60 hover:bg-white/10'
              }`}
          >
            <X className="h-4 w-4" />
            <span>NO PODRÉ</span>
          </button>
        </div>

        {/* Nombre y Acompañantes */}
        <div className="flex gap-2.5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="flex items-center gap-1.5 pl-1 text-[10px] font-black uppercase tracking-wider text-pink-300">
              <User className="h-3 w-3 text-cyan-300" />
              <span>Tu Nombre Completo</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Laura González"
              value={formData.nombre}
              onChange={(e) => {
                setFormData({ ...formData, nombre: e.target.value });
                if (touched.nombre) validate();
              }}
              onBlur={() => handleBlur('nombre')}
              className={`w-full rounded-xl border bg-black/40 p-3 text-xs text-white placeholder-pink-200/40 focus:bg-black/60 focus:outline-none transition-all shadow-inner ${touched.nombre && errors.nombre
                ? 'border-red-400 focus:border-red-400'
                : 'border-pink-400/30 focus:border-pink-400'
                }`}
            />
            {touched.nombre && errors.nombre && (
              <span className="flex items-center gap-1 pl-1 text-[10px] font-bold text-red-300">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{errors.nombre}</span>
              </span>
            )}
          </div>

          {asistira && (
            <div className="w-28 flex flex-col gap-1">
              <label className="flex items-center gap-1.5 pl-1 text-[10px] font-black uppercase tracking-wider text-pink-300">
                <Users className="h-3 w-3 text-cyan-300" />
                <span>Acomp.</span>
              </label>
              <input
                type="number"
                min="0"
                max="15"
                value={formData.invitados}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : parseInt(e.target.value);
                  setFormData({ ...formData, invitados: isNaN(val) ? 0 : val });
                  if (touched.invitados) validate();
                }}
                onBlur={() => handleBlur('invitados')}
                className={`w-full rounded-xl border bg-black/40 p-3 text-xs text-white text-center focus:bg-black/60 focus:outline-none transition-all shadow-inner ${touched.invitados && errors.invitados
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-pink-400/30 focus:border-pink-400'
                  }`}
              />
              {touched.invitados && errors.invitados && (
                <span className="text-[9px] font-bold text-red-300 pl-1 leading-tight">
                  {errors.invitados}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Mensaje de saludo para Sofi */}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1.5 pl-1 text-[10px] font-black uppercase tracking-wider text-pink-300">
            <MessageSquare className="h-3 w-3 text-pink-400" />
            <span>Mensaje para Sofi</span>
            <span className="normal-case opacity-60 text-[9px]">(opcional)</span>
          </label>
          <input
            type="text"
            maxLength={250}
            placeholder="Un saludo o dedicatoria..."
            value={formData.mensaje}
            onChange={(e) => {
              setFormData({ ...formData, mensaje: e.target.value });
              if (touched.mensaje) validate();
            }}
            onBlur={() => handleBlur('mensaje')}
            className="w-full rounded-xl border border-pink-400/30 bg-black/40 p-3 text-xs text-white placeholder-pink-200/40 focus:border-pink-400 focus:bg-black/60 focus:outline-none transition-all shadow-inner"
          />
          {touched.mensaje && errors.mensaje && (
            <span className="flex items-center gap-1 pl-1 text-[10px] font-bold text-red-300">
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{errors.mensaje}</span>
            </span>
          )}
        </div>

        {/* Botón de Enviar a WhatsApp */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={status === 'loading'}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 py-3.5 px-4 font-baloo text-base font-black text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_0_35px_rgba(16,185,129,0.7)]"
        >
          <Send className="h-4 w-4" />
          <span>
            {status === 'loading' ? 'Abriendo WhatsApp...' : 'Confirmar por WhatsApp'}
          </span>
        </motion.button>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-pink-500/20 border border-pink-400/40 p-2.5 text-xs font-bold text-pink-200"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>¡Redirigiendo a WhatsApp con tu mensaje confirmado!</span>
          </motion.div>
        )}
      </form>
    </div>
  );
}
