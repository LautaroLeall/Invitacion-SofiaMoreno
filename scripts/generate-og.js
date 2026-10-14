import sharp from 'sharp';
import fs from 'fs';

async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

  // 1. Procesar Rumi (Personaje K-Pop Rumi)
  // Altura 575px con margen superior (28px) e inferior (27px) garantizando que
  // ni su cabello, ni sus orejas, ni su corona/ropero se corten.
  const rumiHeight = 575;
  const rumiBuffer = await sharp('public/kpop-runi.png')
    .resize({ height: rumiHeight, fit: 'contain', background: transparent })
    .toBuffer();

  // 2. Bola de Boliche (fondo transparente para evitar letterboxing opaco)
  const discoBallBuffer = await sharp('public/bola-boliche.png')
    .resize({ width: 175, height: 160, fit: 'contain', background: transparent })
    .toBuffer();

  // 3. Número 5 3D
  const num5Buffer = await sharp('public/numero-5.png')
    .resize({ width: 160, height: 160, fit: 'contain', background: transparent })
    .toBuffer();

  // 4. Corona dorada (recortando borde derecho con artefacto)
  const crownMeta = await sharp('public/corona.png').metadata();
  const crownBuffer = await sharp('public/corona.png')
    .extract({ left: 10, top: 10, width: crownMeta.width - 25, height: crownMeta.height - 20 })
    .resize({ width: 105, height: 62, fit: 'contain', background: transparent })
    .toBuffer();

  // Fondo y vectores en SVG
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradiente escénico disco violeta oscuro -->
      <radialGradient id="bgGlowCenter" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#3b0764" stop-opacity="1" />
        <stop offset="55%" stop-color="#19042b" stop-opacity="1" />
        <stop offset="100%" stop-color="#0a0112" stop-opacity="1" />
      </radialGradient>

      <!-- Glows de luces discoteca -->
      <radialGradient id="pinkSpot" cx="20%" cy="25%" r="45%">
        <stop offset="0%" stop-color="#ec4899" stop-opacity="0.32" />
        <stop offset="100%" stop-color="#ec4899" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="cyanSpot" cx="62%" cy="30%" r="40%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.28" />
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
      </radialGradient>

      <!-- Aura resplandeciente detrás de Rumi -->
      <radialGradient id="rumiAura" cx="85%" cy="50%" r="38%">
        <stop offset="0%" stop-color="#ec4899" stop-opacity="0.5" />
        <stop offset="55%" stop-color="#a855f7" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <!-- Glow suave detrás del número 5 -->
      <radialGradient id="fiveAura" cx="62%" cy="55%" r="28%">
        <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <!-- Gradiente de texto SOFÍA MORENO -->
      <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="50%" stop-color="#fdf2f8" />
        <stop offset="85%" stop-color="#f472b6" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>

      <!-- Gradiente para el tag de temática -->
      <linearGradient id="neonPinkCyan" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="50%" stop-color="#d946ef" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>

      <!-- Fondo tarjeta translúcida -->
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
      </linearGradient>
    </defs>

    <!-- Fondos -->
    <rect width="${width}" height="${height}" fill="url(#bgGlowCenter)" />
    <rect width="${width}" height="${height}" fill="url(#pinkSpot)" />
    <rect width="${width}" height="${height}" fill="url(#cyanSpot)" />
    <rect width="${width}" height="${height}" fill="url(#rumiAura)" />
    <rect width="${width}" height="${height}" fill="url(#fiveAura)" />

    <!-- Destellos y Estrellas vectoriales luminosas -->
    <g fill="#fde047" opacity="0.9">
      <path d="M 60 280 Q 60 295 75 295 Q 60 295 60 310 Q 60 295 45 295 Q 60 295 60 280 Z" />
      <path d="M 640 60 Q 640 72 652 72 Q 640 72 640 84 Q 640 72 628 72 Q 640 72 640 60 Z" />
      <path d="M 830 80 Q 830 92 842 92 Q 830 92 830 104 Q 830 92 818 92 Q 830 92 830 80 Z" fill="#ec4899" />
      <path d="M 825 480 Q 825 495 840 495 Q 825 495 825 510 Q 825 495 810 495 Q 825 495 825 480 Z" fill="#38bdf8" />
    </g>

    <!-- Cadena de suspensión de la bola de boliche -->
    <line x1="768" y1="0" x2="768" y2="40" stroke="#cbd5e1" stroke-width="2.5" stroke-dasharray="4 3" />

    <!-- BADGE SUPERIOR VIP -->
    <g transform="translate(70, 50)">
      <rect width="270" height="36" rx="18" fill="#240645" stroke="#ec4899" stroke-width="1.8" />
      <circle cx="20" cy="18" r="4.5" fill="#06b6d4" />
      <text x="36" y="23" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="800" fill="#fbcfe8" letter-spacing="2">
        INVITACIÓN VIP OFICIAL
      </text>
    </g>

    <!-- SUBTÍTULO: MIS 5 AÑITOS -->
    <text x="70" y="130" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="26" font-weight="800" fill="#fbbf24" letter-spacing="1">
      ¡FESTEJO MIS 5 AÑITOS!
    </text>

    <!-- NOMBRE: SOFÍA MORENO -->
    <text x="70" y="200" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="62" font-weight="900" fill="url(#titleGradient)" letter-spacing="-0.5">
      SOFÍA MORENO
    </text>

    <!-- TEMÁTICA: FIESTA K-POP & BOLICHE -->
    <g transform="translate(70, 230)">
      <rect width="300" height="38" rx="19" fill="url(#neonPinkCyan)" />
      <text x="150" y="24" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
        FIESTA K-POP &amp; BOLICHE
      </text>
    </g>

    <!-- TARJETA DE DETALLES DEL EVENTO -->
    <g transform="translate(70, 295)">
      <rect width="570" height="175" rx="22" fill="url(#cardGrad)" stroke="#a855f7" stroke-width="1.5" stroke-opacity="0.4" />

      <!-- Fila 1: Fecha y Hora -->
      <g transform="translate(24, 38)">
        <circle cx="16" cy="12" r="16" fill="#ec4899" fill-opacity="0.25" stroke="#ec4899" stroke-width="1.5" />
        <rect x="9" y="5" width="14" height="14" rx="2" fill="none" stroke="#f472b6" stroke-width="1.8" />
        <line x1="9" y1="9" x2="23" y2="9" stroke="#f472b6" stroke-width="1.5" />
        
        <text x="46" y="8" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" letter-spacing="1">FECHA Y HORA</text>
        <text x="46" y="27" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" font-weight="800" fill="#ffffff">Sábado 28 de Noviembre • 18:00 hs</text>
      </g>

      <line x1="24" y1="88" x2="546" y2="88" stroke="#a855f7" stroke-width="1" stroke-opacity="0.2" />

      <!-- Fila 2: Lugar -->
      <g transform="translate(24, 122)">
        <circle cx="16" cy="12" r="16" fill="#06b6d4" fill-opacity="0.25" stroke="#06b6d4" stroke-width="1.5" />
        <path d="M 16 4 C 12 4 9 7 9 11 C 9 16 16 22 16 22 C 16 22 23 16 23 11 C 23 7 20 4 16 4 Z" fill="none" stroke="#38bdf8" stroke-width="1.8" />
        <circle cx="16" cy="10" r="2.5" fill="#38bdf8" />
        
        <text x="46" y="8" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" letter-spacing="1">LUGAR DEL EVENTO</text>
        <text x="46" y="27" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#ffffff">Salón de Jubilados Barrio Siglo XXI • Salta</text>
      </g>
    </g>

    <!-- BOTÓN INFERIOR CALL TO ACTION -->
    <g transform="translate(70, 495)">
      <rect width="450" height="46" rx="23" fill="#ffffff" />
      <text x="225" y="29" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14.5" font-weight="900" fill="#1e0533" text-anchor="middle" letter-spacing="0.8">
        CONFIRMAR ASISTENCIA EN EL LINK
      </text>
    </g>

    <!-- BORDE FINO NEÓN EXTERIOR -->
    <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="14" fill="none" stroke="#ec4899" stroke-width="2.5" stroke-opacity="0.75" />
  </svg>
  `;

  const svgBuffer = Buffer.from(svgOverlay);

  // Composición final en capas limpias y transparentes
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 10, g: 1, b: 18, alpha: 1 }
    }
  })
    .composite([
      { input: svgBuffer, top: 0, left: 0 },
      // Bola de boliche colgando entre texto y rumi
      { input: discoBallBuffer, top: 35, left: 680 },
      // Corona dorada delicadamente posada sobre el 5
      { input: crownBuffer, top: 228, left: 712 },
      // Número 5 3D
      { input: num5Buffer, top: 275, left: 685 },
      // Rumi en el lateral derecho: altura 575, top: 28, left: 880 (100% visible, nada cortado)
      { input: rumiBuffer, top: 28, left: 880 }
    ])
    .png({ quality: 90, compressionLevel: 8 })
    .toFile('public/og-image.png');

  console.log('og-image.png generado exitosamente sin artefactos.');
  const stats = fs.statSync('public/og-image.png');
  console.log(`Tamaño del archivo: ${(stats.size / 1024).toFixed(1)} KB`);
}

generateOgImage().catch(console.error);
