import { X, Heart, Check, AlertCircle } from 'lucide-react';
import { Recipe, MatchedRecipe } from '@/types/recipe';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RecipeModalProps {
  recipe: Recipe | MatchedRecipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const isMatchedRecipe = (recipe: Recipe | MatchedRecipe): recipe is MatchedRecipe => {
  return 'matchPercentage' in recipe;
};

const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!recipe) return null;

  const favorite = isFavorite(recipe.id);
  const matched = isMatchedRecipe(recipe);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="font-display text-2xl font-bold text-foreground pr-8">
              {recipe.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Match percentage */}
          {matched && (
            <div className={cn(
              'flex items-center gap-3 p-4 rounded-xl',
              recipe.isFullMatch ? 'bg-sage-light' : 'bg-coral-light'
            )}>
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg',
                recipe.isFullMatch
                  ? 'bg-sage text-secondary-foreground'
                  : 'gradient-coral text-primary-foreground'
              )}>
                {recipe.matchPercentage}%
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {recipe.isFullMatch ? 'Perfect Match!' : 'Partial Match'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recipe.matchedIngredients.length} of {recipe.ingredients.length} ingredients matched
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
            <p className="text-foreground">{recipe.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-muted text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Ingredients</h4>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient) => {
                const isMatched = matched ? recipe.matchedIngredients.includes(ingredient) : false;
                const isMissing = matched ? recipe.missingIngredients.includes(ingredient) : false;

                return (
                  <li
                    key={ingredient}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-lg text-sm',
                      matched && isMatched && 'bg-sage-light',
                      matched && isMissing && 'bg-coral-light'
                    )}
                  >
                    {matched ? (
                      isMatched ? (
                        <Check className="w-4 h-4 text-secondary-foreground" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-primary" />
                      )
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    )}
                    <span className={cn(
                      'capitalize',
                      matched && isMatched && 'text-secondary-foreground font-medium',
                      matched && isMissing && 'text-primary'
                    )}>
                      {ingredient}
                    </span>
                    {matched && isMissing && (
                      <span className="text-xs text-muted-foreground ml-auto">needed</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => toggleFavorite(recipe)}
              variant={favorite ? 'default' : 'outline'}
              className={cn(
                'flex-1',
                favorite && 'gradient-coral text-primary-foreground'
              )}
            >
              <Heart className={cn('w-4 h-4 mr-2', favorite && 'fill-current')} />
              {favorite ? 'Saved to Favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
