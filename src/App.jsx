import { useState, useEffect, useRef } from "react";
import SolarScene from "./components/SolarScene";
import gsap from "gsap";

function TipBubble({ onDismiss }) {
  const tipRef = useRef(null);

  useEffect(() => {
    // Animate in with a slight "pop" effect
    if (tipRef.current) {
      gsap.fromTo(
        tipRef.current,
        { scale: 0.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  return (
    <div
      ref={tipRef}
      onClick={onDismiss}
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "1%",
        left: "1%",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "8px 16px",
        borderRadius: "6px",
        fontSize: "1rem",
        zIndex: 10,
        cursor: "pointer",
        userSelect: "none",
        transformOrigin: "top left",
        gap: "4px",
      }}
    >
      <h3 style={{ marginBottom: 0 }}>💡 Tip:</h3>
      <ul style={{ margin: 0, marginBottom: "4px" }}>
        <li>Left-click + drag to rotate</li>
        <li>scroll to zoom</li>
        <li>right-click + drag to pan.</li>
      </ul>
      Click to hide.
    </div>
  );
}

export default function App() {
  const [showHint, setShowHint] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showHint && <TipBubble onDismiss={() => setShowHint(false)} />}
      <SolarScene selectedPlanet={selectedPlanet} />
    </>
  );
}
