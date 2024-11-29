import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Photo } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites: WritableSignal<Photo[]> = signal(
    this.loadFavoritesFromLocalStorage(),
  );

  constructor() {
    effect(() => {
      const currentFavorites = this.favorites();
      this.saveFavoritesToLocalStorage(currentFavorites);
    });
  }

  getAllFavorites() {
    return this.loadFavoritesFromLocalStorage();
  }

  addToFavorites(photo: Photo): void {
    if (this.isAlreadyFavorite(photo)) {
      this.removeFromFavorites(photo);
    } else {
      const updatedFavorites = [...this.favorites(), photo];
      this.favorites.set(updatedFavorites);
    }
  }

  isFavorite(photo: Photo): boolean {
    return this.isAlreadyFavorite(photo);
  }

  removeFromFavorites(photo: Photo): void {
    const updatedFavorites = this.favorites().filter((p) => p.id !== photo.id);
    this.favorites.set(updatedFavorites);
  }

  getFavoritePhotoById(id: string): Photo | undefined {
    const favoriteById = this.favorites().find((photo) => photo.id === id);
    console.log('favoriteById', favoriteById);
    return favoriteById;
  }

  private saveFavoritesToLocalStorage(favorites: Photo[]): void {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to local storage:', error);
    }
  }

  private loadFavoritesFromLocalStorage(): Photo[] {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Failed to load favorites from local storage:', error);
      return [];
    }
  }

  private isAlreadyFavorite(photo: Photo): boolean {
    return this.favorites().some((p) => p.id === photo.id);
  }
}
