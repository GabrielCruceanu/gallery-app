import { Component, input, OnInit } from '@angular/core';
import { PhotoSkeletonComponent } from '@app/shared/components/photo-skeleton/photo-skeleton.component';

@Component({
  selector: 'app-photo-skeleton-layout',
  imports: [PhotoSkeletonComponent],
  standalone: true,
  templateUrl: './photo-skeleton-layout.component.html',
  styleUrl: './photo-skeleton-layout.component.scss',
})
export class PhotoSkeletonLayoutComponent implements OnInit {
  skeletonCount = input.required<number>();
  photosSkeleton: Array<any> = [];

  ngOnInit() {
    this.initializePhotosSkeleton();
  }

  private initializePhotosSkeleton() {
    for (let i = 0; i < this.skeletonCount(); i++) {
      this.photosSkeleton.push({ id: i });
    }
  }
}
