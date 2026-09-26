/**
 * Atmospheric space sound synthesis using the Web Audio API.
 * Pure procedural synthesis without external dependencies.
 */

class SpaceAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;
  
  // Drone nodes
  private masterGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  private userInteracted: boolean = false;

  constructor() {
    // Audio context will be lazy-loaded on user gesture
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.userInteracted = true;

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter for warm, dark cosmic atmosphere
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);
      this.filterNode.connect(this.masterGain);

      // Drone sub-gain
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      // Gentle fade in
      this.droneGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 6);
      this.droneGain.connect(this.filterNode);

      // Subtle celestial fundamental drone: D1 / A1 / F#2 (Warm D minor / suspended celestial chord)
      // D1 ~ 36.7Hz, A1 ~ 55.0Hz, D2 ~ 73.4Hz
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55.0, this.ctx.currentTime); // A1

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2 (fifth)
      
      this.osc3 = this.ctx.createOscillator();
      this.osc3.type = 'triangle';
      this.osc3.frequency.setValueAtTime(110.0, this.ctx.currentTime); // A2

      // Very slow LFO for filter breathing (period ~ 14 seconds)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.07, this.ctx.currentTime);
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(60, this.ctx.currentTime);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);

      this.osc1.connect(this.droneGain);
      this.osc2.connect(this.droneGain);
      this.osc3.connect(this.droneGain);

      this.osc1.start();
      this.osc2.start();
      this.osc3.start();
      this.lfo.start();

      this.isInitialized = true;
    } catch {
      // AudioContext failure (e.g. autoplay blocked before touch)
    }
  }

  public ensureResume() {
    if (!this.ctx) {
      this.init();
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.ensureResume();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.45, now + 0.3);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Delicate crystalline resonance for stars.
   * Uses gentle harmonic bell chime in pentatonic celestial tuning.
   */
  public playStarChime(type: string = 'ordinary', depthFactor: number = 0.5) {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // Pentatonic pitch frequencies: D4, E4, G4, A4, B4, D5, E5, F#5, A5
      const notes = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25, 739.99, 880.00];
      const baseFreq = notes[Math.floor(Math.random() * notes.length)];
      const pitch = baseFreq * (0.85 + depthFactor * 0.3);

      const chimeGain = this.ctx.createGain();
      const duration = type === 'bright' ? 4.5 : type === 'binary' ? 5.0 : 3.2;

      chimeGain.gain.setValueAtTime(0.001, now);
      const peakVolume = type === 'bright' ? 0.08 : 0.045;
      chimeGain.gain.linearRampToValueAtTime(peakVolume, now + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Dual harmonic sine generator for glass-like acoustic resonance
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);

      const overtone = this.ctx.createOscillator();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(pitch * 2.01, now);

      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.3, now);
      overtone.connect(overtoneGain);
      overtoneGain.connect(chimeGain);

      // Reverb-like stereo subtle delay simulation
      const delay = this.ctx.createDelay();
      delay.delayTime.setValueAtTime(0.28, now);
      const delayGain = this.ctx.createGain();
      delayGain.gain.setValueAtTime(0.25, now);

      osc.connect(chimeGain);
      chimeGain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(this.masterGain);
      chimeGain.connect(this.masterGain);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + duration + 0.5);
      overtone.stop(now + duration + 0.5);
    } catch {
      // Audio error safety
    }
  }

  /**
   * Sound for double stars: plays a gentle dual harmonic interval (fifth or octave)
   */
  public playBinaryHarmonic() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const f1 = 440; // A4
      const f2 = 659.25; // E5

      [f1, f2].forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.001, now + idx * 0.12);
        g.gain.linearRampToValueAtTime(0.04, now + idx * 0.12 + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 4.0);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 4.5);
      });
    } catch {
      // Audio safety
    }
  }

  /**
   * Sound for disappearing/ephemeral stars: soft whispering dissolve
   */
  public playVanishSound() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 3.0);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.03, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 3.8);
    } catch {
      // Audio safety
    }
  }

  /**
   * Sound for shooting star catch: delicate crystalline chime with an ethereal octave shimmer
   */
  public playShootingStarCatch() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // High harmonic frequencies: F#5 (739.99 Hz) and C#6 (1108.73 Hz)
      const freqs = [739.99, 1108.73, 1479.98];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        const g = this.ctx.createGain();
        const peak = idx === 0 ? 0.05 : 0.03;
        g.gain.setValueAtTime(0.0001, now + idx * 0.04);
        g.gain.linearRampToValueAtTime(peak, now + idx * 0.04 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 3.5);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 3.8);
      });
    } catch {
      // Audio safety
    }
  }

  /**
   * Subtle stardust whisper when a shooting star streaks across
   */
  public playShootingStarFlyby() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.8);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.015, now + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 2.0);
    } catch {
      // Audio safety
    }
  }

  /**
   * Sound for discovering or interacting with a satellite (faint nostalgic radio telemetry ping)
   */
  public playSatellitePing() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1320, now); // E6
      osc.frequency.setValueAtTime(1760, now + 0.08); // A6

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.04, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 1.4);
    } catch {
      // Audio safety
    }
  }

  /**
   * Sound for planet resonance: deep warm celestial chord
   */
  public playPlanetTone(type: string) {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const baseFreq = type === 'enfance' ? 392.0 : type === 'adolescence' ? 220.0 : type === 'reves' ? 329.63 : type === 'adulte' ? 261.63 : 196.0;
      const chord = [baseFreq, baseFreq * 1.5, baseFreq * 2.0];

      chord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, now + idx * 0.06);
        g.gain.linearRampToValueAtTime(0.035, now + idx * 0.06 + 0.2);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 5.0);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 5.2);
      });
    } catch {
      // Audio safety
    }
  }

  /**
   * Sound for constellation revelation: interlaced chime
   */
  public playConstellationChord() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [329.63, 440.0, 554.37, 659.25]; // E major celestial chord

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.0001, now + idx * 0.1);
        g.gain.linearRampToValueAtTime(0.035, now + idx * 0.1 + 0.1);
        g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 4.5);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 5.0);
      });
    } catch {
      // Audio safety
    }
  }

  /**
   * Sound when entering black hole singularity: deep subsonic quietude
   */
  public playBlackHoleQuietude() {
    if (this.isMuted) return;
    this.ensureResume();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Gentle sub bass swell
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(45, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 4.0);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.linearRampToValueAtTime(0.06, now + 1.5);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 6.2);
    } catch {
      // Audio safety
    }
  }

  /**
   * Subtly adjust texture as user discovers more stars (deepens slightly without becoming loud)
   */
  public updateExplorationDepth(discoveredCount: number) {
    if (!this.ctx || !this.filterNode) return;
    try {
      const now = this.ctx.currentTime;
      // Gently open filter from 220Hz up to 340Hz as universe is revealed
      const targetFreq = Math.min(340, 220 + discoveredCount * 5);
      this.filterNode.frequency.cancelScheduledValues(now);
      this.filterNode.frequency.linearRampToValueAtTime(targetFreq, now + 3);
    } catch {
      // Safe
    }
  }
}

export const spaceAudio = new SpaceAudioEngine();
