import React, { useState, useEffect } from "react";
import { Popup } from "./popup/Popup";
import { Toast } from "./toast/Toast";

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const generateColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const initializeGame = () => {
    const newTargetColor = generateColor();
    const options = Array(6)
      .fill(null)
      .map(() => generateColor());

    const randomIndex = Math.floor(Math.random() * options.length);
    options[randomIndex] = newTargetColor;
    setTargetColor(newTargetColor);
    setColorOptions(options);
  };

  const resetGame = () => {
    setScore(0);
    initializeGame();
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setToastMessage("Correct! 🎉");
      setIsCorrect(true);
      initializeGame();
    } else {
      setToastMessage("Wrong! Try again 😢");
      setIsCorrect(false);
    }

    setShowToast(true);
    const toastTimeout = setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 500);

    return () => clearTimeout(toastTimeout);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <p data-testid="score" className="score">
          Score: {score}
        </p>
        <div className="action">
          <button
            data-testid="newGameButton"
            className="btn-new"
            onClick={resetGame}
          >
            New Game
          </button>
          <button className="info-btn" onClick={() => setShowInfoPopup(true)}>
            Instructions
          </button>
        </div>
      </div>

      {showToast && (
        <Toast
          toastMessage={toastMessage}
          showToast={showToast}
          isCorrect={isCorrect}
        />
      )}

      {showInfoPopup && (
        <Popup
          setShowInfoPopup={setShowInfoPopup}
          showInfoPopup={showInfoPopup}
        />
      )}

      <div
        className="target-color-box"
        data-testid="colorBox"
        style={{ backgroundColor: targetColor }}
      ></div>
      <p className="instruction" data-testid="gameInstructions">
        {!showToast && "Guess the current color"}
      </p>
      <div className="button-box">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            className="button"
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
