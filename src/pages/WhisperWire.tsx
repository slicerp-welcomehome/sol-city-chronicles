import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertTriangle, Moon, Zap } from 'lucide-react';

export const WhisperWire = () => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem('sol_whisper_unlocked');
    if (unlocked === 'true') {
      setHasAccess(true);
    } else {
      // Redirect to home if not unlocked
      window.location.href = '/';
    }
  }, []);

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Access Restricted</h1>
          <p className="text-muted-foreground">You need special clearance to access this area.</p>
        </div>
      </div>
    );
  }

  const whisperPosts = [
    {
      id: 1,
      title: 'Strange Readings at the Old Observatory',
      category: 'Supernatural',
      content: 'The equipment left behind by Dr. Holloway is picking up some very unusual electromagnetic signatures. These aren\'t coming from any known natural phenomena...',
      author: 'Observatory Keeper',
      date: '2 days ago',
      classification: 'Confidential'
    },
    {
      id: 2,
      title: 'Missing Persons Pattern Analysis',
      category: 'Investigation',
      content: 'Seven people have vanished near Whispering Woods in the past three months. All disappearances occurred during the new moon. Local authorities aren\'t connecting the dots.',
      author: 'Anonymous Detective',
      date: '4 days ago',
      classification: 'Restricted'
    },
    {
      id: 3,
      title: 'The Sol City Underground Network',
      category: 'Conspiracy',
      content: 'There\'s more to this town than meets the eye. The founding families didn\'t just build Sol City - they built it on something much older. The tunnel system isn\'t for utilities.',
      author: 'Historical Archivist',
      date: '1 week ago',
      classification: 'Eyes Only'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Warning Header */}
      <Card className="p-6 bg-gradient-to-r from-destructive/10 to-accent/10 border-2 border-destructive/30">
        <div className="flex items-center space-x-3 mb-4">
          <Eye className="w-8 h-8 text-destructive" />
          <div>
            <h1 className="font-newspaper text-3xl font-bold text-destructive">Whisper Wire</h1>
            <p className="text-muted-foreground italic">Classified Information Network</p>
          </div>
        </div>
        
        <div className="bg-destructive/20 rounded p-3 border border-destructive/30">
          <p className="text-sm text-destructive font-medium">
            ⚠️ CLASSIFIED ACCESS GRANTED ⚠️
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This information is restricted to authorized personnel only. 
            Unauthorized access or distribution is strictly prohibited.
          </p>
        </div>
      </Card>

      {/* Introduction */}
      <Card className="p-6 bg-card/80 backdrop-blur">
        <h2 className="font-newspaper text-xl font-bold text-primary mb-3">
          Welcome to the Whisper Wire
        </h2>
        <p className="text-muted-foreground mb-4">
          You've accessed Sol City's classified information network. Here, those who know the truth 
          share what they've discovered about the strange undercurrents flowing beneath our 
          seemingly peaceful town.
        </p>
        <p className="text-sm text-muted-foreground italic">
          "Some secrets are too dangerous for the Sol Times..."
        </p>
      </Card>

      {/* Classified Posts */}
      <div className="space-y-4">
        <h2 className="font-semibold text-primary flex items-center space-x-2">
          <Moon className="w-5 h-5" />
          <span>Recent Intelligence</span>
        </h2>

        {whisperPosts.map(post => (
          <Card key={post.id} className="p-4 border-l-4 border-accent hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Badge variant="destructive" className="text-xs">
                  {post.classification}
                </Badge>
                <Badge variant="outline">{post.category}</Badge>
              </div>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>

            <h3 className="font-semibold text-primary mb-2 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>{post.title}</span>
            </h3>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Source: {post.author}</span>
              <span className="font-mono">CLASSIFIED</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Warning */}
      <Card className="p-4 bg-muted/50 border border-muted">
        <p className="text-xs text-muted-foreground text-center">
          Remember: What happens in the shadows of Sol City, stays in the shadows. 
          Some knowledge comes with a price.
        </p>
      </Card>
    </div>
  );
};

export default WhisperWire;