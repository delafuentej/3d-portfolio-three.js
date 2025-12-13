import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { LoadingScreen } from "./components";
import useStore from "./store/useStore";

function App() {
  const { ready, setReady } = useStore();

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
        onCreated={() => {
          // Se ejecuta cuando el renderer YA EXISTE
          requestAnimationFrame(() => {
            setReady(true);
          });
        }}
      >
        <Suspense fallback={null}>
          <Experience ready={ready} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
