import { useEffect } from "react";
import useStore from "../store/useStore";

export default function useBlockScrollDuringTransition() {
  const isAnimating = useStore((state) => state.camera.isAnimating);

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAnimating]);
}
