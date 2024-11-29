import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';
import { Photo } from '@app/models';
import { NgOptimizedImage } from '@angular/common';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_ROUTES } from '@app/shared/constants/app-routes.constants';
import {
  SNACKBAR_ACTION,
  SNACKBAR_CLASS,
  SNACKBAR_DURATION,
} from '@app/shared/constants/snakbar.constants';

@Component({
  selector: 'app-photo-page',
  imports: [MatIcon, NgOptimizedImage, MatFabButton],
  templateUrl: './photo-page.component.html',
  standalone: true,
  styleUrl: './photo-page.component.scss',
})
export class PhotoPageComponent implements OnInit {
  photo: Photo | undefined;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.fetchPhoto();
  }

  onRemoveFromFavorites(): void {
    if (!this.photo) {
      this.showSnackBar('Photo not found', true);
      return;
    }

    this.favoritesService.removeFromFavorites(this.photo);
    this.showSnackBar('Photo removed from favorites');
    this.router.navigate([APP_ROUTES.FAVORITES.path]);
  }

  private fetchPhoto(): void {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (!photoId) {
      this.showSnackBar('Invalid photo ID', true);
      this.router.navigate([APP_ROUTES.FAVORITES.path]);
      return;
    }

    this.photo = this.favoritesService.getFavoritePhotoById(photoId);

    if (!this.photo) {
      this.showSnackBar('Photo not found in favorites', true);
      this.router.navigate([APP_ROUTES.FAVORITES.path]);
    }
  }

  private showSnackBar(message: string, isError: boolean = false): void {
    this.snackBar.open(message, isError ? SNACKBAR_ACTION.Dismiss : '', {
      duration: SNACKBAR_DURATION,
      panelClass: isError ? SNACKBAR_CLASS.Error : SNACKBAR_CLASS.Success,
    });
  }
}
