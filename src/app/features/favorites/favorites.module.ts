import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from '@app/features/favorites/view/favorites.component';
import { FavoritesRoutingModule } from '@app/features/favorites/favorites-routing.module';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FavoritesComponent, FavoritesRoutingModule],
  providers: [FavoritesService],
})
export class FavoritesModule {}
