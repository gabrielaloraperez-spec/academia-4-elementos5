let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function tone(frequency: number, durationMs: number, type: OscillatorType, gainValue: number, delayMs = 0) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime + delayMs / 1000;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + durationMs / 1000 + 0.03);
}

export const playUiClick = () => tone(560, 80, 'triangle', 0.04);
export const playCorrect = () => {
  tone(660, 90, 'sine', 0.05);
  tone(880, 120, 'sine', 0.05, 70);
};
export const playWrong = () => {
  tone(260, 130, 'sawtooth', 0.05);
  tone(180, 160, 'sawtooth', 0.05, 90);
};
export const playSuccess = () => {
  tone(523, 90, 'triangle', 0.05);
  tone(659, 90, 'triangle', 0.05, 90);
  tone(784, 160, 'triangle', 0.05, 180);
};
