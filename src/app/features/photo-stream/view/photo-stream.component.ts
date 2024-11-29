import { Component, inject, OnInit } from '@angular/core';
import { PhotoStreamService } from '@app/features/photo-stream/services/photo-stream.service';
import { Photo } from '@app/models';
import { InfiniteScrollDirective } from '@app/shared/directives/infinite-scroll.directive';
import { PhotoCardLayoutComponent } from '@app/shared/components/photo-card-layout/photo-card-layout.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoSkeletonLayoutComponent } from '@app/shared/components/photo-skeleton-layout/photo-skeleton-layout.component';
import {
  SNACKBAR_ACTION,
  SNACKBAR_CLASS,
  SNACKBAR_DURATION,
} from '@app/shared/constants/snakbar.constants';

@Component({
  templateUrl: './photo-stream.component.html',
  styleUrl: './photo-stream.component.scss',
  standalone: true,
  imports: [
    InfiniteScrollDirective,
    PhotoSkeletonLayoutComponent,
    PhotoCardLayoutComponent,
  ],
})
export class PhotoStreamComponent implements OnInit {
  photos: Photo[] = [];
  isLoading = false;
  page: number = 0;
  limit: number = 0;
  private snackBar = inject(MatSnackBar);
  private photoStreamService: PhotoStreamService = inject(PhotoStreamService);

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.photoStreamService.getPhotos(this.page + 1, this.limit).subscribe({
      next: (newPhotos) => {
        this.photos = [...this.photos, ...newPhotos];
        this.page += 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading photos', err);
        this.isLoading = false;
        const errorMessage = 'Failed to load photos. Please try again.';

        this.snackBar.open(errorMessage, SNACKBAR_ACTION.Dismiss, {
          duration: SNACKBAR_DURATION,
          panelClass: SNACKBAR_CLASS.Error,
        });
      },
    });
  }
}
