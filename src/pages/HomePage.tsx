import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Calendar, BookOpen } from 'lucide-react';
import { NewsHeadlineRotator } from '@/components/NewsHeadlineRotator';
import { TownBulletin } from '@/components/TownBulletin';
import { EventsCalendar } from '@/components/EventsCalendar';
import { CharacterSpotlight } from '@/components/CharacterSpotlight';

export const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Newspaper Header */}
      <div className="text-center border-b-2 border-primary pb-6">
        <h1 className="font-newspaper text-4xl font-bold text-primary mb-2">
          The Sol Times
        </h1>
        <p className="text-muted-foreground italic">
          Your Daily Source for Sol City News & Community Updates
        </p>
      </div>

      {/* Headline Rotator */}
      <NewsHeadlineRotator />

      {/* Quick Link Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <QuickLinkTile
          icon={<Users className="w-6 h-6" />}
          title="New Resident Info"
          description="Everything you need to get started in Sol City"
          href="/join"
          color="bg-primary"
        />
        <QuickLinkTile
          icon={<MapPin className="w-6 h-6" />}
          title="Departments"
          description="City services and department directory"
          href="/directory"
          color="bg-accent"
        />
        <QuickLinkTile
          icon={<Users className="w-6 h-6" />}
          title="Community Board"
          description="Connect with neighbors and local groups"
          href="/board"
          color="bg-secondary"
        />
        <QuickLinkTile
          icon={<BookOpen className="w-6 h-6" />}
          title="RP Resources"
          description="Guidelines, templates, and helpful tools"
          href="/resources"
          color="bg-muted"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Town Bulletin */}
        <div className="lg:col-span-2">
          <TownBulletin />
        </div>

        {/* Right Column - Events & Spotlight */}
        <div className="space-y-6">
          <EventsCalendar />
          <CharacterSpotlight />
        </div>
      </div>
    </div>
  );
};

interface QuickLinkTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}

const QuickLinkTile = ({ icon, title, description, href, color }: QuickLinkTileProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
      <a href={href} className="block">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
        <h3 className="font-semibold text-primary mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </a>
    </Card>
  );
};

export default HomePage;