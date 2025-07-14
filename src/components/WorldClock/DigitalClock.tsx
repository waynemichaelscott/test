import React from 'react';
import { CityTime } from './WorldClock';

interface DigitalClockProps {
  cityTime: CityTime;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ cityTime }) => {
  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: cityTime.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="digital-clock">
      <h3>{cityTime.city}</h3>
      <div className="digital-time" aria-label={`Time in ${cityTime.city}`}>
        {formatTime(cityTime.time)}
      </div>
      <div className="timezone">{cityTime.timezone}</div>
    </div>
  );
};

export default DigitalClock;