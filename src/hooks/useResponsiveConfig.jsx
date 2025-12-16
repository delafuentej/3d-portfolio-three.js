import { useState, useEffect } from "react";
import { getResponsiveConfig } from "../constants";

export function useResponsiveConfig() {
  const [config, setConfig] = useState(getResponsiveConfig());

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return config;
}
