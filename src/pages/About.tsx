import { ArrowLeft, Database, Cpu, Heart, Utensils, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const About = () => {
  const features = [
    {
      icon: Database,
      title: 'Local Recipe Database',
      description: 'All recipes are stored locally in JSON format. No server required — everything runs in your browser.',
    },
    {
      icon: Cpu,
      title: 'Smart Matching Engine',
      description: 'Our algorithm finds recipes that match your ingredients, showing both perfect matches and partial matches (50%+ ingredient match).',
    },
    {
      icon: Sparkles,
      title: 'Rule-Based Suggestions',
      description: 'When no recipes match, our AI generator creates dish suggestions based on your available ingredients (carbs, proteins, seasonings).',
    },
    {
      icon: Filter,
      title: 'Dietary Preferences',
      description: 'Filter recipes by vegetarian, halal, quick meals, spicy, and meal type (breakfast, snack, dinner).',
    },
    {
      icon: Heart,
      title: 'Favorites System',
      description: 'Save your favorite recipes locally using localStorage. Access them anytime, even offline.',
    },
    {
      icon: Utensils,
      title: 'No Food Waste',
      description: 'MunchAI helps you cook with what you have, reducing food waste and saving money.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8 lg:py-12">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to recipes
          </Link>
          
          <div className="max-w-2xl">
            <h1 className="font-display font-bold text-4xl text-foreground mb-4">
              About <span className="text-gradient">MunchAI</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              MunchAI is a smart recipe finder that helps you discover what you can cook with the ingredients you already have. 
              No more staring at your fridge wondering what to make!
            </p>
          </div>
        </div>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
            How It Works
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl border border-border p-6 shadow-soft animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center mb-4 shadow-soft">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical details */}
        <section className="mb-16">
          <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
            Technical Details
          </h2>
          
          <div className="bg-card rounded-2xl border border-border p-6 shadow-soft space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Recipe Database</h3>
              <p className="text-muted-foreground text-sm">
                Our recipe database is stored in JSON format and includes 30+ diverse recipes. 
                Each recipe contains a name, list of ingredients, tags for filtering, and a description.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Ingredient Matching</h3>
              <p className="text-muted-foreground text-sm">
                The matching engine normalizes your input (lowercase, singular forms) and compares it 
                against recipe ingredients. It handles common variations and partial matches 
                (e.g., "pepper" matches "bell pepper").
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Suggestion Generator</h3>
              <p className="text-muted-foreground text-sm">
                When no recipes match, the rule-based generator analyzes your ingredients by category 
                (carbs, proteins, seasonings) and creates a suggested dish name. It respects dietary 
                preferences — vegetarian mode uses plant-based proteins, halal mode excludes non-halal meats.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Data Persistence</h3>
              <p className="text-muted-foreground text-sm">
                Your favorite recipes are saved to localStorage, ensuring they persist between sessions. 
                No account or backend required — your data stays on your device.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              Ready to start cooking?
            </h2>
            <p className="text-muted-foreground mb-6">
              Head back to the main page and discover what delicious meals you can make with your ingredients!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-coral text-primary-foreground rounded-xl font-medium shadow-soft hover:shadow-glow transition-shadow"
            >
              <Sparkles className="w-5 h-5" />
              Find Recipes
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Made with ♥ by MunchAI · Powered by smart ingredient matching
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
