import React, {useState} from 'react';

export function useVisualMode(initial) { //our custom hooks
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //store the mode state history as an array so we can transition back

  const transition = function(currentMode, replace){
    if(replace){
      history.pop();
    }
    history.push(currentMode);
    return setMode(currentMode);
  }
  const back = function(){
    if (history.length > 1) { //ensure that when mode is at the initial value, it can't transition back further
      history.pop();
      return setMode(history[history.length - 1]);
    }
    return setMode(initial);
  }
  return {mode, transition, back};
};
// This lets our tests (and components) access the current value of the mode from the hook.

