import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Color } from "three";
import { useCursor } from "@react-three/drei";

const useHoverGlow = (
  materials,
  colorHex = "#7FFF00",
  maxIntensity = 5,
  lerpFactor = 0.1
) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // Asignar el color emissive una sola vez
  useEffect(() => {
    const emissiveColor = new Color(colorHex);
    Object.values(materials).forEach((material) => {
      material.emissive = emissiveColor;
    });
  }, [materials, colorHex]);

  // Animar la intensidad
  useFrame(() => {
    Object.values(materials).forEach((material) => {
      material.emissiveIntensity = MathUtils.lerp(
        material.emissiveIntensity,
        hovered ? maxIntensity : 0,
        lerpFactor
      );
    });
  });

  return { hovered, setHovered };
};

export default useHoverGlow;
