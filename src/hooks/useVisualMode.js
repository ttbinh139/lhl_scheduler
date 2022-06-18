import { useState }  from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => {
      //console.log(prev);
      //console.log(prev instanceof Array);
      //prev.push(newMode);
      //return history.append(newMode);
      if (replace === true) {
        prev.pop();
      }
      return [...prev, newMode];
    });
  }

  const back = function() {
    if (history.length === 1) {
      //return null;
      return;
    }
    //let length = prev.length;
    history.pop();
    setMode(history[history.length - 1]);
  }
  return { mode, transition, back };
};