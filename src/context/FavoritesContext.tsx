import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe } from '@/types/recipe';

interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipe: Recipe) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'munchai-favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      if (prev.some(r => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  };

  const removeFavorite = (recipeId: string) => {
    setFavorites(prev => prev.filter(r => r.id !== recipeId));
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(r => r.id === recipeId);
  };

  const toggleFavorite = (recipe: Recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
