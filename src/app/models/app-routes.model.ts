export enum AppRouteKey {
  PHOTOS = 'PHOTOS',
  FAVORITES = 'FAVORITES',
  SINGLE_PHOTO = 'SINGLE_PHOTO',
}

export type AppRoutes = Record<AppRouteKey, AppRoute>;

export type AppRoute = {
  name: string;
  path: string;
};
