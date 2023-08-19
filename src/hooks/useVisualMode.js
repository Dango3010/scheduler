import {useState} from "react";

// This lets our tests (and components) access the current value of the mode from the hook.
export function useVisualMode(initial) { 
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      const newHistory = replace ? prev.slice(0, -1) : prev;
      return [...newHistory, newMode]
    })
  }

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }

  return {mode, transition, back};
};


