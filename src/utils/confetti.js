import confetti from 'canvas-confetti';

export function fireKpopConfetti(options = {}) {
  const count = options.particleCount || 40;
  const defaults = {
    origin: { y: 0.6 },
    spread: 60,
    colors: ['#ff2a85', '#00f0ff', '#ffd152', '#9b30ff', '#ffffff'],
    disableForReducedMotion: true,
  };

  confetti({
    ...defaults,
    ...options,
    particleCount: count,
  });
}

export function fireSuperCelebration() {
  const end = Date.now() + 1.2 * 1000;
  const colors = ['#ff2a85', '#00f0ff', '#ffd152', '#9b30ff', '#ff007f'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
