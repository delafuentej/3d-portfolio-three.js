import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const BlinkTextTitle = ({
  text,
  as = "p",
  className = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl",
  type = "chars", // puede ser "chars", "words" o "lines"
  stagger = 0.05,
  duration = 5,
}) => {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => {
    if (!ref.current) return;

    // Crear SplitText
    const split = new SplitText(ref.current, { type });

    // Obtener los elementos a animar según el tipo
    const targets =
      type === "chars"
        ? split.chars
        : type === "words"
        ? split.words
        : split.lines;

    // Inicializamos la opacidad
    gsap.set(targets, { opacity: 0 });

    // Animación de parpadeo
    gsap.to(targets, {
      opacity: 0.9,
      duration,
      //   repeat: -1,
      //   yoyo: true,
      delay: 1,
      stagger,

      ease: "power3.inOut",
    });

    return () => split.revert(); // limpieza al desmontar
  }, [stagger, duration, type]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
};

export default BlinkTextTitle;
