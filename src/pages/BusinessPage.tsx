import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, MapPin, Phone, Clock, Star, Edit3, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Business {
  id: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  hours: string | null;
  owner_name: string | null;
  owner_id: string;
  featured: boolean;
  services: string[] | null;
  menu: any;
  created_at: string;
  updated_at: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  reviewer_name: string | null;
  created_at: string;
  user_id: string;
}

export const BusinessPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Business>>({});
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isOwner = business && user && business.owner_id === user.id;
  const canEdit = isOwner;

  useEffect(() => {
    if (id) {
      fetchBusiness();
      fetchReviews();
    }
  }, [id]);

  const fetchBusiness = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setBusiness(data);
      setEditForm(data);
    } catch (error) {
      console.error('Error fetching business:', error);
      toast({
        title: "Error",
        description: "Failed to load business details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('business_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSave = async () => {
    if (!business || !canEdit) return;

    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          name: editForm.name,
          description: editForm.description,
          address: editForm.address,
          phone: editForm.phone,
          hours: editForm.hours,
          services: editForm.services,
          menu: editForm.menu
        })
        .eq('id', business.id);

      if (error) throw error;

      setBusiness({ ...business, ...editForm });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Business details updated successfully"
      });
    } catch (error) {
      console.error('Error updating business:', error);
      toast({
        title: "Error",
        description: "Failed to update business details",
        variant: "destructive"
      });
    }
  };

  const handleReviewSubmit = async () => {
    if (!isAuthenticated || !id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to leave a review",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user?.id)
        .single();

      const { error } = await supabase
        .from('reviews')
        .insert({
          business_id: id,
          user_id: user?.id,
          rating: newReview.rating,
          comment: newReview.comment || null,
          reviewer_name: profile?.display_name || 'Anonymous'
        });

      if (error) throw error;

      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      fetchReviews();
      toast({
        title: "Success",
        description: "Review submitted successfully"
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">Loading business details...</div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Business Not Found</h1>
        <Link to="/directory">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/directory">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
          </Button>
        </Link>
        
        {canEdit && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setIsEditing(false);
                  setEditForm(business);
                }}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Business
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Business Details */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {isEditing ? (
                <Input
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="text-2xl font-bold"
                />
              ) : (
                <h1 className="font-newspaper text-3xl font-bold text-primary">
                  {business.name}
                </h1>
              )}
              <Badge variant="outline">{business.category}</Badge>
            </div>
            
            {business.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            {isEditing ? (
              <Textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Business description..."
                rows={3}
              />
            ) : (
              <p className="text-muted-foreground">
                {business.description || 'No description available.'}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold">Contact Information</h3>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                {isEditing ? (
                  <Input
                    value={editForm.address || ''}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    placeholder="Business address"
                  />
                ) : (
                  <span>{business.address || 'Address not provided'}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                {isEditing ? (
                  <Input
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Phone number"
                  />
                ) : (
                  <span>{business.phone || 'Phone not provided'}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                {isEditing ? (
                  <Input
                    value={editForm.hours || ''}
                    onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })}
                    placeholder="Business hours"
                  />
                ) : (
                  <span>{business.hours || 'Hours not provided'}</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Business Details</h3>
              <div className="text-sm text-muted-foreground">
                <p>Owner: {business.owner_name || 'Not specified'}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-accent fill-current" />
                  <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          {business.services && business.services.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Services</h3>
              <div className="flex flex-wrap gap-2">
                {business.services.map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Menu */}
          {business.menu && business.menu.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Menu</h3>
              <div className="space-y-2">
                {business.menu.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span className="font-semibold">${item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Reviews Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>
            {isAuthenticated && !isOwner && (
              <Button 
                size="sm" 
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Write Review
              </Button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <Card className="p-4 bg-muted/50">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span>Rating:</span>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="px-2 py-1 border rounded"
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <Textarea
                  placeholder="Write your review..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleReviewSubmit}>
                    Submit Review
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No reviews yet. Be the first to leave a review!
              </p>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.reviewer_name || 'Anonymous'}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-accent fill-current" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-muted-foreground">{review.comment}</p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessPage;