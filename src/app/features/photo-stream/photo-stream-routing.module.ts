import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoStreamComponent } from '@app/features/photo-stream/view/photo-stream.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoStreamComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoStreamRoutingModule {}
