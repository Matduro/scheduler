import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
    }
    setHistory((prev) => [...prev, newMode]);
    // setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      //setMode(newHistory[newHistory.length - 1]);
    }
  }

  return { mode: history[history.length - 1], transition, back };
}

//
////
//////
////////
// The below options work, but are not recommended as they use .pop() which mutates arrays, and we don't want that.
///////////////////////

// function transition(newMode, replace = false) {
//   if (replace) {
//     history.pop();
//   }
//   setHistory((prev) => [...prev, newMode]);
//   setMode(newMode);
// }
// function back() {
//   if (history.length > 1) {
//     history.pop();
//     setHistory(history);
//     setMode(history[history.length - 1]);
//   }
// }
