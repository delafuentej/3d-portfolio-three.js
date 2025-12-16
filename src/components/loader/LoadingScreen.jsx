import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import useStore from "../../store/useStore";
import logo from "/images/me.png";
import BlinkText from "./BlinkText";
import BlinkTextTitle from "./BlinkTextTitle";

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  const {
    loading: { visible, showExitAnimation, startExit, hide, finished, finish },
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

  console.log("visible:", visible, "active:", active, "progress:", progress);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-[#2c2f33] text-custom2">
      <BlinkText
        additionalClassName="top-20 right-80"
        lines={["creative developer", "interactive experiences"]}
      />

      <BlinkText lines={["frontend developer", "de la fuente"]} />

      <div className="flex space-x-20 text-9xl font-bold evmos text-[#00897b] relative">
        <div className="uppercase evmos">
          <BlinkTextTitle text="3d portfolio" stagger={0.1} duration={0.6} />
        </div>

        <div className="relative w-32 h-32">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full rounded-full opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold">
            {Math.floor(progress)}
          </div>
        </div>
      </div>

      <BlinkText
        additionalClassName="bottom-36 left-16"
        lines={["immersive experiences", "crafting worlds", "artistic shaders"]}
        a
      />
      <BlinkText
        additionalClassName="bottom-20"
        lines={[
          "webgl · webgpgu · glsl shaders",
          "three.js · r3f · tailwindcss · gsap ",
        ]}
      />

      {showExitAnimation && (
        <>
          <div className="svg-container bottom-half" />
          <div className="svg-container top-half" />
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
