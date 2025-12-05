import { Recipe, MatchedRecipe, DietaryPreference } from '@/types/recipe';
import { ingredientMatches } from './ingredientParser';

export const matchRecipes = (
  recipes: Recipe[],
  userIngredients: string[],
  preferences: DietaryPreference[]
): MatchedRecipe[] => {
  if (userIngredients.length === 0) return [];

  const matchedRecipes: MatchedRecipe[] = [];

  for (const recipe of recipes) {
    // Check dietary preferences
    if (preferences.length > 0) {
      const hasAllPreferences = preferences.every(pref => 
        recipe.tags.includes(pref)
      );
      if (!hasAllPreferences) continue;
    }

    // Calculate ingredient matches
    const matchedIngredients: string[] = [];
    const missingIngredients: string[] = [];

    for (const recipeIngredient of recipe.ingredients) {
      const isMatched = userIngredients.some(userIng => 
        ingredientMatches(userIng, recipeIngredient)
      );
      
      if (isMatched) {
        matchedIngredients.push(recipeIngredient);
      } else {
        missingIngredients.push(recipeIngredient);
      }
    }

    const matchPercentage = Math.round(
      (matchedIngredients.length / recipe.ingredients.length) * 100
    );

    // Only include recipes with at least 50% match
    if (matchPercentage >= 50) {
      matchedRecipes.push({
        ...recipe,
        matchPercentage,
        matchedIngredients,
        missingIngredients,
        isFullMatch: matchPercentage === 100,
      });
    }
  }

  // Sort by match percentage (descending), then by name
  return matchedRecipes.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return a.name.localeCompare(b.name);
  });
};

export const getFullMatches = (recipes: MatchedRecipe[]): MatchedRecipe[] => {
  return recipes.filter(r => r.isFullMatch);
};

export const getPartialMatches = (recipes: MatchedRecipe[]): MatchedRecipe[] => {
  return recipes.filter(r => !r.isFullMatch);
};
