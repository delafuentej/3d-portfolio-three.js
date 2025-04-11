import { useCursor } from "@react-three/drei";
import { useState } from "react";
import { useMobile } from "../hooks"; // Asegúrate de que la ruta sea correcta

export default function GitHubModel({ model }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const { isMobile } = useMobile;

  // Ajustes condicionales
  const scale = isMobile ? 0.008 : 0.01;
  const position = isMobile ? [-2, 1.2, -1.2] : [-2.5, 1.5, -1.5];

  return (
    <group
      scale={scale}
      position={position}
      rotation-y={0.13}
      onClick={() => window.open("https://github.com/delafuentej", "_blank")}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={model.scene} />
    </group>
  );
}
