import { useState } from 'react';

export const Footer = () => {
  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretClick = () => {
    setSecretClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 7) {
        localStorage.setItem('sol_whisper_unlocked', 'true');
        window.location.href = '/whisper-wire';
      }
      return newCount;
    });
  };

  return (
    <footer className="bg-muted border-t-2 border-primary mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Credits */}
          <div>
            <h3 className="font-newspaper font-bold text-primary mb-3">Sol City Portal</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Est. 1987 • Population: 15,847
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 Sol City Township. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/services" className="text-muted-foreground hover:text-primary">Town Services</a></li>
              <li><a href="/board" className="text-muted-foreground hover:text-primary">Community Board</a></li>
              <li><a href="/directory" className="text-muted-foreground hover:text-primary">Business Directory</a></li>
              <li><a href="/join" className="text-muted-foreground hover:text-primary">New Residents</a></li>
            </ul>
          </div>

          {/* Hidden Elements */}
          <div>
            <h4 className="font-semibold text-primary mb-3">Contact Info</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>City Hall: (555) SOL-CITY</p>
              <p>Emergency: 911</p>
              <p>
                <span 
                  onClick={handleSecretClick}
                  className="cursor-pointer"
                  title={secretClicks > 0 ? `${secretClicks}/7 clicks` : ''}
                >
                  Mayor's Office: (555) 555-MAYOR
                </span>
              </p>
            </div>
            <div className="mt-4 text-xs text-muted-foreground/60">
              "In Sol City, every story matters."
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};