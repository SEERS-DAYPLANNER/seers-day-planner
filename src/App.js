import React, { useState } from "react";

const emotionalCycles = [
  { time: "12:00 AM – 3:24 AM", phase: "ANALYZE" },
  { time: "3:25 AM – 6:50 AM", phase: "RELAX" },
  { time: "6:51 AM – 10:16 AM", phase: "CREATE" },
  { time: "10:17 AM – 1:41 PM", phase: "PRODUCE" },
  { time: "1:42 PM – 5:07 PM", phase: "MONEY" },
  { time: "5:08 PM – 8:33 PM", phase: "PATIENCE" },
  { time: "8:34 PM – 11:59 PM", phase: "RELAX" },
];

const App = () => {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const today = new Date().toLocaleDateString();

  const unlock = () => {
    if (code === "SEERS2024") {
      setUnlocked(true);
    } else {
      alert("Invalid access code.");
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 text-center p-4">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Seers' Day Planner</h1>
        <p className="mb-4">Enter your access code to begin</p>
        <input
          className="p-2 border rounded mb-2"
          placeholder="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={unlock}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to Seers' Day Planner</h1>
      <p className="text-center text-sm mb-6">Today's Date: {today}</p>
      <h2 className="text-xl font-semibold mb-2">Emotional Cycle Schedule</h2>
      <ul className="mb-6">
        {emotionalCycles.map((cycle, i) => (
          <li key={i} className="mb-1">
            <strong>{cycle.time}</strong>: {cycle.phase}
          </li>
        ))}
      </ul>
      <p className="italic text-sm text-center mt-12">“Know First. Then Plan.”</p>
    </div>
  );
};

export default App;