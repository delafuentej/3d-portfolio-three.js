import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import useStore from "../../store/useStore";
import progressContainerImg from "/images/me.png";
import BlinkText from "./BlinkText";
import BlinkTextTitle from "./BlinkTextTitle";

const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const {
    loading: { visible, startExit, finished, finish },
    app: { setReady },
  } = useStore();

  useEffect(() => {
    if (finished) return;

    if (!active && progress === 100) {
      startExit();

      const timeout = setTimeout(() => {
        finish();
        setReady(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [active, progress, finished, startExit, finish, setReady]);

  // 🔑 ESTA LÍNEA ES CLAVE
  if (!visible || finished) return null;

  // console.log("visible:", visible, "active:", active, "progress:", progress);

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
          <div className="progress-indicator">{Math.floor(progress)}</div>
        </div>
      </div>

      <BlinkText
        additionalClassName="blink-bottom-left"
        lines={["immersive experiences", "crafting worlds", "artistic shaders"]}
        a
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

export default LoadingScreen;
