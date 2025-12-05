import { DietaryPreference } from '@/types/recipe';
import { cn } from '@/lib/utils';
import { 
  Leaf, 
  Moon, 
  Zap, 
  Flame, 
  Sunrise, 
  Cookie, 
  UtensilsCrossed 
} from 'lucide-react';

interface PreferencesPanelProps {
  selectedPreferences: DietaryPreference[];
  onPreferencesChange: (preferences: DietaryPreference[]) => void;
}

const preferences: { id: DietaryPreference; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'halal', label: 'Halal', icon: Moon, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'quick', label: 'Quick', icon: Zap, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'spicy', label: 'Spicy', icon: Flame, color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'breakfast', label: 'Breakfast', icon: Sunrise, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'snack', label: 'Snack', icon: Cookie, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'dinner', label: 'Dinner', icon: UtensilsCrossed, color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
];

const PreferencesPanel = ({ selectedPreferences, onPreferencesChange }: PreferencesPanelProps) => {
  const togglePreference = (pref: DietaryPreference) => {
    if (selectedPreferences.includes(pref)) {
      onPreferencesChange(selectedPreferences.filter(p => p !== pref));
    } else {
      onPreferencesChange([...selectedPreferences, pref]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Dietary Preferences</h3>
        {selectedPreferences.length > 0 && (
          <button
            onClick={() => onPreferencesChange([])}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {preferences.map(({ id, label, icon: Icon, color }) => {
          const isSelected = selectedPreferences.includes(id);
          return (
            <button
              key={id}
              onClick={() => togglePreference(id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200',
                isSelected
                  ? color
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PreferencesPanel;
