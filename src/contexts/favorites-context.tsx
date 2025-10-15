'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteProperty {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  rent: number;
  capRate: number;
  type: string;
  status: string;
  image: string;
  favorite: boolean;
  views: number;
  daysOnMarket: number;
  cashFlow: number;
}

interface FavoritesContextType {
  favorites: string[];
  favoriteProperties: FavoriteProperty[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  addToFavorites: (property: FavoriteProperty) => void;
  removeFromFavorites: (propertyId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Keys for localStorage
const FAVORITES_STORAGE_KEY = 'texasrepro-favorites';
const FAVORITE_PROPERTIES_STORAGE_KEY = 'texasrepro-favorite-properties';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<FavoriteProperty[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavoritesFromStorage = () => {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        const storedProperties = localStorage.getItem(FAVORITE_PROPERTIES_STORAGE_KEY);
        
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
        if (storedProperties) {
          setFavoriteProperties(JSON.parse(storedProperties));
        }
      } catch (error) {
        console.error('Error loading favorites from storage:', error);
        // Clear corrupted data
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
        localStorage.removeItem(FAVORITE_PROPERTIES_STORAGE_KEY);
      }
    };

    loadFavoritesFromStorage();
  }, []);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      
      // Save to localStorage
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  const addToFavorites = (property: FavoriteProperty) => {
    setFavorites(prev => {
      const newFavorites = [...prev, property.id];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });

    setFavoriteProperties(prev => {
      const newProperties = [...prev, { ...property, favorite: true }];
      localStorage.setItem(FAVORITE_PROPERTIES_STORAGE_KEY, JSON.stringify(newProperties));
      return newProperties;
    });
  };

  const removeFromFavorites = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== propertyId);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });

    setFavoriteProperties(prev => {
      const newProperties = prev.filter(property => property.id !== propertyId);
      localStorage.setItem(FAVORITE_PROPERTIES_STORAGE_KEY, JSON.stringify(newProperties));
      return newProperties;
    });
  };

  const value: FavoritesContextType = {
    favorites,
    favoriteProperties,
    toggleFavorite,
    isFavorite,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}