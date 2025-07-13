import { useState, useEffect } from 'react';
import { WeatherWidget } from './WeatherWidget';

export const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="bg-card border-b-2 border-primary">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Town Seal & Title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xl">SC</span>
            </div>
            <div>
              <h1 className="font-newspaper text-3xl font-bold text-primary">
                Sol City Portal
              </h1>
              <p className="text-muted-foreground italic font-serif">
                "Where Every Life Has a Story"
              </p>
            </div>
          </div>

          {/* Date, Time & Weather */}
          <div className="text-right space-y-2">
            <div className="text-sm text-muted-foreground">
              <div>{formatDate(currentDateTime)}</div>
              <div className="font-mono">{formatTime(currentDateTime)}</div>
            </div>
            <WeatherWidget />
          </div>
        </div>
      </div>
    </header>
  );
};