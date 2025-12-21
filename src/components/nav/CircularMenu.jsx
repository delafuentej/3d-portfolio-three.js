import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Segment from "./Segment";
import { Joystick } from "./Joystick";
import * as IoIcons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import { menuItems } from "../../constants";
import useStore from "../../store/useStore";
import { useResponsiveConfig } from "../../hooks/useResponsiveConfig";

const Icons = {
  ...IoIcons,
  ...FaIcons,
  ...Fa6Icons,
};

gsap.defaults({ overwrite: "auto" });

const CircularMenu = () => {
  const containerRef = useRef(null);
  const isMenuOpen = useStore((s) => s.menu.isOpen);
  const currentSection = useStore((s) => s.camera.current);
  const segmentRefs = useRef([]);
  const addToRefs = (el) => {
    if (el && !segmentRefs.current.includes(el)) segmentRefs.current.push(el);
  };

  const config = useResponsiveConfig();

  // 🔹 Estado para el índice actualmente seleccionado
  const [activeSegment, setActiveSegment] = useState(null);

  useEffect(() => {
    if (!currentSection) return;
    const initialIndex = menuItems.findIndex(
      (item) => item.section === currentSection
    );
    if (initialIndex === -1) return;
    setActiveSegment(initialIndex);

    segmentRefs.current.forEach((seg, i) => {
      const color =
        i === initialIndex
          ? menuItems[i].activeColor || "#FF5722"
          : "rgba(255,255,255,0.05)";
      gsap.set(seg, { backgroundColor: color });
    });
  }, [currentSection]);

  // 🔹 Hover: solo feedback visual
  const handleSegmentHover = (hoverIndex) => {
    segmentRefs.current.forEach((seg, i) => {
      const color =
        i === hoverIndex || i === activeSegment
          ? menuItems[i].activeColor || "#FF5722"
          : "rgba(255,255,255,0.05)";
      gsap.to(seg, {
        backgroundColor: color,
        duration: 0.3,
      });
    });
  };

  // 🔹 Selección real: click o joystick release
  const handleSegmentSelect = (selectIndex) => {
    if (selectIndex === null) return;

    // 1️⃣ Guardar el segmento como activo
    setActiveSegment(selectIndex);

    const section = menuItems[selectIndex]?.section;
    if (!section) return;

    // 2️⃣ Delay para animación cinematográfica
    gsap.delayedCall(0.5, () => {
      useStore.getState().camera.setCurrentSection(section);
      useStore.getState().menu.close();
    });
  };

  // 🔹 Animación de apertura/cierre de segmentos
  useGSAP(
    () => {
      if (segmentRefs.current.length === 0) return;

      const indices = [...Array(segmentRefs.current.length).keys()].sort(
        () => Math.random() - 0.5
      );

      if (isMenuOpen) {
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
        menuItems={menuItems}
        isOpen={isMenuOpen}
        onSegmentMove={handleSegmentHover} // solo feedback visual
        onSegmentRelease={handleSegmentSelect} // acción real al soltar
      />

      {/* segmentos */}
      <div
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
              item={{
                ...item,
                icon: Icon,
                onHover: handleSegmentHover,
                onClick: () => handleSegmentSelect(i), // click también selecciona
              }}
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
