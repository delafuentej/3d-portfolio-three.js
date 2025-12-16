import React, { useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  IoGridSharp,
  IoChevronUpSharp,
  IoChevronDownSharp,
  IoChevronBackSharp,
  IoChevronForwardSharp,
} from "react-icons/io5";

import { useResponsiveConfig } from "../../hooks/useResponsiveConfig";

export const Joystick = forwardRef(
  ({ onSegmentChange, menuItems, isOpen }, ref) => {
    console.log("isOpen-joystick", isOpen);

    const config = useResponsiveConfig();
    const innerRef = useRef(null);
    const joystickRef = innerRef || ref;
    const isDragging = useRef(false);
    const current = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const activeSegmentRef = useRef(null);

    useGSAP(
      () => {
        const joystick = joystickRef.current;
        if (!joystick) return;

        // Animación continua (requestAnimationFrame style)
        const animate = () => {
          const { targetX, targetY } = current.current;
          current.current.x += (targetX - current.current.x) * 0.15;
          current.current.y += (targetY - current.current.y) * 0.15;

          gsap.set(joystick, {
            x: current.current.x,
            y: current.current.y,
          });

          // Detección de segmento activo
          if (
            isDragging.current &&
            Math.sqrt(current.current.x ** 2 + current.current.y ** 2) > 20
          ) {
            const angle =
              Math.atan2(current.current.y, current.current.x) *
              (180 / Math.PI);
            const segmentIndex =
              Math.floor(
                ((angle + 90 + 360) % 360) / (360 / menuItems.length)
              ) % menuItems.length;

            if (activeSegmentRef.current !== segmentIndex) {
              activeSegmentRef.current = segmentIndex;

              if (typeof onSegmentChange === "function") {
                onSegmentChange(segmentIndex);
              }

              if (isOpen) {
                new Audio("/audio/menu-select.mp3").play().catch(() => {});
              }
            }
          } else {
            if (activeSegmentRef.current !== null) {
              activeSegmentRef.current = null;
              if (typeof onSegmentChange === "function") {
                onSegmentChange(null);
              }
            }
          }

          requestAnimationFrame(animate);
        };

        animate();

        // Eventos drag
        const startDrag = (e) => {
          isDragging.current = true;
          const rect = joystick.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const drag = (ev) => {
            if (!isDragging.current) return;
            const clientX = ev.clientX || ev.touches?.[0]?.clientX;
            const clientY = ev.clientY || ev.touches?.[0]?.clientY;
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const maxDrag = 100 * 0.25;

            if (distance <= 20) {
              current.current.targetX = 0;
              current.current.targetY = 0;
            } else if (distance > maxDrag) {
              const ratio = maxDrag / distance;
              current.current.targetX = deltaX * ratio;
              current.current.targetY = deltaY * ratio;
            } else {
              current.current.targetX = deltaX;
              current.current.targetY = deltaY;
            }
          };

          const endDrag = () => {
            isDragging.current = false;
            current.current.targetX = 0;
            current.current.targetY = 0;
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", endDrag);
            document.removeEventListener("touchmove", drag);
            document.removeEventListener("touchend", endDrag);
          };

          document.addEventListener("mousemove", drag);
          document.addEventListener("mouseup", endDrag);
          document.addEventListener("touchmove", drag);
          document.addEventListener("touchend", endDrag);
          e.preventDefault();
        };

        joystick.addEventListener("mousedown", startDrag);
        joystick.addEventListener("touchstart", startDrag);

        // Limpieza automática gracias a useGSAP
        return () => {
          joystick.removeEventListener("mousedown", startDrag);
          joystick.removeEventListener("touchstart", startDrag);
        };
      },
      { dependencies: [menuItems, isOpen, onSegmentChange], scope: joystickRef }
    );
    return (
      <div
        className="joystick"
        ref={joystickRef}
        style={{
          display: isOpen ? "flex" : "none",
          // width: config.menuSize * 0.25,
          // height: config.menuSize * 0.25,
        }}
      >
        <IoGridSharp className="center-icon center-main" />
        <IoChevronUpSharp className="center-icon center-up" />
        <IoChevronDownSharp className="center-icon center-down" />
        <IoChevronBackSharp className="center-icon center-left" />
        <IoChevronForwardSharp className="center-icon center-right" />
      </div>
    );
  }
);
