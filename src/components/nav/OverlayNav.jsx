import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CircularMenu from "./CircularMenu";
import useStore from "../../store/useStore";
import ToggleButton from "./ToggleButton";
import { useAudio } from "../../hooks/useAudio";

const OverlayNav = () => {
  const overlayRef = useRef(null);

  const isMenuOpen = useStore((state) => state.menu.isOpen);
  const toggleMenu = useStore((state) => state.menu.toggle);

  // audios:
  const openAudio = useAudio("/audio/nav/menu-open.mp3");
  const closeAudio = useAudio("/audio/nav/menu-close.mp3");

  useEffect(() => {
    if (isMenuOpen) {
      openAudio.play();
    } else {
      closeAudio.play();
    }
  }, [isMenuOpen]);

  useGSAP(
    () => {
      if (isMenuOpen) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => (overlayRef.current.style.pointerEvents = "all"),
        });
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => (overlayRef.current.style.pointerEvents = "none"),
        });
      }
    },
    { dependencies: [isMenuOpen] } // <- aquí reacciona al cambio de estado
  );

  return (
    <div
      className="menu-overlay opacity-0 pointer-events-none"
      ref={overlayRef}
    >
      <div className="menu-bg"></div>
      <CircularMenu />
      <ToggleButton />
    </div>
  );
};

export default OverlayNav;
