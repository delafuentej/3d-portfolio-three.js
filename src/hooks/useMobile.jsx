import { useState, useEffect } from "react";

const REFERENCE_WIDTH = 1920;
const MOBILE_THRESHOLD = 768; //990

const useMobile = () => {
  const [scaleFactor, setScaleFactor] = useState(
    window.innerWidth / REFERENCE_WIDTH
  );
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_THRESHOLD
  );

  useEffect(() => {
    const handleResize = () => {
      setScaleFactor(window.innerWidth / REFERENCE_WIDTH);
      setIsMobile(window.innerWidth <= MOBILE_THRESHOLD);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    scaleFactor,
    isMobile,
  };
};

export default useMobile;
