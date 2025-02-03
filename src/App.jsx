import React, { useState, useEffect } from "react";

const colors = ["blue", "green", "yellow", "purple", "orange", "teal"];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Guess the correct color!");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setMessage("Guess the correct color!");
    setIsRevealed(false);
  };

  const resetGame = () => {
    setScore(0);
    startNewGame();
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(prevScore => prevScore + 1);
      setMessage("Awesome! You nailed it! 🎉 Keep it up!");
    } else {
      setMessage("Not quite! Don't give up, you're getting closer! 🔥");
    }
    setIsRevealed(true);
    setTimeout(() => {
      setIsRevealed(false);
      startNewGame();
    }, 1000);
  };

  return (
    <div style={{
      textAlign: "center", 
      padding: "20px", 
      backgroundColor: "#ecf0f1", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between", 
      alignItems: "center"
    }}>
      <header style={{
        width: "100%",
        padding: "20px 0",
        backgroundColor: "#2980b9",
        color: "white",
        fontSize: "2.5rem",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Color Guessing Game
      </header>
      <p data-testid="gameInstructions" style={{ fontSize: "1.5rem" }}>{message}</p>
      <div style={{ width: "200px", height: "200px", margin: "20px auto", border: "4px solid #ecf0f1", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: isRevealed ? targetColor : "transparent" }} data-testid="colorBox"></div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginTop: "20px", width: "80%" }}>
        {colors.map((color) => (
          <button
            key={color}
            data-testid="colorOption"
            onClick={() => handleGuess(color)}
            style={{
              backgroundColor: color,
              padding: "20px 40px",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "2rem",
              color: "white",
              fontWeight: "bold",
              flex: "1 1 30%",
              minWidth: "120px"
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>
      <h2 data-testid="score" style={{ fontSize: "2rem", marginTop: "20px" }}>Score: {score}</h2>
      <button
        data-testid="newGameButton"
        onClick={resetGame}
        style={{ padding: "10px 20px", fontSize: "1rem", cursor: "pointer", borderRadius: "10px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default ColorGame;
