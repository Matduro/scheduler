import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
    }
    setHistory((prev) => [...prev, newMode]);
  }

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
    }
  }

  return { mode: history[history.length - 1], transition, back };
}
