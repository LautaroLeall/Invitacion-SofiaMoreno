# ⭐ Invitación de 5 Años - Sofía Moreno (K-Pop & Disco Party)

Invitación digital interactiva, mobile-first y de alto impacto visual para el cumpleaños de 5 años de **Sofía Moreno**.

---

## 🚀 Tecnologías Utilizadas
- **Vite 8** + **React 19**
- **Tailwind CSS v4** (`@tailwindcss/vite`) con paleta K-Pop y variables `@theme`
- **Framer Motion 13** para transiciones, gestos táctiles y micro-animaciones
- **Lucide React** para iconografía moderna
- **Canvas-Confetti** para explosiones y ráfagas de confeti temático

---

## ✨ Características y Elementos Interactivos
1. **VIP Idol Pass (Pantalla de bienvenida)**:
   - Bola de boliche giratoria con halo de luz y corona.
   - Botón pulsante *"¡ENTRAR AL SHOW!"* que inicia el audio y lanza confeti.
2. **Audio Player Inteligente**:
   - Botón flotante accesible con ecualizador animado y toggle Silenciar / Activar.
   - Sonido inicial precargado en `/public/kpop-song.mp3` (reemplazable por cualquier tema).
3. **Rumi Estrella K-Pop (`kpop-runi.png`)**:
   - Al tocar a Rumi: animación de baile (`jello`, `rubber`, `spin`) + lluvia de corazones + frases de diálogo + confeti.
   - Bailarines de apoyo en los laterales (`kpop-team1.png` y `kpop-team2.png`) también interactivos.
4. **Lightstick Virtual K-Pop (Novedad)**:
   - Varita de luz interactiva que cambia de color al tocarla (Rosa Idol, Cian Neón, Oro Estelar, Violeta Disco, Fiesta Total).
5. **Cuenta Regresiva en Tiempo Real**:
   - Días, Horas, Minutos y Segundos hacia el 28 de Noviembre de 2026.
6. **Detalles del Evento & Ubicación**:
   - Fecha: Sábado 28 de Noviembre.
   - Salón de Jubilados de Barrio Siglo XXI (Salta / Tucumán).
   - Botón de 1 click para abrir directamente en **Google Maps**.
   - Botón para **Agendar en Google Calendar**.
7. **Dress Code Temático**:
   - *K-Pop & Disco Glam*: ropa cómoda para bailar con brillo y toques flúor o rosa.
8. **Sesión de Fotos Oficial (Preparada para el Book)**:
   - Preview con animación de cámara y flash interactivo.
   - Lista para recibir las fotos de la sesión en el componente `PhotoShootSection.jsx` con modal ampliado (Lightbox).
9. **Confirmación por WhatsApp (RSVP)**:
   - Selección "¡Sí voy!" / "No puedo".
   - Nombre y número de acompañantes.
   - Campo para pedir canción al DJ.
   - Envío automático al número **+54 9 11 3322-9376**.
10. **Modal de Regalo**:
    - Datos bancarios con botones para copiar Alias y CBU con feedback visual.

---

## 🛠️ Comandos de Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```
# Invitacion-SofiaMoreno
