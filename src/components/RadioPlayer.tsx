import { useState } from 'react';
import { Radio, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlayer = () => {
    setIsPlaying(!isPlaying);
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
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Now Playing: {isPlaying ? "Jazz & Blues Hour" : "Static"}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={isPlaying ? "destructive" : "default"}
                  size="sm"
                  onClick={togglePlayer}
                  className="flex-1"
                >
                  {isPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  {isPlaying ? "Stop" : "Play"}
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
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