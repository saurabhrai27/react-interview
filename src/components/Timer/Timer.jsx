import { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const initialTime = 5000; // Initial time in milliseconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null); // Use useRef to keep track of the timer

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0; // Ensure the timer never goes below 0
          }
          return prevTime - 1000;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current); // Clear the timer if it's not running
    }

    return () => {
      clearInterval(timerRef.current); // Clear the timer on component unmount
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current); // Clear the timer when resetting
    setTime(initialTime);
    setIsRunning(false);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div>Time: {formatTime(time)}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
