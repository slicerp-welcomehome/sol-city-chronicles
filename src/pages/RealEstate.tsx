import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Home, DollarSign, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  price: number;
  street_number: string | null;
  street_name: string | null;
  neighborhood: string | null;
  zipcode: string | null;
  interiors: any;
  tags: string[] | null;
  picture_urls: string[] | null;
  description: string | null;
}

const PROPERTY_TAGS = [
  "🪑 Furnished",
  "🚗 Garage", 
  "🏊 Pool",
  "🌳 Yard",
  "🌷 Garden",
  "🪟 Balcony",
  "🌇 Terrace",
  "🌊 Sea view",
  "🏔️ Mountain view",
  "🏙️ City view",
  "🌲 Forest view",
  "🏞️ Lake view",
  "🏞️ River view",
  "🅿️ Parking",
  "🏋️ Gym",
  "🧖 Sauna",
  "🛀 Jacuzzi",
  "🍺 Bar",
  "🎥 Cinema",
  "📚 Library",
  "🏢 Office",
  "🔥 Fireplace",
  "🌡️ Heating",
  "❄️ Air conditioning"
];

const RealEstate = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data as Property[] || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to load properties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.neighborhood?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.street_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatAddress = (property: Property) => {
    const parts = [
      property.street_number,
      property.street_name,
      property.neighborhood,
      property.zipcode
    ].filter(Boolean);
    return parts.join(' ');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <Home className="h-8 w-8" />
          Real Estate
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover beautiful properties in our community
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by title, neighborhood, or street..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms.' : 'No properties are currently listed.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Property Image */}
              <div className="aspect-video bg-muted relative">
                {property.picture_urls && property.picture_urls.length > 0 ? (
                  <img
                    src={property.picture_urls[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {formatPrice(property.price)}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{property.title}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {formatAddress(property)}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {property.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {property.description}
                  </p>
                )}

                {/* Interior Details */}
                {property.interiors && Object.keys(property.interiors).length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 text-sm">
                      {Object.entries(property.interiors).map(([key, value]) => (
                        <span key={key} className="text-muted-foreground">
                          {String(value)} {key}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {property.tags && property.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.tags.slice(0, 4).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {property.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                )}

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RealEstate;