import { useEffect, Suspense } from "react";

import { useResponsiveValues } from "../utils/responsiveValues";
import {
  PresentationControls,
  OrbitControls,
  useGLTF,
  Float,
} from "@react-three/drei";
import {
  Hologram,
  CustomText,
  GitHubLogo,
  LinkedinLogo,
  MacBook,
  Mailbox,
} from "../components";

export default function Home({ ready }) {
  const { controls, hologram, light, titleText } = useResponsiveValues();

  const macbookModel = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );
  const gitHubModel = useGLTF("/models/github.glb");

  const bangersFont = "./fonts/bangers-v20-latin-regular.woff";
  const cabinSketchFont = "./fonts/CabinSketch-Bold.woff";

  useEffect(() => {
    if (!ready) return;
    // animaciones de entrada Home
  }, [ready]);

  return (
    <>
      <OrbitControls
        enableDamping
        enableZoom={controls.enableZoom}
        enableRotate
        enablePan={false}
        minDistance={2}
        maxDistance={controls.maxDistance}
        minPolarAngle={Math.PI / 2} // ← Mantener la cámara nivelada
        maxPolarAngle={Math.PI / 2} // ← Impide rotar en X
      />

      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[0, 0]}
          azimuth={[-2, 0.75]}
          config={{ mass: 2, tension: 400 }}
        >
          <Hologram
            position={hologram.position}
            scale={hologram.scale}
            rotation={[0, 1.25, 0]}
          />

          <Float rotationIntensity={0.4}>
            <rectAreaLight
              width={2.5}
              height={1.65}
              intensity={light.intensity}
              color="#00897B"
              rotation={[0.1, Math.PI, 0]}
              position={[0, 0.55, -1.03]}
            />

            <MacBook model={macbookModel} ready={ready} />
            <GitHubLogo model={gitHubModel} />
            <LinkedinLogo />
            <Mailbox />

            <CustomText
              font={cabinSketchFont}
              fontSize={titleText.fontSize}
              position={titleText.position}
              color="#00897B"
              maxWidth={5}
              rotationY={1.25}
            >
              delafuente
            </CustomText>

            <CustomText
              font={bangersFont}
              fontSize={titleText.fontSize}
              position={[3.75, 0.75, 0]}
              rotationY={-1.25}
              maxWidth={2}
              color="#00897B"
            >
              3d creative developer
            </CustomText>
          </Float>
        </PresentationControls>
      </Suspense>
    </>
  );
}
