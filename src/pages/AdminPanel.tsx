import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Calendar, FileText, Plus, Trash2 } from 'lucide-react';

interface NewsPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  created_at: string;
  author_id: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  created_at: string;
  author_id: string;
}

export const AdminPanel = () => {
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [newsForm, setNewsForm] = useState({ title: '', content: '', excerpt: '' });
  const [eventForm, setEventForm] = useState({ title: '', description: '', location: '', event_date: '' });

  useEffect(() => {
    if (isAdmin) {
      fetchNewsPosts();
      fetchEvents();
    }
  }, [isAdmin]);

  const fetchNewsPosts = async () => {
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch news posts",
        variant: "destructive",
      });
    } else {
      setNewsPosts(data || []);
    }
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
  };

  const createNewsPost = async () => {
    if (!user || !newsForm.title || !newsForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('news_posts')
      .insert([{
        title: newsForm.title,
        content: newsForm.content,
        excerpt: newsForm.excerpt,
        author_id: user.id,
        published: true
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create news post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "News post created successfully",
      });
      setNewsForm({ title: '', content: '', excerpt: '' });
      fetchNewsPosts();
    }
  };

  const createEvent = async () => {
    if (!user || !eventForm.title || !eventForm.event_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('events')
      .insert([{
        title: eventForm.title,
        description: eventForm.description,
        location: eventForm.location,
        event_date: eventForm.event_date,
        author_id: user.id
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      setEventForm({ title: '', description: '', location: '', event_date: '' });
      fetchEvents();
    }
  };

  const deleteNewsPost = async (id: string) => {
    const { error } = await supabase
      .from('news_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete news post",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "News post deleted successfully",
      });
      fetchNewsPosts();
    }
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      fetchEvents();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
        <p className="text-muted-foreground">Please sign in with Discord to access the admin panel.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground">You need admin privileges to access this panel.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Badge variant="secondary">Admin Access</Badge>
      </div>

      <Tabs defaultValue="news" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="news" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>News Posts</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create News Post</span>
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="news-title">Title *</Label>
                <Input
                  id="news-title"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Enter news post title"
                />
              </div>
              <div>
                <Label htmlFor="news-excerpt">Excerpt</Label>
                <Input
                  id="news-excerpt"
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  placeholder="Brief description"
                />
              </div>
              <div>
                <Label htmlFor="news-content">Content *</Label>
                <Textarea
                  id="news-content"
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="Enter news post content"
                  rows={6}
                />
              </div>
              <Button onClick={createNewsPost}>Create News Post</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Existing News Posts</h2>
            <div className="space-y-4">
              {newsPosts.map((post) => (
                <div key={post.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{post.title}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteNewsPost(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {post.excerpt && <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>}
                  <p className="text-sm">{post.content.substring(0, 200)}...</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="event-title">Title *</Label>
                <Input
                  id="event-title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <Label htmlFor="event-date">Date & Time *</Label>
                <Input
                  id="event-date"
                  type="datetime-local"
                  value={eventForm.event_date}
                  onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Enter event location"
                />
              </div>
              <div>
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Enter event description"
                  rows={4}
                />
              </div>
              <Button onClick={createEvent}>Create Event</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Existing Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Date:</strong> {new Date(event.event_date).toLocaleString()}</p>
                    {event.location && <p><strong>Location:</strong> {event.location}</p>}
                    {event.description && <p><strong>Description:</strong> {event.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-muted-foreground">User management features will be added here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;