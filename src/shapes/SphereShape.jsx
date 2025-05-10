import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

function getRainbowColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 60%)`;
}

export default function SphereShape({ onEpicClick, enableRainbow }) {
  const ref = useRef();
  const [rainbow, setRainbow] = useState({
    color: getRainbowColor(),
    emissive: getRainbowColor(),
  });

  // Only update color on click
  const handleClick = (e) => {
    if (enableRainbow) {
      setRainbow({ color: getRainbowColor(), emissive: getRainbowColor() });
    }
    if (onEpicClick) onEpicClick(e);
  };

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.7 * delta;
    ref.current.rotation.x += 0.2 * delta;
  });
  const color = enableRainbow ? rainbow.color : "#8be9fd";
  const emissive = enableRainbow ? rainbow.emissive : "#6be1fd";
  return (
    <mesh ref={ref} castShadow receiveShadow onClick={handleClick}>
      <sphereGeometry args={[2.2, 128, 128]} />
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.18} emissive={emissive} emissiveIntensity={0.35} />
    </mesh>
  );
}
