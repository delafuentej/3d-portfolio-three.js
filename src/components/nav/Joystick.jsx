// Joystick.js
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
import { playSound } from "../../audio/audioEngine";
import { useResponsiveConfig } from "../../hooks/useResponsiveConfig";

export const Joystick = forwardRef(
  ({ onSegmentMove, onSegmentRelease, menuItems, isOpen }, ref) => {
    const config = useResponsiveConfig();
    const innerRef = useRef(null);
    const joystickRef = ref || innerRef;

    const isDragging = useRef(false);
    const current = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const activeSegmentRef = useRef(null);

    // animación continua
    useGSAP(
      () => {
        const joystick = joystickRef.current;
        if (!joystick) return;

        const animate = () => {
          const { targetX, targetY } = current.current;
          current.current.x += (targetX - current.current.x) * 0.15;
          current.current.y += (targetY - current.current.y) * 0.15;

          gsap.set(joystick, { x: current.current.x, y: current.current.y });

          if (
            isDragging.current &&
            Math.sqrt(current.current.x ** 2 + current.current.y ** 2) > 20
          ) {
            const angle =
              (Math.atan2(current.current.y, current.current.x) * 180) /
              Math.PI;
            const segmentIndex =
              Math.floor(
                ((angle + 90 + 360) % 360) / (360 / menuItems.length)
              ) % menuItems.length;

            if (activeSegmentRef.current !== segmentIndex) {
              activeSegmentRef.current = segmentIndex;
              onSegmentMove?.(segmentIndex); // feedback visual
              if (isOpen) playSound("select");
            }
          } else {
            if (activeSegmentRef.current !== null) {
              activeSegmentRef.current = null;
              onSegmentMove?.(null);
            }
          }

          requestAnimationFrame(animate);
        };

        animate();

        // drag
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
            // 🔹 Ejecuta la acción real al soltar
            if (activeSegmentRef.current !== null) {
              onSegmentRelease?.(activeSegmentRef.current);
            }
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

        return () => {
          joystick.removeEventListener("mousedown", startDrag);
          joystick.removeEventListener("touchstart", startDrag);
        };
      },
      {
        dependencies: [menuItems, isOpen, onSegmentMove, onSegmentRelease],
        scope: joystickRef,
      }
    );

    return (
      <div
        className="joystick"
        ref={joystickRef}
        style={{ display: isOpen ? "flex" : "none" }}
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
