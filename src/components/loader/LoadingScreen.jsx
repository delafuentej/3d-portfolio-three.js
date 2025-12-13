import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import useStore from "../../store/useStore";
import logo from "/images/me.png";
import BlinkText from "./BlinkText";
import BlinkTextTitle from "./BlinkTextTitle";
import FuturisticTitle from "./FuturisticTitle";

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  const { setReady, hidden, setHidden, showAnimation, setShowAnimation } =
    useStore();
  console.log("progress:", progress, "showAnimation", showAnimation);

  useEffect(() => {
    if (!active && progress !== 100) {
      setShowAnimation(true);
      //  setShowAnimation(false);

      const timeout = setTimeout(() => {
        setHidden(true);
        setReady(true);
      }, 2000); // duración de tus SVG animations

      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  if (hidden) return null;

  return (
    <>
      <div className="flex h-[100vh] justify-center items-center bg-[#2c2f33] text-custom2 fixed inset-0 z-50">
        <BlinkText
          additionalClassName="top-20 right-80"
          lines={["creative developer", "interactive experiences"]}
        />

        <BlinkText lines={["frontend developer", "de la fuente"]} />

        <div className="flex space-x-20 text-9xl font-bold evmos text-[#00897b] relative">
          <div className="uppercase  evmos text-[#00897b]">
            <BlinkTextTitle text="3d portfolio" stagger={0.1} duration={0.6} />
          </div>

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full rounded-full opacity-30 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#00897b]">
              {Math.floor(progress)}
            </div>
          </div>

          {/*}
          <div className="uppercase text-9xl font-bold evmos blink-text text-[#00897b]">
            <p>
              {"portfolio".split("").map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </p>
          </div>

           <img src={logo} className="w-[8rem]" alt="logo" /> 

          {/* <div className="text-9xl font-bold  text-[#00897b]"> */}
          {/* {Math.floor(progress)} */}
          {/* </div> */}
        </div>

        <BlinkText
          additionalClassName="bottom-36 left-16"
          lines={[
            "immersive experiences",
            "crafting worlds",
            "artistic shaders",
          ]}
          a
        />
        <BlinkText
          additionalClassName="bottom-20"
          lines={[
            "webgl · webgpgu · glsl shaders",
            "three.js · r3f · tailwindcss · gsap ",
          ]}
        />
      </div>

      {showAnimation && (
        <>
          <div className="svg-container bottom-half">{/* SVG bottom */}</div>
          <div className="svg-container top-half">{/* SVG top */}</div>
        </>
      )}
    </>
  );
};
export default LoadingScreen;
