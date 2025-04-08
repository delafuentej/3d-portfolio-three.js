import { Suspense } from 'react';

import Particles from './Particles';

export default function Hologram({position=[0, 0,0], scale=[1, 1, 1], rotation=[0, 0, 0]}) {
  return (
    <Suspense fallback={null}>
      <group 
        position={position} 
        scale={scale}   
        rotation={rotation}
        // onUpdate={(self) => {
        //   self.traverse((child) => {
        //     child.layers.disable(1); // desactiva layer 1
        //   });
        // }}
        >
      <Particles />
      </group>
    </Suspense>
  );
}