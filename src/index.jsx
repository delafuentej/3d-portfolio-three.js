import "./style.css";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
// import LoadingScreen from "./components/LoadingScreen.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    {/* <LoadingScreen /> */}
    <Canvas
      gl={{ antialias: true }}
      style={{ touchAction: "auto" }}
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
