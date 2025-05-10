import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function getRainbowColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 60%)`;
}

export default function TorusShape({ onEpicClick, enableRainbow }) {
  const ref = useRef();
  const color = enableRainbow ? getRainbowColor() : "#ffb86c";
  const emissive = enableRainbow ? getRainbowColor() : "#ffb86c";
  useFrame((state, delta) => {
    ref.current.rotation.y += 0.6 * delta;
    ref.current.rotation.x += 0.4 * delta;
  });
  return (
    <mesh ref={ref} castShadow receiveShadow onClick={onEpicClick}>
      <torusGeometry args={[2, 0.7, 64, 180]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.13} emissive={emissive} emissiveIntensity={0.22} />
    </mesh>
  );
}
