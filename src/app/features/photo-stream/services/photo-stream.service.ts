import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@app/core/services/environment-service/environment.service';
import { delay, map } from 'rxjs';
import { Photo } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoStreamService {
  private http = inject(HttpClient);
  private env = inject(EnvironmentService);

  getPhotos(page: number, limit: number) {
    return this.http
      .get(`${this.env.galleryApiUrl}/list?page=${page}&limit=${limit}`)
      .pipe(
        delay(300),
        map((photos: any) => photos.map((photo: Photo) => photo)),
      );
  }
}
