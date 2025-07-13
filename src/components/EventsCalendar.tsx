import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'IC' | 'OOC';
  date: string;
  time: string;
  location: string;
  description: string;
  attendees?: number;
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Mayor\'s Monthly Town Hall',
    type: 'IC',
    date: 'Friday, Dec 15',
    time: '7:00 PM',
    location: 'City Hall Auditorium',
    description: 'Monthly community meeting to discuss city matters and upcoming projects.',
    attendees: 12
  },
  {
    id: '2',
    title: 'Holiday Market Setup',
    type: 'IC',
    date: 'Saturday, Dec 16',
    time: '9:00 AM',
    location: 'Central Plaza',
    description: 'Community volunteers needed to help set up the annual holiday market.',
    attendees: 8
  },
  {
    id: '3',
    title: 'Character Development Workshop',
    type: 'OOC',
    date: 'Sunday, Dec 17',
    time: '2:00 PM',
    location: 'Discord #workshops',
    description: 'Learn advanced techniques for character backstory and relationship building.',
    attendees: 15
  },
  {
    id: '4',
    title: 'Sol City Jazz Night',
    type: 'IC',
    date: 'Monday, Dec 18',
    time: '8:00 PM',
    location: 'The Blue Note Café',
    description: 'Weekly jazz performances featuring local musicians and special guests.',
    attendees: 6
  }
];

export const EventsCalendar = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-primary">Upcoming Events</h2>
      </div>

      <div className="space-y-3">
        {upcomingEvents.map(event => (
          <div key={event.id} className="border-l-2 border-primary pl-3 py-2">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm">{event.title}</h3>
              <Badge 
                variant={event.type === 'IC' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {event.type}
              </Badge>
            </div>
            
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>
              
              {event.attendees && (
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{event.attendees} attending</span>
                </div>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};