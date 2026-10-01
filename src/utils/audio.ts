/**
 * Lightweight Web Audio API synthesizer for the ambient audio and tactile UI clicks.
 * Safe for all browsers, zero external audio asset dependencies.
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isEnabled: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbient();
      this.playBlip(640, 0.08);
    } else {
      this.stopAmbient();
      this.playBlip(320, 0.08);
    }

    return this.isEnabled;
  }

  public getSoundState(): boolean {
    return this.isEnabled;
  }

  private startAmbient() {
    if (!this.ctx) return;
    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 1.5);

      // Low warm binaural drone
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(108, this.ctx.currentTime); // 108Hz meditative drone

      // Add gentle low-pass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);

      this.ambientOsc.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.start();
    } catch {
      // Audio playback might be restricted prior to interaction
    }
  }

  private stopAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.ambientOsc) {
          this.ambientOsc.stop();
          this.ambientOsc.disconnect();
          this.ambientOsc = null;
        }
      }, 550);
    } catch {
      // Ignore cleanup error
    }
  }

  public playBlip(freq = 520, duration = 0.05) {
    if (!this.isEnabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();
