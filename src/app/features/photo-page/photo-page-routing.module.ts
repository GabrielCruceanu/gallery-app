import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoPageComponent } from '@app/features/photo-page/view/photo-page.component';

const routes: Routes = [{ path: '', component: PhotoPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoPageRoutingModule {}
