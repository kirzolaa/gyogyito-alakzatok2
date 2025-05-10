import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function getRainbowColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 60%)`;
}

export default function BoxShape({ onEpicClick, enableRainbow }) {
  const ref = useRef();
  const color = enableRainbow ? getRainbowColor() : "#50fa7b";
  const emissive = enableRainbow ? getRainbowColor() : "#3ecf6e";
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.8 * delta;
    ref.current.rotation.x += 0.5 * delta;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow onClick={onEpicClick}>
      <boxGeometry args={[2.7, 2.7, 2.7]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.19} emissive={emissive} emissiveIntensity={0.23} />
    </mesh>
  );
}
