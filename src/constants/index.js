export const menuItems = [
  {
    label: "Mision",
    icon: "IoCompassSharp",
    href: "#mision",
    activeColor: "#00E5FF99",
  },
  {
    label: "Work",
    icon: "IoFolderSharp",
    href: "#work",
    activeColor: "#2979FF99",
  },
  {
    label: "Collaboration",
    icon: "FaHandshakeSimple",
    href: "#colaboration",
    activeColor: "#00FF9C99",
  },

  {
    label: "Contact",
    icon: "IoMailSharp",
    href: "#contact",
    activeColor: "#FF3D8199",
  },

  {
    label: "Stack",
    icon: "FaTools",
    href: "#stack",
    activeColor: "#8B5CF699",
  },

  {
    label: "Insights",
    icon: "IoScanSharp",
    href: "#insights",
    activeColor: "#FF910099",
  },
];

export function getResponsiveConfig() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth < 1000;

  const maxSize = Math.min(viewportWidth * 0.9, viewportHeight * 0.9);
  const menuSize = isMobile ? Math.min(maxSize, 480) : 700;

  return {
    menuSize,
    center: menuSize / 2,
    innerRadius: menuSize * 0.08,
    outerRadius: menuSize * 0.42,
    contentRadius: menuSize * 0.28,
  };
}
