import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { LoadingScreen } from "./components";

function App() {
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
    </>
  );
}

export default App;
