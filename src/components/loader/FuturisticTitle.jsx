import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const FuturisticTitle = ({
  text,
  as = "h1",
  className = "",
  duration = 2,
  stagger = 0.05,
}) => {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => {
    if (!ref.current) return;

    // SplitText por caracteres
    const split = new SplitText(ref.current, { type: "chars" });
    const chars = split.chars;

    // Animación futurista
    gsap.set(chars, { opacity: 0, y: -10, scale: 0.8 });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease: "power3.inOut",
      stagger,
      repeat: -1,
      yoyo: true,
    });

    return () => split.revert();
  }, [duration, stagger]);

  return (
    <Tag ref={ref} className={`uppercase ${className}`}>
      {text}
    </Tag>
  );
};

export default FuturisticTitle;
