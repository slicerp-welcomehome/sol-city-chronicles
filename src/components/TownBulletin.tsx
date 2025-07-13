import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PinIcon, Clock, MapPin } from 'lucide-react';

interface BulletinPost {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  date: string;
  pinned?: boolean;
  location?: string;
}

const bulletinPosts: BulletinPost[] = [
  {
    id: '1',
    title: 'Found: Golden Retriever near Riverside Park',
    category: 'Lost & Found',
    content: 'Friendly golden retriever found this morning wearing a blue collar. Very well-behaved and seems to be looking for his family. Currently being cared for at Sol City Animal Services.',
    author: 'Sarah Mitchell',
    date: '3 hours ago',
    location: 'Riverside Park',
    pinned: true
  },
  {
    id: '2',
    title: 'Weekly Chess Club Meetings Resume',
    category: 'Activities',
    content: 'The Sol City Chess Club is excited to announce that our weekly meetings will resume this Thursday at 7 PM in the Community Center. All skill levels welcome! Bring your own board if you have one.',
    author: 'Robert Chen',
    date: '6 hours ago',
    location: 'Community Center'
  },
  {
    id: '3',
    title: 'Babysitter Available - References Provided',
    category: 'Services',
    content: 'Experienced babysitter available for weekends and evenings. CPR certified and great with kids ages 3-12. Competitive rates and excellent references from local families.',
    author: 'Jessica Torres',
    date: '1 day ago'
  },
  {
    id: '4',
    title: 'Neighborhood Watch Meeting - Oak Street District',
    category: 'Safety',
    content: 'Mandatory meeting for all Oak Street residents regarding recent security concerns. Officer Martinez from SCPD will be present to discuss safety protocols and answer questions.',
    author: 'Oak Street HOA',
    date: '1 day ago',
    location: 'Oak Street Clubhouse',
    pinned: true
  },
  {
    id: '5',
    title: 'Free Piano Lessons for Beginners',
    category: 'Education',
    content: 'Retired music teacher offering free piano lessons for children and adults. Basic music theory and beginner songs. Sessions held at my home studio on Maple Avenue.',
    author: 'Eleanor Whitmore',
    date: '2 days ago'
  }
];

export const TownBulletin = () => {
  const pinnedPosts = bulletinPosts.filter(post => post.pinned);
  const regularPosts = bulletinPosts.filter(post => !post.pinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <PinIcon className="w-6 h-6 text-primary" />
        <h2 className="font-newspaper text-2xl font-bold text-primary">Community Bulletin Board</h2>
      </div>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-accent flex items-center space-x-2">
            <PinIcon className="w-4 h-4" />
            <span>Pinned Posts</span>
          </h3>
          {pinnedPosts.map(post => (
            <BulletinCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Regular Posts */}
      <div className="space-y-3">
        <h3 className="font-semibold text-primary">Recent Posts</h3>
        {regularPosts.map(post => (
          <BulletinCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

interface BulletinCardProps {
  post: BulletinPost;
}

const BulletinCard = ({ post }: BulletinCardProps) => {
  return (
    <Card className={`p-4 ${post.pinned ? 'border-accent bg-accent/5' : ''} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {post.pinned && <PinIcon className="w-4 h-4 text-accent" />}
          <Badge variant="outline">{post.category}</Badge>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{post.date}</span>
        </div>
      </div>

      <h3 className="font-semibold text-primary mb-2">{post.title}</h3>
      
      <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Posted by {post.author}</span>
        {post.location && (
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{post.location}</span>
          </div>
        )}
      </div>
    </Card>
  );
};