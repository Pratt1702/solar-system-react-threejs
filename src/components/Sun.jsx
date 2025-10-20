import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Sun() {
  const sunRef = useRef();
  const sunTexture = useTexture("/textures/sun_texture.jpg");

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.00078;
    }
  });
  return (
    <group>
      {/*glowing sphere with texture*/}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={"#ffa724"}
          emissiveIntensity={2}
        />
        <ambientLight intensity={1} />
        <pointLight
          position={[0, 0, 0]}
          color="white"
          intensity={50}
          distance={10000}
          decay={0.8}
        />
      </mesh>
    </group>
  );
}
