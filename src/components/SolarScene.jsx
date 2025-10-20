import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointerLockControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Planet from "./Planet";
import OrbitRing from "./OrbitRings";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

// Array of planet data for modularity & clarity
const PLANETS = [
  {
    name: "Mercury",
    radius: 0.07, // ~1/30th of Sun
    distance: 4,
    rotSpeed: 0.000341,
    revSpeed: 0.000125,
    color: "#b1b1b1",
    ring: true,
    textureUrl: "/textures/mercury_texture.jpg",
  },
  {
    name: "Venus",
    radius: 0.18,
    distance: 6.5,
    rotSpeed: -0.0000823,
    revSpeed: 0.00004895,
    color: "#d2b48c",
    ring: true,
    textureUrl: "/textures/venus_texture.jpg",
  },
  {
    name: "Earth",
    radius: 0.19,
    distance: 9,
    rotSpeed: 0.02,
    revSpeed: 0.00003012,
    color: "#00aaff",
    ring: true,
    textureUrl: "/textures/earth_texture.jpg",
  },
  {
    name: "Mars",
    radius: 0.1,
    distance: 12,
    rotSpeed: 0.0194,
    revSpeed: 0.000016,
    color: "#ff6b4a",
    ring: true,
    textureUrl: "/textures/mars_texture.jpg",
  },
  {
    name: "Jupiter",
    radius: 1.6, // ~80% of Sun
    distance: 20,
    rotSpeed: 0.0488,
    revSpeed: 0.00000254,
    color: "#f4e2d8",
    ring: true,
    textureUrl: "/textures/jupiter_texture.jpg",
  },
  {
    name: "Saturn",
    radius: 1.3,
    distance: 28,
    rotSpeed: 0.0455,
    revSpeed: 0.00000102,
    color: "#f5deb3",
    ring: true,
    textureUrl: "/textures/saturn_texture.jpg",
  },
  {
    name: "Uranus",
    radius: 0.55,
    distance: 36,
    rotSpeed: -0.0278,
    revSpeed: 0.000000358,
    color: "#b0e0e6",
    ring: true,
    textureUrl: "/textures/uranus_texture.jpg",
  },
  {
    name: "Neptune",
    radius: 0.53,
    distance: 44,
    rotSpeed: 0.0299,
    revSpeed: 0.000000183,
    color: "#4169e1",
    ring: true,
    textureUrl: "/textures/neptune_texture.jpg",
  },
];

function StarfieldSkyDome() {
  const texture = useLoader(THREE.TextureLoader, "/textures/starfield_hd.jpg");
  return (
    <mesh scale={[-1, 1, 1]} position={[0, 0, 0]}>
      <sphereGeometry args={[2000, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

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
      <StarfieldSkyDome />
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
        maxDistance={3000}
        enableRotate={true}
        rotateSpeed={0.1}
        target={[0, 0, 0]}
      />
      {/* Hybrid star field: immersive skydome and local 3D stars */}
      <Stars radius={300} depth={50} count={30000} factor={10} />
    </Canvas>
  );
}
