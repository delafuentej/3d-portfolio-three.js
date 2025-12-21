import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useStore from "../store/useStore";

gsap.registerPlugin(ScrollTrigger);

export default function useCameraScrollSync(cameraRef) {
  const sections = useStore((state) => state.camera.sections);
  const setCurrentSection = useStore((state) => state.camera.setCurrentSection);

  useEffect(() => {
    if (!cameraRef.current) return;

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section}`, // cada sección debe tener un ID
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentSection(section),
        onEnterBack: () => setCurrentSection(section),
        markers: false,
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [cameraRef, sections, setCurrentSection]);
}
