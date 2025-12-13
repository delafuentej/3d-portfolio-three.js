import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      // Esperamos a que termine la animación
      const timeout = setTimeout(() => {
        setHidden(true);
      }, 500); // mismo tiempo que tu fade-out

      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  if (hidden) return null;

  return (
    <div
      className={`loading-screen ${!active ? "loading-screen--hidden" : ""}`}
    >
      <div className="loading-screen__container">
        <h1 className="loading-screen__title">
          3D-Portfolio: Three.js || Jesús de la Fuente
        </h1>
        <div className="progress__container">
          <div className="progress__bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress__indicator">
          Loading... ({Math.floor(progress)}%)
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
