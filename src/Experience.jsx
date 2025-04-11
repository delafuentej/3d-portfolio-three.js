import { Suspense } from "react";
import {
  Text,
  PresentationControls,
  OrbitControls,
  useGLTF,
  Environment,
  Float,
  Html,
} from "@react-three/drei";
import { useMobile } from "./hooks";
import GitHubModel from "./models/GitHubModel";
import Hologram from "./components/Hologram";

export default function Experience() {
  //hook
  const { isMobile, scaleFactor } = useMobile;

  const macbookModel = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  const gitHubModel = useGLTF("/model/github.glb");

  return (
    <>
      <color args={["#2C2F33"]} attach="background" />
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={!isMobile}
          enableRotate={true}
          enablePan={false}
          minDistance={2}
          maxDistance={isMobile ? 5 : 8}
          //   enableZoom={true}
          //   enableRotate={false}
          //   enablePan={false}
          //   minDistance={2}
          //   maxDistance={8}
        />

        <Environment preset="apartment" />

        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-2, 0.75]}
          config={{ mass: 2, tension: 400 }}
          // snap={{ mass: 4, tension: 400 }}
        >
          <Hologram
            position={isMobile ? [-2, 0.5, 1] : [-3.75, 0.75, 1]}
            scale={isMobile ? [0.25, 0.25, 0.25] : [0.35, 0.35, 0.35]}
            rotation={[0, 1.25, 0]}
          />

          <Float rotationIntensity={0.4}>
            {/* screen light  model*/}
            <rectAreaLight
              width={2.5}
              height={1.65}
              intensity={isMobile ? 20 : 35}
              color={"#00897B"}
              rotation={[0.1, Math.PI, 0]}
              position={[0, 0.55, -1.03]}
              occlude
            />

            {/* macbook model */}
            <primitive
              object={macbookModel.scene}
              position-y={isMobile ? -1.5 : -1.2}
              rotation-y={0.13}
              scale={isMobile ? 0.8 : 1}
              // onUpdate={(self) => {
              //     self.traverse((child) => {
              //       child.layers.enable(1); // habilita layer 1
              //     });
              //   }}
            >
              {/* html screen iframe */}
              <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={isMobile ? 1 : 1.17}
                position={[0, 1.56, -1.4]}
                rotation-x={-0.256}
                occlude
              >
                <iframe src="https://3d-projects-beta.vercel.app/" />
              </Html>
            </primitive>

            {/* github model */}
            <GitHubModel model={gitHubModel} />
            {/* text */}
            <Text
              font="./fonts/CabinSketch-Bold.woff"
              fontSize={isMobile ? 0.6 : 1}
              position={isMobile ? [0.3, 1.6, -1.5] : [0.6, 2, -1.7]}
              textAlign="center"
              color="#00897B"
            >
              delafuentej
            </Text>

            <Text
              font="./fonts/bangers-v20-latin-regular.woff"
              //   fontSize={0.8 * scaleFactor}
              //   position={[1 * scaleFactor, 2 * scaleFactor, -1.7]}
              fontSize={1}
              position={[3.75, 0.75, 0]}
              rotation-y={-1.25}
              maxWidth={2}
              color="#e1d8d0"
              textAlign="center"
            >
              3d creative developer
            </Text>
          </Float>
          {/* <ContactShadows 
            position-y={-1.4}
            opacity={0.2}
            scale={5}
            blur={2.4}
            frames={1}
            onUpdate={(self) => self.layers.set(1)} // escucha solo layer 1
            /> */}
        </PresentationControls>
      </Suspense>
    </>
  );
}
