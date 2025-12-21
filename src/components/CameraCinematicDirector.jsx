import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import useStore from "../store/useStore";
import {
  soft,
  arc,
  orbit,
  push,
  slide,
  rise,
} from "../utils/cameraTransitions";

const TRANSITIONS = { soft, arc, orbit, push, slide, rise };

export default function CameraCinematicDirector() {
  const { camera } = useThree();

  // 📌 Estado de cámara
  const currentSection = useStore((state) => state.camera.current);
  const views = useStore((state) => state.camera.views);
  const setAnimating = useStore((state) => state.camera.setAnimating);

  // 📌 Target de la cámara
  const targetRef = useRef(new THREE.Vector3(0, 1, 0));
  const timeline = useRef(null);

  useEffect(() => {
    const view = views[currentSection];
    if (!view) return;

    // 🧹 Limpiar animación anterior
    timeline.current?.kill();
    timeline.current = gsap.timeline({
      onStart: () => setAnimating(true), // 🔹 bloqueamos scroll al iniciar
      onComplete: () => setAnimating(false), // 🔹 desbloqueamos scroll al terminar
    });

    // Posiciones inicial y final
    const fromPos = camera.position.clone();
    const toPos = new THREE.Vector3(
      view.position.x,
      view.position.y,
      view.position.z
    );
    const toTarget = new THREE.Vector3(
      view.target.x,
      view.target.y,
      view.target.z
    );

    const params = {
      camera,
      fromPos,
      toPos,
      target: targetRef.current,
      toTarget,
    };

    // 📌 Elegir transición
    const transitionFn = TRANSITIONS[view.transition] ?? soft;
    transitionFn(timeline.current, params);
  }, [currentSection, views, camera, setAnimating]);

  return null;
}
