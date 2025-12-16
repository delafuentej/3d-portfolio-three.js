import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CircularMenu from "./CircularMenu";
import useStore from "../../store/useStore";
import { ImSwitch } from "react-icons/im";

const OverlayNav = () => {
  const overlayRef = useRef(null);

  const isMenuOpen = useStore((state) => state.menu.isOpen);
  const toggleMenu = useStore((state) => state.menu.toggle);

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
      <div className="close-btn" onClick={toggleMenu}>
        <ImSwitch className="switch-off" />
      </div>
      <div className="menu-bg"></div>
      <CircularMenu />
    </div>
  );
};

export default OverlayNav;
