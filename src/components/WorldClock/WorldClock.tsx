import React, { useState, useEffect } from 'react';
import './WorldClock.css';
import DigitalClock from './DigitalClock';
import AnalogClock from './AnalogClock';

export interface CityTime {
  city: string;
  timezone: string;
  time: Date;
}

const WorldClock: React.FC = () => {
  const [isDigital, setIsDigital] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const cities: { city: string; timezone: string }[] = [
    { city: 'London', timezone: 'Europe/London' },
    { city: 'New York', timezone: 'America/New_York' },
    { city: 'Paris', timezone: 'Europe/Paris' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCityTimes = (): CityTime[] => {
    return cities.map(({ city, timezone }) => {
      const time = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone }));
      return { city, timezone, time };
    });
  };

  const toggleClockType = () => {
    setIsDigital(!isDigital);
  };

  const cityTimes = getCityTimes();

  return (
    <div className="world-clock-container">
      <h2>World Clock</h2>
      <button 
        className="toggle-button" 
        onClick={toggleClockType}
        aria-label={`Switch to ${isDigital ? 'analog' : 'digital'} clock`}
      >
        {isDigital ? '🕐 Analog' : '🔢 Digital'}
      </button>
      <div className="clocks-grid">
        {cityTimes.map((cityTime) => (
          <div key={cityTime.city} className="clock-item">
            {isDigital ? (
              <DigitalClock cityTime={cityTime} />
            ) : (
              <AnalogClock cityTime={cityTime} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;