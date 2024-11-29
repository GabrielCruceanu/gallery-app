import { Routes } from '@angular/router';
import { APP_ROUTES } from '@app/shared/constants/app-routes.constants';

export const routes: Routes = [
  {
    path: APP_ROUTES.PHOTOS.path,
    loadChildren: () =>
      import('@app/features/photo-stream/photo-stream.module').then(
        (m) => m.PhotoStreamModule,
      ),
  },
  {
    path: APP_ROUTES.FAVORITES.name.toLowerCase()!,
    loadChildren: () =>
      import('@app/features/favorites/favorites.module').then(
        (m) => m.FavoritesModule,
      ),
  },
  {
    path: APP_ROUTES.SINGLE_PHOTO.path,
    loadChildren: () =>
      import('@app/features/photo-page/photo-page.module').then(
        (m) => m.PhotoPageModule,
      ),
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.PHOTOS.path,
    pathMatch: 'full',
  },
];
