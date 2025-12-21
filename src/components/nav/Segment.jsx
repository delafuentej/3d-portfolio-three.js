// Segment.js
import { forwardRef } from "react";

const Segment = forwardRef(function Segment(
  { item, index, total, config },
  ref
) {
  const { menuSize, center, innerRadius, outerRadius, contentRadius } = config;

  const anglePerSegment = 360 / total;
  const baseStartAngle = anglePerSegment * index;
  const centerAngle = baseStartAngle + anglePerSegment / 2;
  const startAngle = baseStartAngle + 0.19;
  const endAngle = baseStartAngle + anglePerSegment - 0.19;

  // Coordenadas para el clipPath
  const innerStartX =
    center + innerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180);
  const innerStartY =
    center + innerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180);
  const outerStartX =
    center + outerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180);
  const outerStartY =
    center + outerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180);
  const innerEndX =
    center + innerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180);
  const innerEndY =
    center + innerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180);
  const outerEndX =
    center + outerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180);
  const outerEndY =
    center + outerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = [
    `M ${innerStartX} ${innerStartY}`,
    `L ${outerStartX} ${outerStartY}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
    "Z",
  ].join(" ");

  const contentX =
    center + contentRadius * Math.cos(((centerAngle - 90) * Math.PI) / 180);
  const contentY =
    center + contentRadius * Math.sin(((centerAngle - 90) * Math.PI) / 180);

  return (
    <a
      ref={ref}
      href={item.href}
      className="menu-segment"
      style={{
        clipPath: `path('${pathData}')`,
        width: `${menuSize}px`,
        height: `${menuSize}px`,
        position: "absolute",
      }}
      onMouseEnter={() => item.onHover?.(index)} // solo hover visual
      onMouseLeave={() => item.onHover?.(null)}
      onClick={(e) => {
        e.preventDefault();
        item.onClick?.(index); // selecciona sección real
      }}
    >
      <div
        className="segment-content"
        style={{
          left: `${contentX}px`,
          top: `${contentY}px`,
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        {item?.icon && <item.icon className="item-icon" />}
        <div className="label">{item.label}</div>
      </div>
    </a>
  );
});

export default Segment;
