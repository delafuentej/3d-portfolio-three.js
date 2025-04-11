import { useCursor } from "@react-three/drei";
import { useState } from "react";
import { useResponsiveValues } from "../utils/responsiveValues";

export default function GitHubLogo({ model }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { github } = useResponsiveValues();

  return (
    <group
      scale={github.scale}
      position={github.position}
      rotation-y={0.13}
      onClick={() => window.open("https://github.com/delafuentej", "_blank")}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={model.scene} />
    </group>
  );
}
