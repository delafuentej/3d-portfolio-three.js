import { useEffect } from "react";
import useStore from "../store/useStore";
export default function useAutoCloseMenu() {
  const current = useStore((state) => state.camera.current);
  const closeMenu = useStore((state) => state.menu.close);

  useEffect(() => {
    if (!current) return;

    // Cierra menú al cambiar de sección
    closeMenu();
  }, [current, closeMenu]);
}
