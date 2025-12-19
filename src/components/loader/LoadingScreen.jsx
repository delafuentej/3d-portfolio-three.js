import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useStore from "../../store/useStore";

import progressContainerImg from "/images/me.png";
import BlinkText from "./BlinkText";
import BlinkTextTitle from "./BlinkTextTitle";

const TICK_MS = 35; // controla la velocidad visual

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  const [displayProgress, setDisplayProgress] = useState(0);

  const rafRef = useRef(null);
  const lastTickRef = useRef(0);

  const {
    loading: { visible, startExit, finished, finish },
    app: { setReady },
  } = useStore();

  /**
   * 🔢 Progreso discreto ligado al progreso real (robusto)
   */
  useEffect(() => {
    const update = (time) => {
      if (!lastTickRef.current) lastTickRef.current = time;

      const elapsed = time - lastTickRef.current;

      if (elapsed >= TICK_MS) {
        setDisplayProgress((prev) => {
          const real = Math.floor(progress);

          // 🟦 FASE 1: seguir progreso real
          if (real < 100) {
            if (prev < real) return prev + 1;
            return prev;
          }

          // 🟩 FASE 2: real terminado → drenar hasta 100
          if (real === 100 && prev < 100) {
            return prev + 1;
          }

          return prev;
        });

        lastTickRef.current = time;
      }

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress]);

  /**
   * 🚪 Salida del loader
   */
  useEffect(() => {
    if (finished) return;

    if (!active && displayProgress === 100) {
      startExit();

      const timeout = setTimeout(() => {
        finish();
        setReady(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [active, displayProgress, finished, startExit, finish, setReady]);

  if (!visible || finished) return null;

  return (
    <div className="loader-container">
      <BlinkText
        additionalClassName="blink-top-right"
        lines={["creative developer", "interactive experiences"]}
      />

      <BlinkText lines={["frontend developer", "de la fuente"]} />

      <div className="loader-title">
        <BlinkTextTitle text="3d portfolio" stagger={0.1} duration={0.6} />

        <div className="progress-container">
          <img
            src={progressContainerImg}
            alt="progress-container-img"
            className="progress-container-img"
          />

          <div className="progress-indicator">{displayProgress}</div>
        </div>
      </div>

      <BlinkText
        additionalClassName="blink-bottom-left"
        lines={["immersive experiences", "crafting worlds", "artistic shaders"]}
      />

      <BlinkText
        additionalClassName="blink-bottom-center"
        lines={[
          "webgl · webgpu · glsl shaders",
          "three.js · r3f · tailwindcss · gsap",
        ]}
      />
    </div>
  );
};

export default LoadingScreen;
