export const menuItems = [
  {
    label: "Mision",
    icon: "IoCompassSharp",
    href: "#mision",
    activeColor: "#00bfff",
  },
  {
    label: "Work",
    icon: "IoFolderSharp",
    href: "#work",
    activeColor: "#8a2be2",
  },
  {
    label: "Stack",
    icon: "FaTools",
    href: "#stack",
    activeColor: "#6a0dad",
  },
  {
    label: "Insights",
    icon: "IoScanSharp",
    href: "#insights",
    activeColor: "#50c878",
  },
  {
    label: "Collaboration",
    icon: "FaHandshakeSimple",
    href: "#colaboration",
    activeColor: "#40E0D0",
  },
  {
    label: "Hire Me",
    icon: "IoInformationCircleSharp",
    href: "#hireme",
    activeColor: "#FF6F61",
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
