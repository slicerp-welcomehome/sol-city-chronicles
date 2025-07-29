import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Zap } from 'lucide-react';

type WeatherType = 'clear' | 'cloudy' | 'rainy' | 'stormy' | 'foggy' | 'snowy';

interface Weather {
  type: WeatherType;
  temperature: number;
  description: string;
  icon: React.ReactNode;
}

const weatherOptions: Weather[] = [
  { type: 'clear', temperature: 72, description: 'Clear Skies', icon: <Sun className="w-4 h-4" /> },
  { type: 'cloudy', temperature: 68, description: 'Partly Cloudy', icon: <Cloud className="w-4 h-4" /> },
  { type: 'rainy', temperature: 61, description: 'Light Rain', icon: <CloudRain className="w-4 h-4" /> },
  { type: 'stormy', temperature: 59, description: 'Thunderstorm', icon: <Zap className="w-4 h-4" /> },
  { type: 'foggy', temperature: 64, description: 'Foggy', icon: <Wind className="w-4 h-4" /> },
  { type: 'snowy', temperature: 34, description: 'Light Snow', icon: <CloudSnow className="w-4 h-4" /> },
];

export const WeatherWidget = () => {
  const [currentWeather, setCurrentWeather] = useState<Weather>(weatherOptions[0]);

  useEffect(() => {
    // Simulate changing weather every 30 seconds
    const interval = setInterval(() => {
      const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setCurrentWeather(randomWeather);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-muted rounded p-3 text-center min-w-[120px]">
      <div className="flex items-center justify-center space-x-2 mb-1">
        {currentWeather.icon}
        <span className="font-bold text-lg">{currentWeather.temperature}°F</span>
      </div>
      <div className="text-xs text-muted-foreground">
        Today's Weather
      </div>
      <div className="text-xs font-medium">
        {currentWeather.description}
      </div>
    </div>
  );
};