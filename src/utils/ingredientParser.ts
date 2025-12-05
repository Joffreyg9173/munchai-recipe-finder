// Common plural to singular mappings
const pluralMappings: Record<string, string> = {
  tomatoes: 'tomato',
  potatoes: 'potato',
  onions: 'onion',
  carrots: 'carrot',
  eggs: 'egg',
  mushrooms: 'mushroom',
  peppers: 'bell pepper',
  noodles: 'noodles',
  beans: 'beans',
  chickpeas: 'chickpeas',
};

// Normalize a single ingredient
export const normalizeIngredient = (ingredient: string): string => {
  let normalized = ingredient.toLowerCase().trim();
  
  // Remove common measurements and quantities
  normalized = normalized
    .replace(/^\\d+\\s*(cups?|tbsp|tsp|oz|lb|g|kg|ml|l)?\\s*/i, '')
    .replace(/\\s*(cups?|tbsp|tsp|oz|lb|g|kg|ml|l)\\s*$/i, '')
    .trim();
  
  // Check for plural mappings
  if (pluralMappings[normalized]) {
    return pluralMappings[normalized];
  }
  
  // Remove trailing 's' for simple plurals (but keep essential ones)
  const keepPlural = ['noodles', 'beans', 'chickpeas', 'oats'];
  if (!keepPlural.includes(normalized) && normalized.endsWith('s') && normalized.length > 3) {
    const singular = normalized.slice(0, -1);
    // Only remove 's' if it makes sense
    if (!['s', 'ss'].includes(singular.slice(-1))) {
      normalized = singular;
    }
  }
  
  return normalized;
};

// Parse comma-separated input into array of normalized ingredients
export const parseIngredients = (input: string): string[] => {
  if (!input.trim()) return [];
  
  return input
    .split(',')
    .map(normalizeIngredient)
    .filter((ing) => ing.length > 0);
};

// Check if user ingredient matches recipe ingredient
export const ingredientMatches = (userIngredient: string, recipeIngredient: string): boolean => {
  const normalizedUser = normalizeIngredient(userIngredient);
  const normalizedRecipe = normalizeIngredient(recipeIngredient);
  
  // Exact match
  if (normalizedUser === normalizedRecipe) return true;
  
  // Partial match (e.g., "pepper" matches "bell pepper")
  if (normalizedRecipe.includes(normalizedUser) || normalizedUser.includes(normalizedRecipe)) {
    return true;
  }
  
  return false;
};
