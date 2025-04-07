import { useCursor } from '@react-three/drei'
import { useState } from 'react'

export default function GitHubModel({ model }) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  return (
    <group
      scale={0.01}
     position={[-2.5, 1.5, -1.5]}
      rotation-y={0.13}
      onClick={() => window.open('https://github.com/delafuentej', '_blank')}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={model.scene} />
    </group>
  )
}