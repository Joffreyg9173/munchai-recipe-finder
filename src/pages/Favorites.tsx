import { useState } from 'react';
import { Heart, ChefHat, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import { useFavorites } from '@/context/FavoritesContext';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to recipes
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-coral flex items-center justify-center shadow-soft">
              <Heart className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                Your Favorites
              </h1>
              <p className="text-muted-foreground">
                {favorites.length} saved {favorites.length === 1 ? 'recipe' : 'recipes'}
              </p>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  showMatchInfo={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              No favorites yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Start exploring recipes and save your favorites to access them quickly later!
            </p>
            <Link to="/">
              <Button className="gradient-coral text-primary-foreground">
                <ChefHat className="w-4 h-4 mr-2" />
                Find Recipes
              </Button>
            </Link>
          </div>
        )}

        <RecipeModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      </main>
    </div>
  );
};

export default Favorites;
