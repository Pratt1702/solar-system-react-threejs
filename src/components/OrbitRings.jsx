import React from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export default function OrbitRing({
  radius = 10,
  segments = 128,
  color = "#555555",
}) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
    );
  }

  return <Line points={points} color={color} lineWidth={1} dashed={false} />;
}
