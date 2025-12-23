import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import LoadingScreen from "./components/loader/LoadingScreen";
import ToggleButton from "./components/nav/ToggleButton";
import OverlayNav from "./components/nav/OverlayNav";
import CursorTrail from "./components/cursor-trail/CursorTrail";

import useStore from "./store/useStore";
import CameraCinematicDirector from "./components/CameraCinematicDirector";

import useCameraRouter from "./hooks/useCameraRouter";
import useAutoCloseMenu from "./hooks/useAutoCloseMenu";
import useBlockScrollDuringTransition from "./hooks/useBlockScrollDuringTransition";
import useScrollNavigation from "./hooks/useScrollNavigation";

function App() {
  // Hooks de sincronización
  useScrollNavigation();
  useCameraRouter(); // sync hash ↔ store
  useAutoCloseMenu(); // cierra menú al cambiar sección
  useBlockScrollDuringTransition(); // bloquea scroll en animaciones

  const toggleMenu = useStore((state) => state.menu.toggle);
  const loadingFinished = useStore((state) => state.loading.finished);
  const isLoading = !loadingFinished;

  // 🔹 Obtener la sección y posición inicial de la cámara desde el store
  const currentSection = useStore.getState().camera.current;
  console.log("currentSection", currentSection);
  const views = useStore.getState().camera.views;
  console.log("views", views);
  const initialCameraPosition = views[currentSection]?.position ?? [4, 2, 6];
  console.log("initialCameraPosition", initialCameraPosition);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isLoading && <CursorTrail />}

      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: initialCameraPosition,
        }}
      >
        <Suspense fallback={null}>
          {/* Director cinematográfico: mueve la cámara según currentSection */}
          <CameraCinematicDirector />
          {/* Contenido 3D */}
          <Experience />
        </Suspense>
      </Canvas>

      {/* UI */}
      {loadingFinished && <ToggleButton onClick={toggleMenu} />}
      <OverlayNav />
    </>
  );
}

export default App;
