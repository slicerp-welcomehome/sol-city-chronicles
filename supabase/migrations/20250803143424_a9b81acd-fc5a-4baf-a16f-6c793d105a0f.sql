-- Insert sample property listings
INSERT INTO public.properties (
  title,
  price,
  street_number,
  street_name,
  neighborhood,
  zipcode,
  description,
  interiors,
  tags,
  picture_urls
) VALUES 
(
  'Modern Downtown Loft',
  450000,
  '123',
  'Main Street',
  'Downtown',
  '12345',
  'Stunning modern loft with exposed brick walls and floor-to-ceiling windows. Perfect for urban professionals.',
  '{"bedrooms": 2, "bathrooms": 2, "sqft": 1200}',
  ARRAY['🪑 Furnished', '🅿️ Parking', '🏙️ City view', '🔥 Fireplace'],
  ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800']
),
(
  'Cozy Family Home',
  325000,
  '456',
  'Oak Avenue',
  'Maple Heights',
  '12346',
  'Beautiful family home with spacious backyard and updated kitchen. Great for families with children.',
  '{"bedrooms": 3, "bathrooms": 2, "sqft": 1800}',
  ARRAY['🌳 Yard', '🌷 Garden', '🚗 Garage', '🔥 Fireplace'],
  ARRAY['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800']
),
(
  'Luxury Waterfront Villa',
  850000,
  '789',
  'Seaside Drive',
  'Coastal Heights',
  '12347',
  'Exclusive waterfront property with private beach access and panoramic ocean views.',
  '{"bedrooms": 4, "bathrooms": 3, "sqft": 2800}',
  ARRAY['🌊 Sea view', '🏊 Pool', '🌇 Terrace', '🪟 Balcony', '🍺 Bar', '🛀 Jacuzzi'],
  ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800']
),
(
  'Mountain Retreat Cabin',
  275000,
  '101',
  'Pine Ridge Road',
  'Mountain View',
  '12348',
  'Rustic cabin nestled in the mountains with stunning views and modern amenities.',
  '{"bedrooms": 2, "bathrooms": 1, "sqft": 1000}',
  ARRAY['🏔️ Mountain view', '🌲 Forest view', '🔥 Fireplace', '🧖 Sauna', '🌳 Yard'],
  ARRAY['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800']
),
(
  'Urban Studio Apartment',
  185000,
  '567',
  'Broadway',
  'Arts District',
  '12349',
  'Compact studio perfect for young professionals. Walking distance to galleries and restaurants.',
  '{"bedrooms": 1, "bathrooms": 1, "sqft": 600}',
  ARRAY['🪑 Furnished', '🏙️ City view', '❄️ Air conditioning', '🏋️ Gym'],
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800']
),
(
  'Executive Estate',
  1200000,
  '890',
  'Executive Boulevard',
  'Prestigious Hills',
  '12350',
  'Magnificent estate with all luxury amenities. Perfect for entertaining and executive lifestyle.',
  '{"bedrooms": 5, "bathrooms": 4, "sqft": 4200}',
  ARRAY['🏊 Pool', '🚗 Garage', '🏋️ Gym', '🎥 Cinema', '📚 Library', '🏢 Office', '🍺 Bar', '🌳 Yard'],
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800']
);