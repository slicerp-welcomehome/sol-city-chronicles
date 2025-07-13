import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Headline {
  title: string;
  category: 'IC' | 'OOC';
  excerpt: string;
  timestamp: string;
}

const headlines: Headline[] = [
  {
    title: "Sol City Library Hosts Annual Book Fair This Weekend",
    category: 'IC',
    excerpt: "Join us for three days of book sales, author readings, and community storytelling events.",
    timestamp: "2 hours ago"
  },
  {
    title: "New RP Guidelines Released - Enhanced Character Development",
    category: 'OOC',
    excerpt: "Updated guidelines now include expanded background requirements and relationship mapping tools.",
    timestamp: "5 hours ago"
  },
  {
    title: "Local Coffee Shop 'The Grind' Celebrates 10th Anniversary",
    category: 'IC',
    excerpt: "Owner Maria Santos reflects on a decade of serving Sol City's finest coffee and community gatherings.",
    timestamp: "8 hours ago"
  },
  {
    title: "Server Maintenance Scheduled for This Weekend",
    category: 'OOC',
    excerpt: "Brief downtime expected Saturday 2-4 AM EST for performance improvements and new features.",
    timestamp: "12 hours ago"
  },
  {
    title: "Mysterious Lights Spotted Over Whispering Woods",
    category: 'IC',
    excerpt: "Several residents report unusual glowing orbs near the old oak grove. Park rangers investigating.",
    timestamp: "1 day ago"
  }
];

export const NewsHeadlineRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentHeadline = headlines[currentIndex];

  return (
    <Card className="p-6 bg-gradient-to-r from-card to-muted/50 border-2 border-primary/20">
      <div className="flex items-start justify-between mb-3">
        <Badge 
          variant={currentHeadline.category === 'IC' ? 'default' : 'secondary'}
          className="mb-2"
        >
          {currentHeadline.category === 'IC' ? 'In Character' : 'Out of Character'}
        </Badge>
        <span className="text-xs text-muted-foreground">{currentHeadline.timestamp}</span>
      </div>
      
      <h2 className="font-newspaper text-2xl font-bold text-primary mb-3">
        {currentHeadline.title}
      </h2>
      
      <p className="text-muted-foreground">
        {currentHeadline.excerpt}
      </p>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {headlines.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};