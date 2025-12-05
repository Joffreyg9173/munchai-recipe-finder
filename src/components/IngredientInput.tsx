import { useState, KeyboardEvent } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { parseIngredients } from '@/utils/ingredientParser';
import { cn } from '@/lib/utils';

interface IngredientInputProps {
  onIngredientsChange: (ingredients: string[]) => void;
  ingredients: string[];
}

const IngredientInput = ({ onIngredientsChange, ingredients }: IngredientInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredients = () => {
    if (!inputValue.trim()) return;
    
    const newIngredients = parseIngredients(inputValue);
    const uniqueIngredients = [...new Set([...ingredients, ...newIngredients])];
    onIngredientsChange(uniqueIngredients);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredients();
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter(i => i !== ingredient));
  };

  const clearAll = () => {
    onIngredientsChange([]);
    setInputValue('');
  };

  const suggestedIngredients = ['chicken', 'rice', 'pasta', 'egg', 'garlic', 'onion', 'tomato', 'cheese'];
  const filteredSuggestions = suggestedIngredients.filter(s => !ingredients.includes(s));

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <Input
          type="text"
          placeholder="Enter ingredients (comma-separated)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-24 h-14 text-base rounded-xl border-2 border-border focus:border-primary bg-card shadow-soft"
        />
        <Button
          onClick={handleAddIngredients}
          disabled={!inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 gradient-coral text-primary-foreground rounded-lg px-4 h-10 font-medium shadow-soft hover:shadow-glow transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Current ingredients */}
      {ingredients.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Your ingredients ({ingredients.length})
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-destructive"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="secondary"
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg',
                  'bg-sage-light text-secondary-foreground',
                  'hover:bg-sage transition-colors cursor-default'
                )}
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {ingredients.length === 0 && (
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Quick add:</span>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.slice(0, 6).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onIngredientsChange([...ingredients, suggestion])}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
