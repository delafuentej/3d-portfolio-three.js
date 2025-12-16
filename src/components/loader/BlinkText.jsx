import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const BlinkText = ({ lines, additionalClassName = "mt-5" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split por caracteres (chars)
    const split = new SplitText(containerRef.current, {
      type: "lines,chars",
    });

    const chars = split.chars;

    chars.forEach((char, i) => {
      gsap.to(
        char,
        {
          opacity: 0.1,
          stagger: 0.5,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          delay: i * 0.2, // 🔥 MISMO delay acumulativo
          ease: "power3.out",
        },
        "0"
      );
    });

    return () => {
      split.revert(); // limpieza correcta
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`blink-text-container ${additionalClassName}`}
    >
      {lines.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
};

export default BlinkText;
