import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Segment from "./Segment";
import { Joystick } from "./Joystick";
import * as Icons from "react-icons/io5";
import { menuItems } from "../../constants";
import useStore from "../../store/useStore";

import { useResponsiveConfig } from "../../hooks/useResponsiveConfig";

const CircularMenu = () => {
  const containerRef = useRef(null);
  const isMenuOpen = useStore((state) => state.menu.isOpen);
  //const joystickRef = useRef(null);

  // ref
  const segmentRefs = useRef([]);

  const addToRefs = (el) => {
    if (el && !segmentRefs.current.includes(el)) {
      segmentRefs.current.push(el);
    }
  };

  const config = useResponsiveConfig();

  const handleSegmentChange = (activeIndex) => {
    segmentRefs.current.forEach((seg, i) => {
      const color = menuItems[i].activeColor || "#FF5722"; // color activo por segmento
      if (i === activeIndex) {
        gsap.to(seg, { fill: color, duration: 0.3 });
      } else {
        gsap.to(seg, { fill: "#CCCCCC", duration: 0.3 }); // color inactivo
      }
    });
  };

  useGSAP(
    () => {
      if (segmentRefs.current.length === 0) return;

      if (isMenuOpen) {
        // orden aleatorio de los índices
        const indices = [...Array(segmentRefs.current.length).keys()].sort(
          () => Math.random() - 0.5
        );

        indices.forEach((i, pos) => {
          const seg = segmentRefs.current[i];
          gsap.set(seg, { opacity: 0 });
          gsap.to(seg, {
            opacity: 1,
            duration: 0.075,
            delay: pos * 0.075,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => gsap.set(seg, { opacity: 1 }),
          });
        });
      } else {
        const indices = [...Array(segmentRefs.current.length).keys()].sort(
          () => Math.random() - 0.5
        );

        indices.forEach((i, pos) => {
          const seg = segmentRefs.current[i];
          gsap.fromTo(
            seg,
            { scale: 1 },
            {
              scale: 1.5,
              duration: 0.3,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
              onComplete: () => gsap.set(seg, { scale: 1 }),
            }
          );

          gsap.to(seg, {
            opacity: 0,
            duration: 0.05,
            delay: pos * 0.05,
            repeat: 2,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => gsap.set(seg, { opacity: 0 }),
          });
        });
      }
    },
    { dependencies: [isMenuOpen] }
  );

  return (
    <div className="circular-menu" ref={containerRef}>
      {/* joystick */}
      <Joystick
        // ref={joystickRef}
        menuItems={menuItems}
        isOpen={isMenuOpen}
        onSegmentChange={handleSegmentChange}
      />
      {/* segments */}
      <div
        // className="icon-inner"
        style={{
          position: "relative",
          width: config.menuSize,
          height: config.menuSize,
        }}
      >
        {menuItems.map((item, i) => {
          const Icon = Icons[item.icon];
          return (
            <Segment
              key={i}
              ref={addToRefs}
              item={{ ...item, icon: Icon }}
              index={i}
              total={menuItems.length}
              config={config}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CircularMenu;
