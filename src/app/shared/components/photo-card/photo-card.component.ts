import { Component, computed, inject, input } from '@angular/core';
import { Photo } from '@app/models';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';

@Component({
  selector: 'app-photo-card',
  imports: [NgOptimizedImage, MatIcon, MatIconButton, RouterLink],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
  standalone: true,
})
export class PhotoCardComponent {
  photo = input.required<Photo>();
  hasLink = input.required<boolean>();
  private favoritesService: FavoritesService = inject(FavoritesService);
  readonly isFavorite = computed(() =>
    this.favoritesService.isFavorite(this.photo()),
  );
  readonly favoriteIcon = computed(() =>
    this.favoritesService.isFavorite(this.photo())
      ? 'favorite'
      : 'favorite_border',
  );

  onAddToFavorites(photo: Photo): void {
    this.favoritesService.addToFavorites(photo);
  }
}
