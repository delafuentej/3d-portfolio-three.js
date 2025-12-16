import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { LoadingScreen } from "./components";
import ToggleButton from "./components/nav/ToggleButton";
import OverlayNav from "./components/nav/OverlayNav";
import useStore from "./store/useStore";

function App() {
  const isMenuOpen = useStore((state) => state.menu.isOpen);
  const toggleMenu = useStore((state) => state.menu.toggle);
  const loadingFinished = useStore((state) => state.loading.finished);
  return (
    <>
      <LoadingScreen />

      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6],
        }}
      >
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <>
        {loadingFinished && <ToggleButton onClick={toggleMenu} />}

        <OverlayNav />
      </>
    </>
  );
}

export default App;
