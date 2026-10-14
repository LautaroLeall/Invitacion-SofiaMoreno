// src/utils/calendar.js

function fmtDateForCalendar(dateInput) {
  const d = new Date(dateInput);
  const YYYY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const DD = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${YYYY}${MM}${DD}T${hh}${mm}${ss}`;
}

export function buildGoogleCalendarLink({
  title = 'Cumple de 5 de Sofía Moreno (Fiesta K-Pop)',
  details = '¡Festejamos los 5 añitos de Sofi a puro K-Pop, boliche, baile y diversión!',
  location = 'Salón de Jubilados de Barrio Siglo XXI, Salta Capital',
  startDate = '2026-11-28T18:00:00',
  endDate = '2026-11-28T22:00:00',
  tz = 'America/Argentina/Salta',
}) {
  const dates = `${fmtDateForCalendar(startDate)}/${fmtDateForCalendar(endDate)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates,
    details,
    location,
    ctz: tz,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile({
  title = 'Cumple de 5 de Sofía Moreno (Fiesta K-Pop)',
  details = '¡Festejamos los 5 añitos de Sofi a puro K-Pop, boliche, baile y diversión!',
  location = 'Salón de Jubilados de Barrio Siglo XXI, Salta Capital',
  startDate = '2026-11-28T18:00:00',
  endDate = '2026-11-28T22:00:00',
}) {
  const dtStart = fmtDateForCalendar(startDate);
  const dtEnd = fmtDateForCalendar(endDate);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sofi Moreno//Cumple 5//ES',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${details}`,
    `LOCATION:${location}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'cumple-5-sofi-moreno.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
