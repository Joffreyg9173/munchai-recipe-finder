import { useState } from 'react';
import { ChefHat, Search } from 'lucide-react';
import { MatchedRecipe } from '@/types/recipe';
import { getFullMatches, getPartialMatches } from '@/utils/recipeMatching';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';

interface RecipeResultsProps {
  recipes: MatchedRecipe[];
}

const RecipeResults = ({ recipes }: RecipeResultsProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<MatchedRecipe | null>(null);

  const fullMatches = getFullMatches(recipes);
  const partialMatches = getPartialMatches(recipes);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Search className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-display font-semibold text-xl text-foreground mb-2">
          No recipes found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adding more ingredients or adjusting your dietary preferences to find matching recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Full matches */}
      {fullMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-coral flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-primary-foreground" />
            </div>
            <h2 className="font-display font-semibold text-lg text-foreground">
              Perfect Matches
            </h2>
            <span className="text-sm text-muted-foreground">
              ({fullMatches.length})
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fullMatches.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Partial matches */}
      {partialMatches.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-secondary-foreground" />
            </div>
            <h2 className="font-display font-semibold text-lg text-foreground">
              Partial Matches
            </h2>
            <span className="text-sm text-muted-foreground">
              ({partialMatches.length})
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partialMatches.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(fullMatches.length + index) * 50}ms` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default RecipeResults;
