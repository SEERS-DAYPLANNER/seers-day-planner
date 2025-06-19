import React, { useState } from "react";

const App = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const checkAccess = () => {
    if (inputCode === "SEERS2024") {
      setAccessGranted(true);
    } else {
      alert("Invalid access code");
    }
  };

  if (!accessGranted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 text-center p-4">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4">Seers' Day Planner</h1>
        <p className="mb-4">Enter your access code to begin</p>
        <input
          className="p-2 border rounded mb-2"
          type="text"
          placeholder="Access Code"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={checkAccess}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Seers' Day Planner</h1>
      <p>This is your spiritual + emotional planning interface. Your full version is now unlocked.</p>
      {/* Planner components would go here */}
    </div>
  );
};

export default App;