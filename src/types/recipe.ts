export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  tags: string[];
  description: string;
}

export interface MatchedRecipe extends Recipe {
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  isFullMatch: boolean;
}

export type DietaryPreference = 
  | 'vegetarian' 
  | 'halal' 
  | 'quick' 
  | 'spicy' 
  | 'breakfast' 
  | 'snack' 
  | 'dinner';

export interface SuggestedDish {
  name: string;
  ingredients: string[];
  category: string;
}
