import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Particles from './Particles';

export default function Image({position=[0, 0,0], scale=[1, 1, 1], rotation=[0, 0, 0]}) {
  return (
    <Suspense fallback={null}>
      <group position={position} scale={scale} rotation={rotation}>
        <Particles />
        {/* <GitHubModel model={gitHubModel} /> */}
      <Particles />
      <OrbitControls />
      </group>
    </Suspense>
  );
}