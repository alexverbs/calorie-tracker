import React, { useState } from "react";
import "./App.css"; // Ensure correct path to your CSS file

function App() {
  const [input, setInput] = useState("");
  const [calories, setCalories] = useState(null);
  const [error, setError] = useState("");

  const getCalories = async () => {
    try {
      const response = await fetch("/api/getCalories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      if (response.ok) {
        setCalories(data.calories);
        setError("");
      } else {
        setError(data.error || "Failed to fetch calories.");
        setCalories(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setCalories(null);
    }
  };

  // Calculate fill percentage for the bar (max calories assumed as 2000)
  const maxCalories = 2000;
  let fillPercentage = 0;

  if (calories !== null) {
    fillPercentage = (calories / maxCalories) * 100;
    if (fillPercentage > 100) {
      fillPercentage = 100;
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Calorie Tracker</h1>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter food item"
        className="inputField"
      />
      <button onClick={getCalories}>Input Calories</button>

      <div className="foodBarContainer">
        <div
          className={fillPercentage === 100 ? "foodBar red" : "foodBar"}
          style={{ width: `${fillPercentage}%` }}
        />
      </div>

      {calories !== null && (
        <div>
          <p>Calories: {calories}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
