import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function SolarScene() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      camera={{ position: [0, 0, 100], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <Sun />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.6}
        />
      </EffectComposer>
      <OrbitControls />
      <Stars radius={300} depth={50} count={2000} factor={10} />
    </Canvas>
  );
}
