import { useRef } from "react";
import { CURSOR_TRAIL_CONFIG } from "../../constants/cursorTrail";
import { useCursorTrail } from "../../hooks/useCursorTrail";
import TrailItem from "./TrailItem";

const {
  IMAGES_BASE_PATH,
  IMAGE_PREFIX,
  IMAGE_EXTENSION,
  IMAGE_COUNT,
  SLICE_COUNT,
} = CURSOR_TRAIL_CONFIG;

const images = Array.from(
  { length: IMAGE_COUNT },
  (_, i) => `${IMAGES_BASE_PATH}/${IMAGE_PREFIX}${i + 1}${IMAGE_EXTENSION}`
);

const CursorTrail = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useCursorTrail({ containerRef, itemsRef });

  return (
    <div ref={containerRef} className="cursor-trail">
      {images.map((src, i) => (
        <TrailItem
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          image={src}
          sliceCount={SLICE_COUNT}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
