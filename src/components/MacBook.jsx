import { Html } from "@react-three/drei";
import { useResponsiveValues } from "../utils/responsiveValues";

export default function MacBook({ model }) {
  const { macbook } = useResponsiveValues();

  return (
    <primitive
      object={model.scene}
      position-y={macbook.positionY}
      rotation-y={0.13}
      scale={macbook.scale}
    >
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={macbook.distanceFactor}
        position={[0, 1.56, -1.4]}
        rotation-x={-0.256}
        occlude
      >
        <iframe src="https://3d-projects-beta.vercel.app/" />
      </Html>
    </primitive>
  );
}
