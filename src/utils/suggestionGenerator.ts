import { SuggestedDish, DietaryPreference } from '@/types/recipe';

// Ingredient categories
const carbs = ['pasta', 'rice', 'bread', 'potato', 'noodles', 'tortilla', 'oats'];
const proteins = ['chicken', 'beef', 'egg', 'tofu', 'shrimp', 'fish', 'beans', 'chickpeas'];
const vegetarianProteins = ['egg', 'tofu', 'beans', 'chickpeas', 'paneer', 'tempeh'];
const halalProteins = ['chicken', 'beef', 'egg', 'tofu', 'fish', 'shrimp', 'beans'];
const seasonings = ['salt', 'pepper', 'paprika', 'garlic', 'herbs', 'cumin', 'oregano', 'basil', 'ginger', 'soy sauce', 'chili'];

// Dish name templates
const dishTemplates = [
  { template: '{protein} with {carb}', category: 'Main Dish' },
  { template: 'Sautéed {protein} and {carb}', category: 'Quick Meal' },
  { template: '{carb} Bowl with {protein}', category: 'Bowl' },
  { template: 'Simple {protein} {carb} Stir-fry', category: 'Stir-fry' },
  { template: 'Homestyle {protein} over {carb}', category: 'Comfort Food' },
];

const quickTemplates = [
  { template: 'Quick {protein} {carb}', category: 'Quick Meal' },
  { template: '5-Minute {protein} with {carb}', category: 'Express' },
  { template: 'Easy {carb} and {protein}', category: 'Simple' },
];

const findCategory = (ingredient: string, categories: string[]): boolean => {
  const normalized = ingredient.toLowerCase();
  return categories.some(cat => 
    normalized.includes(cat) || cat.includes(normalized)
  );
};

export const generateSuggestion = (
  userIngredients: string[],
  preferences: DietaryPreference[]
): SuggestedDish | null => {
  if (userIngredients.length === 0) return null;

  const normalizedIngredients = userIngredients.map(i => i.toLowerCase());

  // Determine which protein pool to use
  let proteinPool = proteins;
  if (preferences.includes('vegetarian')) {
    proteinPool = vegetarianProteins;
  } else if (preferences.includes('halal')) {
    proteinPool = halalProteins;
  }

  // Find available ingredients by category
  const availableCarbs = normalizedIngredients.filter(ing => 
    findCategory(ing, carbs)
  );
  const availableProteins = normalizedIngredients.filter(ing => 
    findCategory(ing, proteinPool)
  );
  const availableSeasonings = normalizedIngredients.filter(ing => 
    findCategory(ing, seasonings)
  );

  // Need at least one carb or protein to generate a suggestion
  if (availableCarbs.length === 0 && availableProteins.length === 0) {
    return null;
  }

  // Select best ingredients
  const selectedCarb = availableCarbs[0] || 'rice';
  const selectedProtein = availableProteins[0] || (preferences.includes('vegetarian') ? 'tofu' : 'chicken');
  const selectedSeasoning = availableSeasonings[0] || 'garlic';

  // Select template based on preferences
  const templates = preferences.includes('quick') ? quickTemplates : dishTemplates;
  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

  // Capitalize first letter of each word
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Generate dish name
  const dishName = selectedTemplate.template
    .replace('{protein}', capitalize(selectedProtein))
    .replace('{carb}', capitalize(selectedCarb));

  // Compile ingredients used
  const usedIngredients = [selectedCarb, selectedProtein, selectedSeasoning]
    .filter((ing, index, self) => self.indexOf(ing) === index);

  return {
    name: dishName,
    ingredients: usedIngredients,
    category: selectedTemplate.category,
  };
};
