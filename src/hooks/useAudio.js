// hooks/useAudio.js
import { useRef } from "react";

export function useAudio(src) {
  const ctxRef = useRef(null);
  const bufferRef = useRef(null);

  const init = async () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    // 🔑 CLAVE: reanudar contexto (Safari)
    if (ctxRef.current.state === "suspended") {
      await ctxRef.current.resume();
    }

    if (!bufferRef.current) {
      const res = await fetch(src);
      const arrayBuffer = await res.arrayBuffer();
      bufferRef.current = await ctxRef.current.decodeAudioData(arrayBuffer);
    }
  };

  const play = () => {
    if (!ctxRef.current || !bufferRef.current) return;

    const source = ctxRef.current.createBufferSource();
    source.buffer = bufferRef.current;
    source.connect(ctxRef.current.destination);
    source.start(0);
  };

  return { init, play };
}
