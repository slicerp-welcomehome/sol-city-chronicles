import { useState, useRef, useEffect } from 'react';
import { Radio, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const radioStations = [
  { name: "Sol Jazz FM", url: "http://go-stream-live.com:8368", genre: "Jazz & Blues" },
  { name: "Classic Rock 101", url: "http://144.217.129.213:8040/stream", genre: "Classic Rock" },
  { name: "Chill Lounge", url: "http://198.58.98.83:8258/stream", genre: "Ambient" }
];

export const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [currentStation, setCurrentStation] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  useEffect(() => {
    // Clean up audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayer = async () => {
    setError(null);
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
      
      audioRef.current.addEventListener('loadstart', () => setIsLoading(true));
      audioRef.current.addEventListener('canplay', () => setIsLoading(false));
      audioRef.current.addEventListener('error', () => {
        setError('Failed to load stream');
        setIsLoading(false);
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        audioRef.current.src = radioStations[currentStation].url;
        audioRef.current.volume = volume[0] / 100;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        setError('Stream unavailable');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeStation = async (stationIndex: number) => {
    const wasPlaying = isPlaying;
    
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    setCurrentStation(stationIndex);
    
    if (wasPlaying) {
      // Small delay to ensure the station change is registered
      setTimeout(() => togglePlayer(), 100);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={cn(
        "bg-card border-2 border-primary rounded-lg shadow-lg transition-all duration-300",
        isExpanded ? "w-80 p-4" : "w-auto p-2"
      )}>
        {isExpanded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-newspaper font-bold text-primary">Sol Public Radio</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleExpanded}
                className="h-6 w-6 p-0"
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-3">
              {/* Station Selection */}
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-2">Station</div>
                <div className="grid grid-cols-1 gap-1">
                  {radioStations.map((station, index) => (
                    <Button
                      key={index}
                      variant={index === currentStation ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeStation(index)}
                      className="justify-start text-xs h-8"
                    >
                      <Radio className="w-3 h-3 mr-2" />
                      {station.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Current Station Info */}
              <div className="text-center">
                <div className="text-sm font-medium">
                  {radioStations[currentStation].name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {radioStations[currentStation].genre}
                </div>
                {error && (
                  <div className="text-xs text-destructive mt-1">
                    {error}
                  </div>
                )}
              </div>
              
              {/* Play/Stop Controls */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant={isPlaying ? "destructive" : "default"}
                  size="sm"
                  onClick={togglePlayer}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Loading..." : isPlaying ? "Stop" : "Play"}
                </Button>
              </div>

              {/* Volume Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Volume</span>
                  <span className="text-xs text-muted-foreground">{volume[0]}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <VolumeX className="w-3 h-3 text-muted-foreground" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Volume2 className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-center border-t pt-2">
                "The voice of Sol City since 1987"
              </div>
            </div>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleExpanded}
            className="border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Radio className="w-4 h-4 mr-2" />
            Sol Radio
          </Button>
        )}
      </div>
    </div>
  );
};