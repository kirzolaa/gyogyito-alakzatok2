import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function getRainbowColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 60%)`;
}

export default function ConeShape({ onEpicClick, enableRainbow }) {
  const ref = useRef();
  const color = enableRainbow ? getRainbowColor() : "#ff79c6";
  const emissive = enableRainbow ? getRainbowColor() : "#ff79c6";
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.5 * delta;
    ref.current.rotation.x += 0.7 * delta;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow onClick={onEpicClick}>
      <coneGeometry args={[1.5, 3.5, 128]} />
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.22} emissive={emissive} emissiveIntensity={0.19} />
    </mesh>
  );
}
