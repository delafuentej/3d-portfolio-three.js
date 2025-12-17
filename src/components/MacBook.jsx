import { Html } from "@react-three/drei";
import { useResponsiveValues } from "../utils/responsiveValues";
import useStore from "../store/useStore";

export default function MacBook({ model }) {
  const { macbook } = useResponsiveValues();

  const isMenuOpen = useStore((state) => state.menu.isOpen);

  return (
    <primitive
      object={model.scene}
      position-y={macbook.positionY}
      rotation-y={0.13}
      scale={macbook.scale}
    >
      {!isMenuOpen && (
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={macbook.distanceFactor}
          position={[0, 1.56, -1.4]}
          rotation-x={-0.256}
          occlude
          style={{ pointerEvents: "auto" }}
        >
          <iframe
            src="https://3d-projects-beta.vercel.app/"
            className="screen-iframe"
          />
        </Html>
      )}
    </primitive>
  );
}
