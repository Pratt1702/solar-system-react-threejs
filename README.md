# 🌌 Solar System — React + Three.js

An interactive solar system built from scratch using React Three Fiber.  
No Blender. No templates. Just code, curiosity, and a screen full of stars.

## 🚀 Live Demo
Explore the system here: [3d-solar-system-pratheek.vercel.app](https://3d-solar-system-pratheek.vercel.app)

## 🧠 Features
- Sun with emissive glow and light source
- Realistic planet sizes, colors, and textures
- Orbital rings and revolution logic for each planet
- Individual planet rotation (real values)
- Modular PLANETS array for easy scaling and customization
- Bloom effects, starfield background, and camera controls
- OrbitControls with zoom, pan, and rotate

## 🛠️ Tech Stack
- React + Vite
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing

## 📁 Structure
- `src/` — All components (Sun, Planet, OrbitRing, etc.)
- `public/textures/` — Planet texture maps
- `SolarScene.jsx` — Main canvas and scene logic

## 🧩 How to Run Locally
```bash
git clone https://github.com/Pratt1702/solar-system-react-threejs
cd solar-system-react-threejs
npm install
npm run dev
