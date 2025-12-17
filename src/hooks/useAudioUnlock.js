// hooks/useAudioUnlock.js
import { unlockAudio, loadSound } from "../audio/audioEngine";

export function useAudioUnlock() {
  const unlock = async () => {
    await unlockAudio();
    await Promise.all([
      loadSound("open", "/audio/nav/menu-open.mp3"),
      loadSound("close", "/audio/nav/menu-close.mp3"),
      loadSound("select", "/audio/nav/menu-select.mp3"),
    ]);
  };

  return { unlock };
}
