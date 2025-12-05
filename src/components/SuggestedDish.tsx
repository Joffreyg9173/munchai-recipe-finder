import { Lightbulb, Sparkles } from 'lucide-react';
import { SuggestedDish as SuggestedDishType } from '@/types/recipe';
import { Badge } from '@/components/ui/badge';

interface SuggestedDishProps {
  suggestion: SuggestedDishType;
}

const SuggestedDish = ({ suggestion }: SuggestedDishProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-coral-light via-card to-sage-light rounded-2xl border border-border p-6 shadow-soft">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 gradient-coral opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 gradient-sage opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center shadow-soft animate-float">
            <Lightbulb className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber" />
              <span className="text-sm font-medium text-amber">AI Suggestion</span>
            </div>
            <h3 className="font-display font-bold text-xl text-foreground">
              {suggestion.name}
            </h3>
          </div>
        </div>

        <p className="text-muted-foreground text-sm">
          Based on your available ingredients, here's a dish you could make!
        </p>

        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Key ingredients
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestion.ingredients.map((ingredient) => (
              <Badge
                key={ingredient}
                className="px-3 py-1 rounded-lg bg-card text-foreground border border-border capitalize"
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Badge className="px-3 py-1 rounded-lg gradient-coral text-primary-foreground">
            {suggestion.category}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SuggestedDish;
