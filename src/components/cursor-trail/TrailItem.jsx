import { forwardRef } from "react";
import TrailSlice from "./TrailSlice";

const TrailItem = forwardRef(({ image, sliceCount }, ref) => {
  return (
    <div ref={ref} className="trail-img">
      {Array.from({ length: sliceCount }).map((_, i) => (
        <TrailSlice key={i} image={image} />
      ))}
    </div>
  );
});

TrailItem.displayName = "TrailItem";

export default TrailItem;
