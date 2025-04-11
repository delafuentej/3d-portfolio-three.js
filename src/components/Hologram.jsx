import { Suspense } from "react";
import { useMobile } from "../hooks";
import Particles from "./Particles";

export default function Hologram({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}) {
  const { isMobile } = useMobile;

  const adaptivePosition =
    position ?? (isMobile ? [-2, 0.5, 1] : [-3.75, 0.75, 1]);
  const adaptiveScale =
    scale ?? (isMobile ? [0.25, 0.25, 0.25] : [0.35, 0.35, 0.35]);
  const adaptiveRotation = rotation ?? [0, 1.25, 0];
  return (
    <Suspense fallback={null}>
      <group
        position={adaptivePosition}
        scale={adaptiveScale}
        rotation={adaptiveRotation}
        // onUpdate={(self) => {
        //   self.traverse((child) => {
        //     child.layers.disable(1); // desactiva layer 1
        //   });
        // }}
      >
        <Particles />
      </group>
    </Suspense>
  );
}
