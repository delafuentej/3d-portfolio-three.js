import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useStore } from "../store";

export default function CameraController() {
  const { camera } = useThree();
  const currentView = useStore((state) => state.currentView);
  const isExpanded = useStore((state) => state.isExpanded);
  const cameraPositions = useStore((state) => state.cameraPositions);

  // posición objetivo según vista
  let target = cameraPositions[currentView];

  console.log("target", target);

  // si estamos en "projects" y expandido, acercamos la cámara
  if (currentView === "projects" && isExpanded) {
    target = { x: 10, y: 5, z: 2 }; // ajusta según tu preferencia
  }

  // spring animado
  const spring = useSpring({
    to: { x: target.x, y: target.y, z: target.z },
    config: { mass: 1, tension: 120, friction: 30 },
  });

  // actualizar la cámara cada frame
  useFrame(() => {
    const { x, y, z } = spring;
    camera.position.x += (x.get() - camera.position.x) * 0.1;
    camera.position.y += (y.get() - camera.position.y) * 0.1;
    camera.position.z += (z.get() - camera.position.z) * 0.1;
    camera.lookAt(0, 1, 0);
  });

  return null;
}
