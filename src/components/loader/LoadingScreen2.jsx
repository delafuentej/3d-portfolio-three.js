import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useStore from "../../store/useStore";
import progressContainerImg from "/images/me.png";
import BlinkText from "./BlinkText";
import BlinkTextTitle from "./BlinkTextTitle";
import { MathUtils } from "three";

const LoadingScreen2 = () => {
  const { progress, active } = useProgress();
  const smoothProgress = useRef(0);
  const [, forceUpdate] = useState(0);

  const {
    loading: { visible, startExit, finished, finish },
    app: { setReady },
  } = useStore();

  // 🔹 Suavizado con clamping
  useEffect(() => {
    let animationFrame;

    const updateProgress = () => {
      // lerp + clamping: nunca decrece
      smoothProgress.current = Math.max(
        smoothProgress.current,
        MathUtils.lerp(smoothProgress.current, progress, 0.08)
      );

      forceUpdate((n) => n + 1);

      // Continuar hasta que el progreso llegue a 100
      if (smoothProgress.current < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    return () => cancelAnimationFrame(animationFrame);
  }, [progress]);

  // 🔹 Detectar finalización del loader y asegurar 100
  useEffect(() => {
    if (finished) return;

    if (!active && progress === 100) {
      // Forzar suavemente smoothProgress a 100
      const interval = setInterval(() => {
        smoothProgress.current = Math.min(
          100,
          smoothProgress.current + (100 - smoothProgress.current) * 0.1
        );
        forceUpdate((n) => n + 1);

        // Si ya llegó a 100, limpiamos interval y cerramos loader
        if (smoothProgress.current >= 99.99) {
          clearInterval(interval);
          startExit();
          setTimeout(() => {
            finish();
            setReady(true);
          }, 500); // pequeño delay para animación de salida
        }
      }, 16);

      return () => clearInterval(interval);
    }
  }, [active, progress, finished, startExit, finish, setReady]);

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
          <div className="progress-indicator">
            {Math.floor(smoothProgress.current + 1)}
          </div>
        </div>
      </div>

      <BlinkText
        additionalClassName="blink-bottom-left"
        lines={["immersive experiences", "crafting worlds", "artistic shaders"]}
      />
      <BlinkText
        additionalClassName="blink-bottom-center"
        lines={[
          "webgl · webgpgu · glsl shaders",
          "three.js · r3f · tailwindcss · gsap ",
        ]}
      />
    </div>
  );
};

export default LoadingScreen2;
