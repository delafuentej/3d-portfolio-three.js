import { useEffect } from "react";
import useStore from "../store/useStore";

export default function useScrollNavigation() {
  const next = useStore((s) => s.camera.next);
  const prev = useStore((s) => s.camera.prev);
  const current = useStore((s) => s.camera.current);
  const isAnimating = useStore((s) => s.camera.isAnimating);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating) return; // bloquear scroll durante animación

      // 🔹 Si estamos en home, no permitimos avanzar a la siguiente sección
      if (current === "home") {
        // gsap.to(someArrowIndicator, { opacity: 1, duration: 0.2, yoyo: true, repeat: 1 });
        return;
      }

      // Detectar dirección
      if (e.deltaY > 0) {
        next(); // scroll hacia abajo
      } else if (e.deltaY < 0) {
        prev(); // scroll hacia arriba
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current, next, prev, isAnimating]);
}
