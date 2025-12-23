// src/components/UnderConstructionSection.jsx
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { useModels } from "../hooks/useModels";

const UnderConstructionSection = ({
  position = [0, 0, 0],
  rotation,
  scale = [2.5, 2.5, 2.5],
}) => {
  const { underConstructionModel } = useModels();

  const cloneModel = clone(underConstructionModel.scene);

  return (
    <primitive
      object={cloneModel}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default UnderConstructionSection;
