import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { APP_ROUTES } from '@app/shared/constants/app-routes.constants';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';
import { PhotoStreamService } from '@app/features/photo-stream/services/photo-stream.service';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  providers: [FavoritesService, PhotoStreamService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  title: string = APP_ROUTES.PHOTOS.name;
  APP_ROUTES = APP_ROUTES;
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setTitleBasedOnRoute(window.location.pathname);
    this.trackRouteChanges();
  }

  private trackRouteChanges(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.url),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((currentRoute) => this.setTitleBasedOnRoute(currentRoute));
  }

  private setTitleBasedOnRoute(currentRoute: string): void {
    this.title =
      currentRoute === APP_ROUTES.FAVORITES.path
        ? APP_ROUTES.FAVORITES.name
        : currentRoute.startsWith('/photos/')
          ? APP_ROUTES.SINGLE_PHOTO.name
          : APP_ROUTES.PHOTOS.name;
  }
}
