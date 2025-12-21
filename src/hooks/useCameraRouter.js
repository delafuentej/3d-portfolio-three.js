import { useEffect } from "react";
import useStore from "../store/useStore";

/**
 * Sincroniza:
 *  - camera.current → URL (#section)
 *  - URL (back / forward / reload) → camera.current
 *
 * NO anima nada.
 * SOLO conecta navegador ↔ estado.
 */
export default function useCameraRouter() {
  const current = useStore((state) => state.camera.current);

  /**
   * =========================================
   * A) ESTADO → URL
   * =========================================
   * Cuando cambia la sección de cámara,
   * reflejamos el cambio en la URL.
   */
  useEffect(() => {
    if (!current) return;

    const hash = `#${current}`;

    // Evita pushState innecesario
    if (window.location.hash === hash) return;

    window.history.pushState({ view: current }, "", hash);
  }, [current]);

  /**
   * =========================================
   * B) URL → ESTADO
   * =========================================
   * Cuando el usuario:
   *  - recarga
   *  - usa back / forward
   *  - entra con una URL directa (#work)
   */
  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const { camera } = useStore.getState();

      // Validar que la vista existe
      if (camera.views && camera.views[hash]) {
        if (camera.current !== hash) {
          camera.setCurrentSection(hash);
        }
      }
    };

    // Escuchar navegación del navegador
    window.addEventListener("popstate", onPopState);

    // 👈 sincronización inicial al cargar
    onPopState();

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
}
