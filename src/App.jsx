import { useState, useEffect, useRef } from "react";
import SolarScene from "./components/SolarScene";
import gsap from "gsap";
import "./App.css";

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
    <div ref={tipRef} className="tip-bubble" onClick={onDismiss}>
      <h3 className="tip-bubble-title">💡 Tip:</h3>
      <ul className="tip-bubble-list">
        <li>Left-click + drag to rotate</li>
        <li>scroll to zoom</li>
        <li>right-click + drag to pan.</li>
      </ul>
      Click to hide.
    </div>
  );
}

export default function App() {
  const speedOptions = [
    1, 2, 5, 10, 25, 50, 100, 250, 500, 750, 1000, 2500, 5000,
  ];
  const [showHint, setShowHint] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(9);
  const currentSpeed = speedOptions[speedIdx];

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showHint && <TipBubble onDismiss={() => setShowHint(false)} />}
      <SolarScene timescale={currentSpeed} />

      {/* Fixed bottom bar with Speed + Footer */}
      <div className="bottom-bar-wrap">
        <div className="speed-ui-container">
          <div className="speed-ui">
            <h3 className="speed-ui-heading">SPEED</h3>
            <div className="speed-ui-controls">
              <button
                className="speed-ui-btn"
                onClick={() => setSpeedIdx((i) => Math.max(0, i - 1))}
                disabled={speedIdx === 0}
                aria-label="Decrease speed"
              >
                –
              </button>
              <span className="speed-ui-value">{currentSpeed}x</span>
              <button
                className="speed-ui-btn"
                onClick={() =>
                  setSpeedIdx((i) => Math.min(speedOptions.length - 1, i + 1))
                }
                disabled={speedIdx === speedOptions.length - 1}
                aria-label="Increase speed"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <footer className="mini-footer">
          <span className="mini-footer-made">Made by Pratheek</span>
          <span className="mini-footer-links">
            {/* GitHub */}
            <a
              href="https://github.com/Pratt1702/solar-system-react-threejs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              title="GitHub"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.001 2.5C6.476 2.5 2.001 6.975 2.001 12.5C1.99919 14.5993 2.65876 16.6458 3.88605 18.349C5.11335 20.0522 6.846 21.3254 8.838 21.988C9.338 22.075 9.526 21.775 9.526 21.512C9.526 21.275 9.513 20.488 9.513 19.65C7.001 20.113 6.351 19.038 6.151 18.475C6.038 18.187 5.551 17.3 5.126 17.062C4.776 16.875 4.276 16.412 5.113 16.4C5.901 16.387 6.463 17.125 6.651 17.425C7.551 18.937 8.988 18.512 9.563 18.25C9.651 17.6 9.913 17.163 10.201 16.913C7.976 16.663 5.651 15.8 5.651 11.975C5.651 10.887 6.038 9.988 6.676 9.288C6.576 9.038 6.226 8.013 6.776 6.638C6.776 6.638 7.613 6.375 9.526 7.662C10.3402 7.43664 11.1812 7.32327 12.026 7.325C12.876 7.325 13.726 7.437 14.526 7.662C16.439 6.362 17.276 6.638 17.276 6.638C17.826 8.013 17.476 9.038 17.376 9.288C18.013 9.988 18.401 10.875 18.401 11.975C18.401 15.813 16.064 16.663 13.839 16.913C14.201 17.225 14.514 17.825 14.514 18.763C14.514 20.1 14.501 21.175 14.501 21.513C14.501 21.775 14.689 22.087 15.189 21.987C17.1735 21.3161 18.8978 20.0401 20.1196 18.3384C21.3413 16.6367 21.9989 14.5948 22 12.5C22 6.975 17.525 2.5 12 2.5"
                  fill="white"
                />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/its_pratheeek/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              title="Instagram"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.8 2.5H16.2C19.4 2.5 22 5.1 22 8.3V16.7C22 18.2383 21.3889 19.7135 20.3012 20.8012C19.2135 21.8889 17.7383 22.5 16.2 22.5H7.8C4.6 22.5 2 19.9 2 16.7V8.3C2 6.76174 2.61107 5.28649 3.69878 4.19878C4.78649 3.11107 6.26174 2.5 7.8 2.5ZM7.6 4.5C6.64522 4.5 5.72955 4.87928 5.05442 5.55442C4.37928 6.22955 4 7.14522 4 8.1V16.9C4 18.89 5.61 20.5 7.6 20.5H16.4C17.3548 20.5 18.2705 20.1207 18.9456 19.4456C19.6207 18.7705 20 17.8548 20 16.9V8.1C20 6.11 18.39 4.5 16.4 4.5H7.6ZM17.25 6C17.5815 6 17.8995 6.1317 18.1339 6.36612C18.3683 6.60054 18.5 6.91848 18.5 7.25C18.5 7.58152 18.3683 7.89946 18.1339 8.13388C17.8995 8.3683 17.5815 8.5 17.25 8.5C16.9185 8.5 16.6005 8.3683 16.3661 8.13388C16.1317 7.89946 16 7.58152 16 7.25C16 6.91848 16.1317 6.60054 16.3661 6.36612C16.6005 6.1317 16.9185 6 17.25 6ZM12 7.5C13.3261 7.5 14.5979 8.02678 15.5355 8.96447C16.4732 9.90215 17 11.1739 17 12.5C17 13.8261 16.4732 15.0979 15.5355 16.0355C14.5979 16.9732 13.3261 17.5 12 17.5C10.6739 17.5 9.40215 16.9732 8.46447 16.0355C7.52678 15.0979 7 13.8261 7 12.5C7 11.1739 7.52678 9.90215 8.46447 8.96447C9.40215 8.02678 10.6739 7.5 12 7.5ZM12 9.5C11.2044 9.5 10.4413 9.81607 9.87868 10.3787C9.31607 10.9413 9 11.7044 9 12.5C9 13.2956 9.31607 14.0587 9.87868 14.6213C10.4413 15.1839 11.2044 15.5 12 15.5C12.7956 15.5 13.5587 15.1839 14.1213 14.6213C14.6839 14.0587 15 13.2956 15 12.5C15 11.7044 14.6839 10.9413 14.1213 10.3787C13.5587 9.81607 12.7956 9.5 12 9.5Z"
                  fill="#FBFBFB"
                  fillOpacity="0.8"
                />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/prathikrkrishnan/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              title="LinkedIn"
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 3.5C18.7956 3.5 19.5587 3.81607 20.1213 4.37868C20.6839 4.94129 21 5.70435 21 6.5V18.5C21 19.2956 20.6839 20.0587 20.1213 20.6213C19.5587 21.1839 18.7956 21.5 18 21.5H6C5.20435 21.5 4.44129 21.1839 3.87868 20.6213C3.31607 20.0587 3 19.2956 3 18.5V6.5C3 5.70435 3.31607 4.94129 3.87868 4.37868C4.44129 3.81607 5.20435 3.5 6 3.5H18ZM8 10.5C7.73478 10.5 7.48043 10.6054 7.29289 10.7929C7.10536 10.9804 7 11.2348 7 11.5V16.5C7 16.7652 7.10536 17.0196 7.29289 17.2071C7.48043 17.3946 7.73478 17.5 8 17.5C8.26522 17.5 8.51957 17.3946 8.70711 17.2071C8.89464 17.0196 9 16.7652 9 16.5V11.5C9 11.2348 8.89464 10.9804 8.70711 10.7929C8.51957 10.6054 8.26522 10.5 8 10.5ZM11 9.5C10.7348 9.5 10.4804 9.60536 10.2929 9.79289C10.1054 9.98043 10 10.2348 10 10.5V16.5C10 16.7652 10.1054 17.0196 10.2929 17.2071C10.4804 17.3946 10.7348 17.5 11 17.5C11.2652 17.5 11.5196 17.3946 11.7071 17.2071C11.8946 17.0196 12 16.7652 12 16.5V12.84C12.305 12.496 12.82 12.092 13.393 11.847C13.726 11.705 14.227 11.647 14.575 11.757C14.6904 11.7863 14.7933 11.8523 14.868 11.945C14.92 12.015 15 12.171 15 12.5V16.5C15 16.7652 15.1054 17.0196 15.2929 17.2071C15.4804 17.3946 15.7348 17.5 16 17.5C16.2652 17.5 16.5196 17.3946 16.7071 17.2071C16.8946 17.0196 17 16.7652 17 16.5V12.5C17 11.83 16.83 11.234 16.476 10.756C16.1503 10.3226 15.6944 10.0047 15.175 9.849C14.273 9.566 13.274 9.723 12.607 10.009C12.3935 10.1008 12.1854 10.205 11.984 10.321C11.9421 10.0906 11.8206 9.8822 11.6408 9.73216C11.461 9.58213 11.2342 9.49996 11 9.5ZM8 7.5C7.73478 7.5 7.48043 7.60536 7.29289 7.79289C7.10536 7.98043 7 8.23478 7 8.5C7 8.76522 7.10536 9.01957 7.29289 9.20711C7.48043 9.39464 7.73478 9.5 8 9.5C8.26522 9.5 8.51957 9.39464 8.70711 9.20711C8.89464 9.01957 9 8.76522 9 8.5C9 8.23478 8.89464 7.98043 8.70711 7.79289C8.51957 7.60536 8.26522 7.5 8 7.5Z"
                  fill="white"
                />
              </svg>
            </a>
          </span>
        </footer>
      </div>
    </>
  );
}
