import React from 'react';
import { CityTime } from './WorldClock';

interface AnalogClockProps {
  cityTime: CityTime;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ cityTime }) => {
  const getTimeInTimezone = (): { hours: number; minutes: number; seconds: number } => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: cityTime.timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(new Date());
    
    const timeParts = parts.reduce((acc, part) => {
      if (part.type === 'hour') acc.hours = parseInt(part.value);
      if (part.type === 'minute') acc.minutes = parseInt(part.value);
      if (part.type === 'second') acc.seconds = parseInt(part.value);
      return acc;
    }, { hours: 0, minutes: 0, seconds: 0 });

    return timeParts;
  };

  const { hours, minutes, seconds } = getTimeInTimezone();

  // Calculate angles for clock hands
  const secondAngle = (seconds * 6) - 90; // 6 degrees per second
  const minuteAngle = (minutes * 6 + seconds * 0.1) - 90; // 6 degrees per minute + smooth movement
  const hourAngle = ((hours % 12) * 30 + minutes * 0.5) - 90; // 30 degrees per hour + smooth movement

  return (
    <div className="analog-clock">
      <h3>{cityTime.city}</h3>
      <svg 
        width="150" 
        height="150" 
        viewBox="0 0 150 150"
        aria-label={`Analog clock for ${cityTime.city}`}
      >
        {/* Clock face */}
        <circle cx="75" cy="75" r="70" fill="white" stroke="black" strokeWidth="2" />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = 75 + 60 * Math.cos(angle);
          const y1 = 75 + 60 * Math.sin(angle);
          const x2 = 75 + 65 * Math.cos(angle);
          const y2 = 75 + 65 * Math.sin(angle);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="75"
          y1="75"
          x2="75"
          y2="35"
          stroke="black"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 75 75)`}
        />

        {/* Minute hand */}
        <line
          x1="75"
          y1="75"
          x2="75"
          y2="20"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 75 75)`}
        />

        {/* Second hand */}
        <line
          x1="75"
          y1="75"
          x2="75"
          y2="15"
          stroke="red"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 75 75)`}
        />

        {/* Center dot */}
        <circle cx="75" cy="75" r="5" fill="black" />
      </svg>
      <div className="timezone">{cityTime.timezone}</div>
    </div>
  );
};

export default AnalogClock;