import { Suspense } from "react";
import {
  PresentationControls,
  OrbitControls,
  useGLTF,
  Environment,
  Float,
} from "@react-three/drei";
import { useResponsiveValues } from "./utils/responsiveValues";
import { CustomText, GitHubLogo, MacBook, Hologram } from "./components";

export default function Experience() {
  const { controls, hologram, light, titleText } = useResponsiveValues();
  //models
  const macbookModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  const gitHubModel = useGLTF("/model/github.glb");
  //fonts
  const bangersFont = "./fonts/bangers-v20-latin-regular.woff";
  const cabinSketchFont = "./fonts/CabinSketch-Bold.woff";

  return (
    <>
      <color args={["#2C2F33"]} attach="background" />
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={controls.enableZoom}
          enableRotate
          enablePan={false}
          minDistance={2}
          maxDistance={controls.maxDistance}
        />

        <Environment preset="studio" />

        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
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
              color={"#00897B"}
              rotation={[0.1, Math.PI, 0]}
              position={[0, 0.55, -1.03]}
              occlude
            />

            <MacBook model={macbookModel} />

            <GitHubLogo model={gitHubModel} />

            <CustomText
              font={cabinSketchFont}
              fontSize={titleText.fontSize}
              position={titleText.position}
              color="#00897B"
            >
              delafuentej
            </CustomText>

            <CustomText
              font={bangersFont}
              fontSize={titleText.fontSize}
              position={[3.75, 0.75, 0]}
              rotationY={-1.25}
              maxWidth={2}
              color="#e1d8d0"
            >
              3d creative developer
            </CustomText>
          </Float>
        </PresentationControls>
      </Suspense>
    </>
  );
}
