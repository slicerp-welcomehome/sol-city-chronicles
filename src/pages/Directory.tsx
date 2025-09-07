import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Clock, Star, Building, Coffee, Utensils, ShoppingBag, Wrench } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
  created_at: string;
  updated_at: string;
}

const categories = ['All', 'Food & Drink', 'Retail', 'Hardware & Tools', 'Automotive', 'Services'];

export const Directory = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('featured', { ascending: false })
        .order('name');

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        title: "Error",
        description: "Failed to load businesses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (business.description && business.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredBusinesses = filteredBusinesses.filter(b => b.featured);
  const regularBusinesses = filteredBusinesses.filter(b => !b.featured);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">Loading businesses...</div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Drink': return <Utensils className="w-4 h-4" />;
      case 'Retail': return <ShoppingBag className="w-4 h-4" />;
      case 'Hardware & Tools': return <Wrench className="w-4 h-4" />;
      case 'Automotive': return <Wrench className="w-4 h-4" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center border-b-2 border-primary pb-6">
        <h1 className="font-newspaper text-4xl font-bold text-primary mb-2">
          Business Directory
        </h1>
        <p className="text-muted-foreground">
          Discover local businesses and services in Sol City
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search businesses..."
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
      </div>

      {/* Featured Businesses */}
      {featuredBusinesses.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-primary flex items-center space-x-2">
            <Star className="w-5 h-5 text-accent" />
            <span>Featured Businesses</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredBusinesses.map((business, index) => (
              <BusinessCard key={index} business={business} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Businesses */}
      <div className="space-y-4">
        <h2 className="font-semibold text-primary">All Businesses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {regularBusinesses.map((business, index) => (
            <BusinessCard key={index} business={business} />
          ))}
        </div>
        
        {filteredBusinesses.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No businesses found matching your search criteria.
            </p>
          </Card>
        )}
      </div>

      {/* Add Your Business */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
        <h2 className="font-newspaper text-xl font-bold text-primary mb-4">
          Want to Add Your Business?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground mb-4">
              Sol City welcomes new businesses! Whether you're opening a shop, restaurant, 
              or service business, we'd love to help you get established in our community.
            </p>
            <Button>
              Submit Business Application
            </Button>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-primary">Requirements:</h3>
            <ul className="space-y-1">
              <li>• Valid roleplay character as business owner</li>
              <li>• Realistic business concept for Sol City</li>
              <li>• Commitment to regular operation hours</li>
              <li>• Approved business location</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface BusinessCardProps {
  business: Business;
  featured?: boolean;
}

const BusinessCard = ({ business, featured = false }: BusinessCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Drink': return <Coffee className="w-5 h-5" />;
      case 'Retail': return <ShoppingBag className="w-5 h-5" />;
      case 'Hardware & Tools': return <Wrench className="w-5 h-5" />;
      case 'Automotive': return <Wrench className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  return (
    <Card className={`p-6 hover:shadow-lg transition-shadow ${featured ? 'border-2 border-accent/30 bg-accent/5' : ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${featured ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}>
              {getCategoryIcon(business.category)}
            </div>
            <div>
              <Link to={`/business/${business.id}`}>
                <h3 className="font-newspaper text-lg font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer">
                  {business.name}
                </h3>
              </Link>
              <Badge variant="outline" className="text-xs">
                {business.category}
              </Badge>
            </div>
          </div>
          
          {featured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm">
          {business.description || 'No description available.'}
        </p>

        {/* Services */}
        {business.services && (
          <div className="flex flex-wrap gap-1">
            {business.services.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {business.services.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{business.services.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{business.address || 'No address provided'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>{business.phone || 'No phone provided'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{business.hours || 'Hours not provided'}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Owner: {business.owner_name || 'Not specified'}
          </div>
          <Link to={`/business/${business.id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Directory;