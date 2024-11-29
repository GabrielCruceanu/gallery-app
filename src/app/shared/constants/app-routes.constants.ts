import { AppRouteKey, AppRoutes } from '@app/models';

export const APP_ROUTES: AppRoutes = {
  [AppRouteKey.PHOTOS]: { name: 'Photos', path: '' },
  [AppRouteKey.FAVORITES]: { name: 'Favorites', path: '/favorites' },
  [AppRouteKey.SINGLE_PHOTO]: { name: 'Photo', path: 'photos/:id' },
};
