import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function getRainbowColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 60%)`;
}

export default function DodecahedronShape({ onEpicClick, enableRainbow }) {
  const ref = useRef();
  const color = enableRainbow ? getRainbowColor() : "#f1fa8c";
  const emissive = enableRainbow ? getRainbowColor() : "#f1fa8c";
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.55 * delta;
    ref.current.rotation.x += 0.55 * delta;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow onClick={onEpicClick}>
      <dodecahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.13} emissive={emissive} emissiveIntensity={0.18} />
    </mesh>
  );
}
