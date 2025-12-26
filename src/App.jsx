import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import LoadingScreen from "./components/loader/LoadingScreen";
import ToggleButton from "./components/nav/ToggleButton";
import OverlayNav from "./components/nav/OverlayNav";
import CursorTrail from "./components/cursor-trail/CursorTrail";
import LanguageSelect from "./components/language/LanguageSelect";
import useStore from "./store/useStore";
import CameraCinematicDirector from "./components/CameraCinematicDirector";
import { MusicToggleBtn } from "./components";

import useCameraRouter from "./hooks/useCameraRouter";
import useAutoCloseMenu from "./hooks/useAutoCloseMenu";
import useBlockScrollDuringTransition from "./hooks/useBlockScrollDuringTransition";
import useScrollNavigation from "./hooks/useScrollNavigation";
import { useI18nStore } from "./store/useI18nStore";
import { audioManager } from "./audio/AudioManager";

function App() {
  // 🔹 Leer idioma desde la URL solo al cargar
  useEffect(() => {
    const hash = window.location.hash;
    const [sectionPart, queryPart] = hash.split("?");
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      const lang = params.get("lang");
      if (lang) useI18nStore.getState().setLang(lang);
    }
  }, []);

  // 🔹 Inicializar audio con interacción del usuario
  useEffect(() => {
    let isInitialized = false;

    const enableAudio = () => {
      if (isInitialized) return;

      console.log("🎵 Initializing audio on user interaction");
      audioManager.init();

      const currentSection = useStore.getState().camera.current ?? "home";
      const isEnabled = useStore.getState().musicEnabled;

      console.log("🎵 Initial state:", { currentSection, isEnabled });

      if (isEnabled) {
        audioManager.play(currentSection);
      }

      isInitialized = true;
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };

    window.addEventListener("click", enableAudio);
    window.addEventListener("touchstart", enableAudio);
    window.addEventListener("keydown", enableAudio);

    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, []);

  // Hooks de sincronización
  useScrollNavigation();
  useCameraRouter();
  useAutoCloseMenu();
  useBlockScrollDuringTransition();

  const toggleMenu = useStore((state) => state.menu.toggle);
  const loadingFinished = useStore((state) => state.loading.finished);
  const isLoading = !loadingFinished;

  // 🔹 Obtener la sección y posición inicial de la cámara
  const currentSection = useStore((state) => state.camera.current);
  const views = useStore((state) => state.camera.views);
  const initialCameraPosition = views[currentSection]?.position ?? {
    x: 4,
    y: 2,
    z: 6,
  };

  // Convertir a array para Three.js
  const cameraPos = [
    initialCameraPosition.x,
    initialCameraPosition.y,
    initialCameraPosition.z,
  ];

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isLoading && <CursorTrail />}

      {!isLoading && (
        <div className="absolute top-4 right-4 flex gap-2 z-50">
          <LanguageSelect />
          <MusicToggleBtn />
        </div>
      )}

      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: cameraPos,
        }}
      >
        <Suspense fallback={null}>
          <CameraCinematicDirector />
          <Experience />
        </Suspense>
      </Canvas>

      {loadingFinished && <ToggleButton onClick={toggleMenu} />}
      <OverlayNav />
    </>
  );
}

export default App;
