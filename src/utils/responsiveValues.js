import { useMobile } from "../hooks";

export function useResponsiveValues() {
  const { isMobile, scaleFactor } = useMobile;

  return {
    isMobile,
    scaleFactor,
    controls: {
      enableZoom: !isMobile,
      maxDistance: isMobile ? 5 : 8,
    },
    hologram: {
      position: isMobile ? [-2, 0.5, 1] : [-3.75, 0.75, 1],
      scale: isMobile ? [0.25, 0.25, 0.25] : [0.35, 0.35, 0.35],
    },
    light: {
      intensity: isMobile ? 20 : 35,
    },
    macbook: {
      positionY: isMobile ? -2 : -1.8,
      scale: isMobile ? 0.8 : 1,
      distanceFactor: isMobile ? 1 : 1.17,
    },
    titleText: {
      fontSize: isMobile ? 0.6 : 1,
      position: isMobile ? [0.3, 1.6, -1.5] : [0.6, 2, -1.7],
    },
    github: {
      scale: isMobile ? 0.008 : 0.01,
      position: isMobile ? [-0.85, 1.5, -1.2] : [-0.85, 1.5, -1.5],
    },
    linkedin: {
      scale: isMobile ? 0.055 : 0.055,
      position: isMobile ? [0.85, 2, -1.35] : [0.85, 2, -1.65],
      rotation: [Math.PI / 2, 0, 0],
    },
  };
}
