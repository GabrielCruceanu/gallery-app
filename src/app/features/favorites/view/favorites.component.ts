import { Component, inject, OnInit } from '@angular/core';
import { PhotoCardLayoutComponent } from '@app/shared/components/photo-card-layout/photo-card-layout.component';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';
import { Photo } from '@app/models';

@Component({
  selector: 'app-favorites',
  imports: [PhotoCardLayoutComponent],
  templateUrl: './favorites.component.html',
  standalone: true,
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  allFavorites: Photo[] = [];
  private favoritesService = inject(FavoritesService);

  ngOnInit() {
    this.getFavoritePhotos();
  }

  getFavoritePhotos() {
    this.allFavorites = this.favoritesService.getAllFavorites();
  }
}
