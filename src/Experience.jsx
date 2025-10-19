// import { Suspense } from "react";
import {
  PresentationControls,
  OrbitControls,
  useGLTF,
  Environment,
  Float,
} from "@react-three/drei";
// import { Perf } from "r3f-perf";
import { useResponsiveValues } from "./utils/responsiveValues";
import {
  CustomText,
  GitHubLogo,
  MacBook,
  Hologram,
  LinkedinLogo,
  Mailbox,
} from "./components";

export default function Experience() {
  const { controls, hologram, light, titleText } = useResponsiveValues();
  //models
  const macbookModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  const gitHubModel = useGLTF("/models/github.glb");
  //fonts
  const bangersFont = "./fonts/bangers-v20-latin-regular.woff";
  const cabinSketchFont = "./fonts/CabinSketch-Bold.woff";

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <color args={["#2C2F33"]} attach="background" />
      {/* <Suspense fallback={null}> */}
      <OrbitControls
        enableDamping
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

          {/* <CameraController /> */}

          <MacBook model={macbookModel} />

          <GitHubLogo model={gitHubModel} />

          {/* <UIOverlay /> */}

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
      {/* </Suspense> */}
    </>
  );
}
