// AudioManaganager

// src/audio/AudioManager.js

import { AUDIO_SECTIONS } from "./audioSectionsConfig";

export class AudioManager {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.volume = 0;
    this.currentSection = null;
    this.fadeInterval = null;
    this.isReady = false;
  }

  // Inicializar el audio con interacción del usuario
  init() {
    if (this.isReady) return;

    this.audio.muted = false;
    this.isReady = true;
    console.log("🎵 AudioManager initialized");
  }

  play(section) {
    console.log("🎵 AudioManager.play() called with section:", section);

    if (!this.isReady) {
      console.warn("⚠️ AudioManager not initialized yet");
      this.init();
    }

    if (this.currentSection === section) {
      console.log("ℹ️ Same section, skipping");
      return;
    }

    const audioConfig = AUDIO_SECTIONS[section];
    if (!audioConfig) {
      console.error("❌ No audio config for section:", section);
      return;
    }

    const audioPath = `${audioConfig.src}.mp3`;
    console.log("🎵 Loading audio from:", audioPath);

    this.stop(() => {
      this.audio.src = audioPath;
      this.audio.currentTime = 0;

      this.audio
        .play()
        .then(() => {
          console.log("✅ Audio playing:", section);
          this.currentSection = section;
          this.fadeIn(audioConfig.volume);
        })
        .catch((error) => {
          console.error("❌ Error playing audio:", error);
        });
    });
  }

  stop(callback) {
    console.log("⏸️ Stopping audio");

    this.fadeOut(() => {
      this.audio.pause();
      this.currentSection = null;
      if (callback) callback();
    });
  }

  fadeIn(targetVolume = 0.2) {
    clearInterval(this.fadeInterval);
    const step = targetVolume / 20;

    this.fadeInterval = setInterval(() => {
      let v = this.audio.volume + step;
      if (v >= targetVolume) {
        v = targetVolume;
        clearInterval(this.fadeInterval);
      }
      this.audio.volume = Math.min(Math.max(v, 0), 1);
    }, 40);
  }

  fadeOut(callback) {
    clearInterval(this.fadeInterval);

    this.fadeInterval = setInterval(() => {
      let v = this.audio.volume - this.audio.volume / 20;
      if (v <= 0.01) {
        v = 0;
        clearInterval(this.fadeInterval);
        this.audio.pause();
        if (callback) callback();
      }
      this.audio.volume = Math.min(Math.max(v, 0), 1);
    }, 40);
  }
}

export const audioManager = new AudioManager();
