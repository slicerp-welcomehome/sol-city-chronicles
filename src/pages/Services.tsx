import { Card } from '@/components/ui/card';
import { MapPin, Phone, Clock, Users } from 'lucide-react';

interface ServiceDepartment {
  name: string;
  description: string;
  location: string;
  phone: string;
  hours: string;
  services: string[];
  director: string;
}

const departments: ServiceDepartment[] = [
  {
    name: 'City Hall',
    description: 'Main administrative office for all city services and permits',
    location: '123 Main Street, Downtown',
    phone: '(555) SOL-CITY',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    director: 'Margaret Thompson',
    services: ['Business Licenses', 'Building Permits', 'Voter Registration', 'City Council Records']
  },
  {
    name: 'Sol City Police Department',
    description: 'Ensuring safety and security for all residents of Sol City',
    location: '456 Oak Avenue',
    phone: '(555) 555-SCPD',
    hours: '24/7 Emergency Services',
    director: 'Chief Robert Martinez',
    services: ['Emergency Response', 'Community Policing', 'Traffic Enforcement', 'Crime Prevention']
  },
  {
    name: 'Fire & Emergency Services',
    description: 'Fire protection and emergency medical services',
    location: '789 Elm Street',
    phone: '(555) 555-FIRE',
    hours: '24/7 Emergency Services',
    director: 'Fire Chief Angela Davis',
    services: ['Fire Protection', 'Emergency Medical', 'Hazmat Response', 'Fire Safety Education']
  },
  {
    name: 'Public Works Department',
    description: 'Maintaining city infrastructure and utilities',
    location: '321 Industrial Drive',
    phone: '(555) 555-WORK',
    hours: 'Mon-Fri 7:00 AM - 3:30 PM',
    director: 'Thomas Anderson',
    services: ['Street Maintenance', 'Water & Sewer', 'Waste Management', 'Snow Removal']
  },
  {
    name: 'Parks & Recreation',
    description: 'Managing parks, recreation facilities, and community programs',
    location: '654 Park Avenue',
    phone: '(555) 555-PARK',
    hours: 'Mon-Sat 9:00 AM - 8:00 PM',
    director: 'Linda Rodriguez',
    services: ['Park Maintenance', 'Recreation Programs', 'Event Planning', 'Sports Leagues']
  },
  {
    name: 'Sol City Library',
    description: 'Your gateway to knowledge and community programming',
    location: '987 Library Lane',
    phone: '(555) 555-READ',
    hours: 'Mon-Thu 10:00 AM - 8:00 PM, Fri-Sat 10:00 AM - 5:00 PM',
    director: 'Marcus Rivera',
    services: ['Book Services', 'Computer Access', 'Study Rooms', 'Community Events']
  }
];

export const Services = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center border-b-2 border-primary pb-6">
        <h1 className="font-newspaper text-4xl font-bold text-primary mb-2">
          Town Services
        </h1>
        <p className="text-muted-foreground">
          Your guide to Sol City's municipal departments and services
        </p>
      </div>

      {/* Quick Contact Info */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
        <h2 className="font-newspaper text-xl font-bold text-primary mb-4">
          Emergency & Quick Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold text-destructive">Emergency Services</h3>
            <p className="text-2xl font-bold">911</p>
            <p className="text-sm text-muted-foreground">Police, Fire, Medical</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-primary">City Hall</h3>
            <p className="text-lg font-bold">(555) SOL-CITY</p>
            <p className="text-sm text-muted-foreground">General Information</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-accent">After Hours</h3>
            <p className="text-lg font-bold">(555) 555-HELP</p>
            <p className="text-sm text-muted-foreground">Non-Emergency Line</p>
          </div>
        </div>
      </Card>

      {/* Department Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept, index) => (
          <DepartmentCard key={index} department={dept} />
        ))}
      </div>

      {/* Additional Information */}
      <Card className="p-6 bg-muted/50">
        <h2 className="font-newspaper text-xl font-bold text-primary mb-4">
          Additional Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-primary mb-2">Online Services</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Pay utility bills online</li>
              <li>• Submit service requests</li>
              <li>• View city council agendas</li>
              <li>• Download forms and applications</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-2">Holiday Schedule</h3>
            <p className="text-muted-foreground mb-2">
              Most city services are closed on federal holidays. Emergency services remain available 24/7.
            </p>
            <p className="text-xs text-muted-foreground">
              For holiday hours and closures, please call individual departments.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface DepartmentCardProps {
  department: ServiceDepartment;
}

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="font-newspaper text-xl font-bold text-primary mb-2">
            {department.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {department.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{department.location}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>{department.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{department.hours}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary" />
            <span>Director: {department.director}</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-primary mb-2">Services Provided:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {department.services.map((service, index) => (
              <li key={index}>• {service}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Services;