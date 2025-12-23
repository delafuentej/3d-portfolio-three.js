// src/models/useModels.js
import { useGLTF } from "@react-three/drei";

export function useModels() {
  const underConstructionModel = useGLTF("/models/under-construction.glb");
  return { underConstructionModel };
}

useGLTF.preload("/models/under-construction.glb");
