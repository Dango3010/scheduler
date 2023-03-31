import {useState} from "react";

export function useVisualMode(initial) { //our custom hooks, is used in Appointment component to control mode state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //store the mode state history as an array so we can transition back

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
// This lets our tests (and components) access the current value of the mode from the hook.

