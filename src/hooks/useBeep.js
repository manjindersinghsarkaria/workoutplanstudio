/**
 * Returns a `beep()` function that plays a short tone via Web Audio API.
 *
 * Uses a single shared AudioContext (created lazily on first call) to avoid
 * the browser autoplay policy blocking sound. The context is resumed before
 * each beep in case it was suspended.
 */

let sharedCtx = null;

function getCtx() {
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return sharedCtx;
}

export function useBeep() {
  async function beep({ frequency = 880, duration = 0.15, volume = 0.5 } = {}) {
    if (!("AudioContext" in window || "webkitAudioContext" in window)) return;
    try {
      const ctx = getCtx();

      // Resume if suspended (autoplay policy)
      if (ctx.state === "suspended") await ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      // Smooth fade-out to avoid a click at the end
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignore — audio not available
    }
  }

  return beep;
}
