import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Briefcase } from 'lucide-react';

interface Character {
  name: string;
  age: number;
  occupation: string;
  location: string;
  personality: string;
  recentActivity: string;
  playerName: string;
}

const featuredCharacter: Character = {
  name: 'Morticia Johnson',
  age: 34,
  occupation: 'Local Menace',
  location: 'In a dumpster near Rocket Wrench',
  personality: 'Sassy, crazy, funny and mysterious all in one. She\'ll have you questioning quite a bit.',
  recentActivity: 'Recently discovered old city records in the library basement that hint at Sol City\'s forgotten supernatural history.',
  playerName: 'Mom'
};

export const CharacterSpotlight = () => {
  return (
    <Card className="p-4 bg-gradient-to-br from-card to-accent/10">
      <div className="flex items-center space-x-2 mb-4">
        <Star className="w-5 h-5 text-accent" />
        <h2 className="font-semibold text-primary">Citizen Spotlight</h2>
      </div>

      <div className="space-y-3">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="font-newspaper font-bold text-lg text-primary">
            {featuredCharacter.name}
          </h3>
          <p className="text-sm text-muted-foreground">Age {featuredCharacter.age}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{featuredCharacter.occupation}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{featuredCharacter.location}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-primary text-sm">Personality</h4>
          <p className="text-xs text-muted-foreground">
            {featuredCharacter.personality}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-primary text-sm">Recent Activity</h4>
          <p className="text-xs text-muted-foreground">
            {featuredCharacter.recentActivity}
          </p>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Played by {featuredCharacter.playerName}
            </span>
            <Badge variant="outline" className="text-xs">
              Active
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};