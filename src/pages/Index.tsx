import { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import IngredientInput from '@/components/IngredientInput';
import PreferencesPanel from '@/components/PreferencesPanel';
import RecipeResults from '@/components/RecipeResults';
import SuggestedDish from '@/components/SuggestedDish';
import { matchRecipes } from '@/utils/recipeMatching';
import { generateSuggestion } from '@/utils/suggestionGenerator';
import { DietaryPreference, Recipe } from '@/types/recipe';
import recipesData from '@/data/recipes.json';

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<DietaryPreference[]>([]);

  const recipes = recipesData as Recipe[];

  const matchedRecipes = useMemo(() => {
    return matchRecipes(recipes, ingredients, preferences);
  }, [recipes, ingredients, preferences]);

  const suggestion = useMemo(() => {
    if (ingredients.length > 0 && matchedRecipes.length === 0) {
      return generateSuggestion(ingredients, preferences);
    }
    return null;
  }, [ingredients, matchedRecipes.length, preferences]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 gradient-coral opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 gradient-sage opacity-10 rounded-full blur-3xl" />
        </div>

        <div className="container relative py-12 lg:py-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Smart Recipe Discovery
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              What's in your{' '}
              <span className="text-gradient">kitchen?</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter the ingredients you have, and let MunchAI find the perfect recipes for you.
              No more food waste, just delicious meals.
            </p>

            {/* Ingredient Input */}
            <div className="pt-4">
              <IngredientInput
                ingredients={ingredients}
                onIngredientsChange={setIngredients}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8 lg:py-12">
        <div className="space-y-8">
          {/* Preferences */}
          <PreferencesPanel
            selectedPreferences={preferences}
            onPreferencesChange={setPreferences}
          />

          {/* Results or Suggestion */}
          {ingredients.length > 0 ? (
            matchedRecipes.length > 0 ? (
              <RecipeResults recipes={matchedRecipes} />
            ) : suggestion ? (
              <div className="max-w-xl mx-auto">
                <SuggestedDish suggestion={suggestion} />
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No recipes found. Try different ingredients or adjust your preferences.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Ready to cook something amazing?
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Add some ingredients above to discover recipes you can make right now!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Made with ♥ by MunchAI · Powered by smart ingredient matching
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
