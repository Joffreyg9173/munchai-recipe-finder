import { Heart, Clock, Percent, ChevronRight } from 'lucide-react';
import { Recipe, MatchedRecipe } from '@/types/recipe';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe | MatchedRecipe;
  onClick: () => void;
  showMatchInfo?: boolean;
}

const isMatchedRecipe = (recipe: Recipe | MatchedRecipe): recipe is MatchedRecipe => {
  return 'matchPercentage' in recipe;
};

const RecipeCard = ({ recipe, onClick, showMatchInfo = true }: RecipeCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);
  const matched = isMatchedRecipe(recipe);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-card rounded-2xl border border-border p-5 cursor-pointer card-hover shadow-soft hover:shadow-card"
    >
      {/* Match percentage badge */}
      {matched && showMatchInfo && (
        <div className={cn(
          'absolute -top-2 -right-2 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-soft',
          recipe.isFullMatch
            ? 'gradient-coral text-primary-foreground'
            : 'bg-sage text-secondary-foreground'
        )}>
          <Percent className="w-3 h-3" />
          {recipe.matchPercentage}%
        </div>
      )}

      {/* Favorite button */}
      <button
        onClick={handleFavoriteClick}
        className={cn(
          'absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
          favorite
            ? 'bg-coral-light text-primary'
            : 'bg-muted text-muted-foreground hover:bg-coral-light hover:text-primary'
        )}
      >
        <Heart className={cn('w-4 h-4', favorite && 'fill-current')} />
      </button>

      {/* Content */}
      <div className="pr-10 space-y-3">
        <h3 className="font-display font-semibold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs px-2 py-0.5 rounded-md bg-muted/50 border-border text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
          {recipe.tags.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs px-2 py-0.5 rounded-md bg-muted/50 border-border text-muted-foreground"
            >
              +{recipe.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Match info */}
        {matched && showMatchInfo && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                <span className="text-secondary-foreground font-medium">{recipe.matchedIngredients.length}</span> matched
                {recipe.missingIngredients.length > 0 && (
                  <span className="ml-2">
                    · <span className="text-amber font-medium">{recipe.missingIngredients.length}</span> missing
                  </span>
                )}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        )}

        {/* For non-matched recipes */}
        {!matched && (
          <div className="flex items-center justify-between text-xs pt-2">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {recipe.ingredients.length} ingredients
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
