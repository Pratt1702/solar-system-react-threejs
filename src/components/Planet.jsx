import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Planet({
  timescale = 1,
  radius = 1,
  distance = 18,
  rotSpeed = 0.02,
  revSpeed = 0.01,
  color = "#00aaff",
  textureUrl = null,
}) {
  const pivotRef = useRef();
  const planetRef = useRef();
  const texture = textureUrl ? useTexture(textureUrl) : null;
  useFrame((_, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * revSpeed * timescale;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * rotSpeed * timescale;
    }
  });
  return (
    <group ref={pivotRef}>
      <mesh ref={planetRef} position={[distance, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial map={texture} color={color} />
        <ambientLight intensity={-0.4} />
        <meshStandardMaterial
          map={texture}
          emissive={"#222222"}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}
