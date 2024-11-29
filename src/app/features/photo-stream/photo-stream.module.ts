import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoStreamRoutingModule } from '@app/features/photo-stream/photo-stream-routing.module';
import { PhotoStreamService } from '@app/features/photo-stream/services/photo-stream.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, PhotoStreamRoutingModule],
  providers: [PhotoStreamService],
})
export class PhotoStreamModule {}
