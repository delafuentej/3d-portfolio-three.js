import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import vertexShader from '../shaders/particles/vertex.glsl';
import fragmentShader from '../shaders/particles/fragment.glsl';

export default function Particles() {
  const pointsRef = useRef();
  const { size } = useThree();
 const [cursor, setCursor] = useState(new THREE.Vector2(9999, 9999));

  // Crear un canvas para la textura de desplazamiento
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const displacementTexture = new THREE.CanvasTexture(canvas);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / size.width) * canvas.width;
      const y = (1 - e.clientY / size.height) * canvas.height;
      setCursor(new THREE.Vector2(x, y));
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [size]);

  useFrame(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(cursor.x, cursor.y, 10, 0, Math.PI * 2);
    ctx.fill();

    displacementTexture.needsUpdate = true;
  });

  const geometry = new THREE.PlaneGeometry(10, 10, 256, 256);
  geometry.setIndex(null);
  geometry.deleteAttribute('normal');
  

  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uPictureTexture: { value: textureLoader.load('/images/me.png') },
      uDisplacementTexture: { value: displacementTexture },
    },
  });


  return <points ref={pointsRef} geometry={geometry} material={material} castShadow={false} receiveShadow={false}/>;
}