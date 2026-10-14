// src/utils/whatsapp.js

export function buildWhatsAppUrl({
  phone = '5491133229376',
  nombre = '',
  asistira = true,
  invitados = 0,
  mensaje = '',
}) {
  let text = '';

  if (asistira) {
    text = `¡Hola! Quiero confirmar asistencia para el cumple de 5 de Sofía Moreno.\n`;
    text += `* Asistencia: Sí, voy a ir\n`;
    text += `* Nombre: ${nombre.trim()}\n`;
    text += `* Acompañantes: ${invitados}`;
    if (mensaje.trim()) {
      text += `\n* Mensaje para Sofi: ${mensaje.trim()}`;
    }
  } else {
    text = `¡Hola! Sobre el cumple de 5 de Sofía Moreno:\n`;
    text += `* Asistencia: No podré asistir\n`;
    text += `* Nombre: ${nombre.trim()}`;
    if (mensaje.trim()) {
      text += `\n* Mensaje para Sofi: ${mensaje.trim()}`;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(data) {
  const url = buildWhatsAppUrl(data);
  window.open(url, '_blank', 'noopener,noreferrer');
}
