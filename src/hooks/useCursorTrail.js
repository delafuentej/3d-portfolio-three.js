import gsap from "gsap";
import { useEffect } from "react";
import { distance, clipIn, clipOut } from "../utils/cursorTrail";
import { CURSOR_TRAIL_CONFIG } from "../constants/cursorTrail";

const { IMAGE_COUNT, SIZE, MOUSE_THRESHOLD } = CURSOR_TRAIL_CONFIG;

export function useCursorTrail({ containerRef, itemsRef }) {
  useEffect(() => {
    if (window.innerWidth < 1000) return;

    const container = containerRef.current;
    if (!container) return;

    const mouse = { x: 0, y: 0 };
    const lastMouse = { x: 0, y: 0 };
    let index = 0;

    const rect = () => container.getBoundingClientRect();

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    document.addEventListener("mousemove", onMove);

    const play = () => {
      const item = itemsRef.current[index];
      if (!item) return;

      index = (index + 1) % IMAGE_COUNT;

      const r = rect();
      const x = mouse.x - r.left - SIZE / 2;
      const y = mouse.y - r.top - SIZE / 2;

      gsap.set(item, { x, y, opacity: 1, zIndex: index });

      const slices = item.children;
      const tl = gsap.timeline();

      tl.fromTo(
        slices,
        { clipPath: (i) => clipIn(i) },
        {
          clipPath: (i) => clipOut(i),
          duration: 0.75,
          ease: "expo.out",
          stagger: { each: 0.06, from: "center" },
        }
      )
        .to(
          slices,
          {
            clipPath: (i) => clipIn(i),
            duration: 1,
            ease: "expo.inOut",
            stagger: { each: 0.025, from: "edges" },
          },
          "+=0.35"
        )
        .to(
          item.querySelectorAll(".image-layer"),
          {
            opacity: 0.7,
            duration: 1,
            ease: "expo.out",
          },
          "<"
        );
    };

    gsap.ticker.add(() => {
      if (distance(mouse, lastMouse) > MOUSE_THRESHOLD) {
        play();
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(play);
    };
  }, []);
}
