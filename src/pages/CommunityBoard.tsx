import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PinIcon, Search, Plus, MessageSquare, Heart, Clock } from 'lucide-react';

interface BoardPost {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  date: string;
  replies: number;
  likes: number;
  pinned?: boolean;
  tags: string[];
}

const boardPosts: BoardPost[] = [
  {
    id: '1',
    title: 'New Community Garden Planning Meeting',
    category: 'Events',
    content: 'The Sol City Community Association is planning a new community garden behind the library. We need volunteers to help with planning and setup. The first meeting is this Saturday at 2 PM in the library conference room. Bring your ideas for what to plant!',
    author: 'GreenThumb_Sally',
    date: '2 hours ago',
    replies: 12,
    likes: 8,
    pinned: true,
    tags: ['gardening', 'community', 'volunteers']
  },
  {
    id: '2',
    title: 'Lost Cat - Mittens (Gray Tabby)',
    category: 'Lost & Found',
    content: 'Our indoor cat Mittens got out yesterday evening around 6 PM near Riverside Park. He\'s a gray tabby with white paws and very friendly. Please call if you see him! We miss him so much.',
    author: 'ConcernedOwner',
    date: '4 hours ago',
    replies: 6,
    likes: 15,
    tags: ['lost-pet', 'help-needed']
  },
  {
    id: '3',
    title: 'Weekly Book Club - This Month: Mystery Theme',
    category: 'Activities',
    content: 'Sol City Book Club is reading "The Thursday Murder Club" this month. We meet every Wednesday at 7 PM at The Grind coffee shop. New members welcome! We provide great discussion and even better coffee.',
    author: 'BookLover_Marcus',
    date: '1 day ago',
    replies: 4,
    likes: 9,
    tags: ['books', 'social', 'weekly']
  },
  {
    id: '4',
    title: 'Garage Sale Extravaganza - Maple Street',
    category: 'Sales',
    content: 'Multi-family garage sale this weekend on Maple Street! Furniture, clothes, books, toys, and household items. Some antiques and collectibles too. Saturday 8 AM - 4 PM, Sunday 9 AM - 2 PM.',
    author: 'MapleStreetSales',
    date: '2 days ago',
    replies: 2,
    likes: 5,
    tags: ['garage-sale', 'weekend']
  },
  {
    id: '5',
    title: 'Carpooling to Regional Theater - Romeo & Juliet',
    category: 'Transportation',
    content: 'Looking for people interested in carpooling to the Regional Theater for their production of Romeo & Juliet next Friday evening. I have room for 3 passengers. Show starts at 8 PM.',
    author: 'TheaterFan_Jenny',
    date: '3 days ago',
    replies: 8,
    likes: 3,
    tags: ['carpool', 'theater', 'culture']
  }
];

const categories = ['All', 'Events', 'Lost & Found', 'Activities', 'Sales', 'Transportation', 'Services', 'General'];

export const CommunityBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const filteredPosts = boardPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center border-b-2 border-primary pb-6">
        <h1 className="font-newspaper text-4xl font-bold text-primary mb-2">
          Community Board
        </h1>
        <p className="text-muted-foreground">
          Connect with your neighbors, share news, and stay updated on local happenings
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <Card className="p-6 border-2 border-primary/30">
          <h3 className="font-semibold text-primary mb-4">Create New Post</h3>
          <div className="space-y-4">
            <Input placeholder="Post title..." />
            <select className="w-full p-2 border border-border rounded-md bg-background">
              <option>Select category...</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <Textarea placeholder="Write your post content..." rows={4} />
            <Input placeholder="Tags (comma-separated)..." />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                Cancel
              </Button>
              <Button>
                Post to Board
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Community Guidelines */}
      <Card className="p-4 bg-muted/50 border border-primary/20">
        <h3 className="font-semibold text-primary mb-2">Community Guidelines</h3>
        <p className="text-sm text-muted-foreground">
          Please keep posts respectful and relevant to Sol City. No spam, harassment, or inappropriate content. 
          Help us maintain a friendly community for everyone!
        </p>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <CommunityPostCard key={post.id} post={post} />
        ))}
        
        {filteredPosts.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No posts found matching your search criteria.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

interface CommunityPostCardProps {
  post: BoardPost;
}

const CommunityPostCard = ({ post }: CommunityPostCardProps) => {
  return (
    <Card className={`p-6 ${post.pinned ? 'border-accent bg-accent/5' : ''} hover:shadow-md transition-shadow`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {post.pinned && <PinIcon className="w-4 h-4 text-accent" />}
            <Badge variant="outline">{post.category}</Badge>
            <span className="text-xs text-muted-foreground">by {post.author}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-primary text-lg">
          {post.title}
        </h3>

        {/* Content */}
        <p className="text-muted-foreground">
          {post.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{post.replies} replies</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes} likes</span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View Thread
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CommunityBoard;