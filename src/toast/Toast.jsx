import React from "react";
import "./toast.css";

export const Toast = ({ toastMessage, showToast, isCorrect }) => {
  return (
    <p
      data-testid="gameStatus"
      className={`toast ${showToast ? "slide-in" : "slide-out"} ${
        isCorrect ? "correct-toast" : "wrong-toast"
      }`}
    >
      {toastMessage}
    </p>
  );
};
