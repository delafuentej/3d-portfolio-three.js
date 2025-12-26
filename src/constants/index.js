export const menuItems = [
  {
    label: "Mission",
    icon: "IoCompassSharp",
    section: "mission",
    activeColor: "#00897B",
  },
  {
    label: "Work",
    icon: "IoFolderSharp",
    section: "work",
    activeColor: "#2C2F33",
  },

  {
    label: "Collaboration",
    icon: "FaHandshakeSimple",
    section: "collaboration",
    activeColor: "#00897B",
  },

  {
    label: "Contact",
    icon: "IoMailSharp",
    section: "contact",
    activeColor: "#2C2F33",
  },

  {
    label: "Stack",
    icon: "FaTools",
    section: "stack",
    activeColor: "#00897B",
  },

  {
    label: "Home",
    icon: "IoHomeSharp",
    section: "home",
    activeColor: "#2C2F33",
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

export const LANGUAGES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];
