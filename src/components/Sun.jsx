import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sun() {
  const sunRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 2;
    }
  });
  return (
    <group>
      {/*glowing sphere*/}
      <mesh ref={sunRef}>
        <sphereGeometry args={[6, 16, 16]} />
        <meshStandardMaterial
          emissive={"#ffcc33"}
          emissiveIntensity={5}
          color={"#000000"}
        />
      </mesh>
      {/* illuminate nearby objects*/}
      <pointLight
        position={[0, 0, 0]}
        color="white"
        intensity={100}
        distance={500}
        decay={2}
      />
      {/* temporary object */}
      <mesh ref={sunRef} position={[20, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}
