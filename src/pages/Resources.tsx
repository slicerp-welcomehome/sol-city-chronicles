import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, FileText, HelpCircle, Download, ExternalLink } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  category: 'Guidelines' | 'Templates' | 'Tutorials' | 'Tools';
  type: 'document' | 'guide' | 'template' | 'external';
  url?: string;
  downloadable?: boolean;
  featured?: boolean;
}

const resources: Resource[] = [
  {
    title: 'Character Creation Guide',
    description: 'Comprehensive guide to creating compelling characters for Sol City roleplay',
    category: 'Guidelines',
    type: 'guide',
    featured: true
  },
  {
    title: 'Roleplay Etiquette & Guidelines',
    description: 'Essential rules and best practices for respectful and engaging roleplay',
    category: 'Guidelines',
    type: 'document',
    featured: true
  },
  {
    title: 'Character Background Template',
    description: 'Fill-in template to help develop your character\'s backstory and motivations',
    category: 'Templates',
    type: 'template',
    downloadable: true
  },
  {
    title: 'Business Application Form',
    description: 'Template for establishing a new business in Sol City',
    category: 'Templates',
    type: 'template',
    downloadable: true
  },
  {
    title: 'Getting Started Tutorial',
    description: 'Step-by-step guide for new residents joining Sol City',
    category: 'Tutorials',
    type: 'guide'
  },
  {
    title: 'Advanced Storyline Development',
    description: 'Learn how to create and maintain engaging long-term storylines',
    category: 'Tutorials',
    type: 'guide'
  },
  {
    title: 'Sol City Map & Locations',
    description: 'Interactive map showing all major locations and districts',
    category: 'Tools',
    type: 'external',
    url: '/map'
  },
  {
    title: 'Character Relationship Tracker',
    description: 'Tool to help manage your character\'s relationships and interactions',
    category: 'Tools',
    type: 'external',
    url: '/relationship-tracker'
  }
];

const faqItems = [
  {
    question: 'How do I create a new character?',
    answer: 'Start with our Character Creation Guide, fill out the Background Template, and submit your application through the Join Sol page.'
  },
  {
    question: 'What are the rules about character death?',
    answer: 'Character death must be consensual between all parties involved. We encourage character development over permanent death.'
  },
  {
    question: 'Can I own a business in Sol City?',
    answer: 'Yes! Use our Business Application Form and work with our staff to establish your business in an appropriate location.'
  },
  {
    question: 'How do I report inappropriate behavior?',
    answer: 'Contact any staff member immediately through our moderation system or use the report function in Discord.'
  }
];

export const Resources = () => {
  const featuredResources = resources.filter(resource => resource.featured);
  const regularResources = resources.filter(resource => !resource.featured);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center border-b-2 border-primary pb-6">
        <h1 className="font-newspaper text-4xl font-bold text-primary mb-2">
          RP Resources
        </h1>
        <p className="text-muted-foreground">
          Everything you need for successful roleplay in Sol City
        </p>
      </div>

      {/* Quick Start Section */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30">
        <h2 className="font-newspaper text-xl font-bold text-primary mb-4">
          New to Sol City? Start Here!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold">1. Read Guidelines</h3>
            <p className="text-sm text-muted-foreground">Start with our roleplay guidelines and etiquette</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold">2. Create Character</h3>
            <p className="text-sm text-muted-foreground">Use our character creation guide and template</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold">3. Join Community</h3>
            <p className="text-sm text-muted-foreground">Submit application and start roleplaying</p>
          </div>
        </div>
      </Card>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-primary flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Featured Resources</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredResources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} featured />
            ))}
          </div>
        </div>
      )}

      {/* Resource Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Guidelines & Tutorials */}
        <div className="space-y-4">
          <h2 className="font-semibold text-primary">Guidelines & Tutorials</h2>
          <div className="space-y-3">
            {regularResources
              .filter(r => r.category === 'Guidelines' || r.category === 'Tutorials')
              .map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))
            }
          </div>
        </div>

        {/* Templates & Tools */}
        <div className="space-y-4">
          <h2 className="font-semibold text-primary">Templates & Tools</h2>
          <div className="space-y-3">
            {regularResources
              .filter(r => r.category === 'Templates' || r.category === 'Tools')
              .map((resource, index) => (
                <ResourceCard key={index} resource={resource} />
              ))
            }
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="font-semibold text-primary flex items-center space-x-2">
          <HelpCircle className="w-5 h-5" />
          <span>Frequently Asked Questions</span>
        </h2>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <Card key={index} className="p-4">
              <h3 className="font-semibold text-primary mb-2">{item.question}</h3>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card className="p-6 bg-muted/50">
        <h2 className="font-newspaper text-xl font-bold text-primary mb-4">
          Need More Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-primary mb-2">Contact Staff</h3>
            <p className="text-muted-foreground mb-2">
              Our staff team is here to help with any questions about roleplay, 
              character development, or technical issues.
            </p>
            <p className="text-accent">Visit our Staff Hall page for contact information.</p>
          </div>
          <div>
            <h3 className="font-semibold text-primary mb-2">Community Support</h3>
            <p className="text-muted-foreground mb-2">
              Join our Discord server for real-time help from both staff and 
              experienced community members.
            </p>
            <p className="text-accent">Discord: #help-desk channel</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean;
}

const ResourceCard = ({ resource, featured = false }: ResourceCardProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'template': return <Download className="w-4 h-4" />;
      case 'external': return <ExternalLink className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`p-4 hover:shadow-md transition-shadow ${featured ? 'border-2 border-accent/30 bg-accent/5' : ''}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getIcon(resource.type)}
            <Badge variant="outline" className="text-xs">
              {resource.category}
            </Badge>
          </div>
          {resource.downloadable && (
            <Badge variant="secondary" className="text-xs">
              Download
            </Badge>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-primary mb-1">
            {resource.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {resource.description}
          </p>
        </div>

        <div className="pt-2">
          <button className="text-sm text-accent hover:text-accent/80 transition-colors">
            {resource.downloadable ? 'Download' : 'View Resource'} →
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Resources;