// CameraController.jsx
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import useStore from "../store/useStore";
import { useThree } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger);

const CameraController = () => {
  const camera = useThree((state) => state.camera);
  const store = useStore();
  const currentSectionRef = useRef(store.camera.current); // evita loops infinitos

  useLayoutEffect(() => {
    const triggers = [];

    store.camera.sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return; // evita errores si el DOM no existe
      const targetPos = store.camera.positions[sectionId];
      if (!targetPos) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (currentSectionRef.current !== sectionId) {
            store.camera.setCurrentSection(sectionId);
            currentSectionRef.current = sectionId;
          }
        },
        onEnterBack: () => {
          if (currentSectionRef.current !== sectionId) {
            store.camera.setCurrentSection(sectionId);
            currentSectionRef.current = sectionId;
          }
        },
        onUpdate: (self) => {
          const progress = self.progress;
          camera.position.x += (targetPos.x - camera.position.x) * progress;
          camera.position.y += (targetPos.y - camera.position.y) * progress;
          camera.position.z += (targetPos.z - camera.position.z) * progress;
          camera.lookAt(
            store.camera.target.x,
            store.camera.target.y,
            store.camera.target.z
          );
        },
      });

      triggers.push(trigger);
    });

    // Limpieza al desmontar
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [camera, store]);

  // Función pública para mover cámara manualmente (click o joystick)
  const moveToSection = (sectionId) => {
    const targetPos = store.camera.positions[sectionId];
    if (!targetPos) return;
    if (currentSectionRef.current === sectionId) return;

    currentSectionRef.current = sectionId;
    store.camera.setCurrentSection(sectionId);

    // Movimiento suave con GSAP
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () =>
        camera.lookAt(
          store.camera.target.x,
          store.camera.target.y,
          store.camera.target.z
        ),
    });
  };

  // Exponer la función globalmente si quieres conectar joystick/segmentos
  window.moveCameraToSection = moveToSection;

  return null; // solo controla la cámara, no renderiza nada
};

export default CameraController;
