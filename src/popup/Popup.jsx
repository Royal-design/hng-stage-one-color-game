import React from "react";
import "./popup.css";
export const Popup = ({ setShowInfoPopup, showInfoPopup }) => {
  return (
    <div className={`popup-overlay ${showInfoPopup ? "fade-in" : "fade-out"}`}>
      <div className="popup-content">
        <h2>Game Instructions</h2>
        <p>Try to guess the correct color that matches the target color box.</p>
        <ul>
          <li>Click one of the color options below the target box.</li>
          <li>If you guess correctly, your score increases.</li>
          <li>
            You can always start a new game by clicking the "New Game" button.
          </li>
        </ul>
        <button className="close-btn" onClick={() => setShowInfoPopup(false)}>
          Close
        </button>
      </div>
    </div>
  );
};
