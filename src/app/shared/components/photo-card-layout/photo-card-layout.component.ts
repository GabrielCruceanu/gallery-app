import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PhotoCardComponent } from '@app/shared/components/photo-card/photo-card.component';
import { Photo } from '@app/models';

@Component({
  selector: 'app-photo-card-layout',
  imports: [PhotoCardComponent],
  templateUrl: './photo-card-layout.component.html',
  standalone: true,
  styleUrl: './photo-card-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardLayoutComponent {
  photos = input.required<Photo[]>();
  hasLink = input.required<boolean>();
}
