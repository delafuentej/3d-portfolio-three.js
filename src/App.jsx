import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <LoadingScreen ready={ready} />

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
          <Experience />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
