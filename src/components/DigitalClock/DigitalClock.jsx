import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);

    return () => {
      clearInterval(intervalID); // Clear the interval when the component unmounts
    };
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h2>Digital Clock</h2>
      <div className="clock">{formatTime(time)}</div>
    </div>
  );
};

export default DigitalClock;
