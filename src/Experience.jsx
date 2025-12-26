// import { Suspense } from "reimport { OrbitControls, Environment } from "@react-three/drei";
import { Environment, OrbitControls } from "@react-three/drei";
import { Home, Stack, Mission, Contact, Collaboration, Work } from "./sections";
import { useResponsiveValues } from "./utils/responsiveValues";
import useStore from "./store/useStore";

export default function Experience({ ready }) {
  const section = useStore((state) => state.camera.current);
  const { controls } = useResponsiveValues();
  return (
    <>
      <color args={["#2C2F33"]} attach="background" />

      <OrbitControls
        enableDamping
        enableZoom={controls.enableZoom}
        enableRotate
        enablePan={false}
        minDistance={2}
        maxDistance={controls.maxDistance}
        minPolarAngle={Math.PI / 2} // ← Mantener la cámara nivelada
        maxPolarAngle={Math.PI / 2} // ← Impide rotar en X
      />

      <Environment preset="studio" />

      <group>
        {section === "home" && <Home ready={ready} />}
        {section === "mission" && <Mission ready={ready} />}
        {section === "stack" && <Stack ready={ready} />}
        {section === "work" && <Work ready={ready} />}
        {section === "collaboration" && <Collaboration ready={ready} />}
        {section === "contact" && <Contact ready={ready} />}
      </group>
    </>
  );
}
