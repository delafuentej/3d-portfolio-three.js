import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useResponsiveValues } from "../../utils/responsiveValues";
import useHoverGlow from "../../hooks/useHoverGlow";

import { config } from "../../config";
function GitHubLogo(props) {
  console.log("config", config);
  const { nodes, materials } = useGLTF("/models/github.glb");

  const { setHovered } = useHoverGlow(materials, "#7FFF00", 10);

  const { github } = useResponsiveValues();
  return (
    <group
      {...props}
      dispose={null}
      position={github.position}
      scale={github.scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => window.open(`${config.contact.socials[1].url}`, "_blank")}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Extruded001.geometry}
        material={nodes.Extruded001.material}
        position={[-5.581, 52.031, -14.721]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.399}
      />
    </group>
  );
}

export default GitHubLogo;

useGLTF.preload("/models/github.glb");
