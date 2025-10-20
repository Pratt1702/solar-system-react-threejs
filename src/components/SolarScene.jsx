import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Planet from "./Planet";
import OrbitRing from "./OrbitRings";

// Array of planet data for modularity & clarity
const PLANETS = [
  {
    name: "Mercury",
    radius: 0.05,
    distance: 3,
    rotSpeed: 0.000341,
    revSpeed: 0.000125,
    color: "#b1b1b1",
    ring: true,
    textureUrl: "/textures/mercury_texture.jpg",
  },
  {
    name: "Venus",
    radius: 0.12,
    distance: 5.5,
    rotSpeed: -0.0000823, // retrograde
    revSpeed: 0.00004895,
    color: "#d2b48c",
    ring: true,
    textureUrl: "/textures/venus_texture.jpg",
  },
  {
    name: "Earth",
    radius: 0.13,
    distance: 7.5,
    rotSpeed: 0.02,
    revSpeed: 0.00003012,
    color: "#00aaff",
    ring: true,
    textureUrl: "/textures/earth_texture.jpg",
  },
];

export default function SolarScene({ timescale = 100 }) {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      camera={{ position: [0, 0, 100], fov: 15 }}
    >
      <ambientLight intensity={0.5} />
      <Sun />
      {/* Render planets via mapping */}
      {PLANETS.map(({ name, ring, ...planetProps }, idx) => (
        <React.Fragment key={name}>
          <Planet {...planetProps} timescale={timescale} />
          {ring && <OrbitRing radius={planetProps.distance} />}
        </React.Fragment>
      ))}
      <EffectComposer>
        <Bloom
          intensity={1.25}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.6}
        />
      </EffectComposer>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        zoomSpeed={1}
        panSpeed={5}
        maxDistance={300}
        enableRotate={true}
        rotateSpeed={0.1}
        target={[0, 0, 0]} // Ensure camera rotates around the origin (the sun)
      />

      <Stars radius={300} depth={50} count={20000} factor={10} />
    </Canvas>
  );
}
