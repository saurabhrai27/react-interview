import { useState, useEffect } from 'react';
import './style/TrafficLights.css';

const TrafficLights = () => {
  const [activeColor, setActiveColor] = useState('red');

  useEffect(() => {
    const colors = ['red', 'yellow', 'green'];
    let currentIndex = colors.indexOf(activeColor);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % colors.length;
      setActiveColor(colors[currentIndex]);
    }, 2000); // Change color every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, [activeColor]);

  return (
    <div className="traffic-light">
      <div className={`light red ${activeColor === 'red' ? 'active' : ''}`}></div>
      <div className={`light yellow ${activeColor === 'yellow' ? 'active' : ''}`}></div>
      <div className={`light green ${activeColor === 'green' ? 'active' : ''}`}></div>
    </div>
  );
};

export default TrafficLights;
