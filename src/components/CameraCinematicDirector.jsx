//film director's architecture.

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

  const currentSection = useStore((state) => state.camera.current);
  const views = useStore((state) => state.camera.views);
  const setAnimating = useStore((state) => state.camera.setAnimating);

  const targetRef = useRef(new THREE.Vector3(0, 1, 0));
  const timeline = useRef(null);

  useEffect(() => {
    const view = views[currentSection];
    if (!view) return;

    timeline.current?.kill();
    timeline.current = gsap.timeline({
      onStart: () => setAnimating(true),
      onComplete: () => setAnimating(false),
    });

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

    // Transición personalizada
    const transitionFn = TRANSITIONS[view.transition] ?? soft;
    transitionFn(timeline.current, params);

    // Actualizar cámara.lookAt cada frame
    timeline.current.eventCallback("onUpdate", () => {
      camera.lookAt(targetRef.current);
    });
  }, [currentSection]);

  return null;
}
