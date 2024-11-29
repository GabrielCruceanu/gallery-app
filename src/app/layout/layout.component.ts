import { Component } from '@angular/core';
import { HeaderComponent } from '@app/layout/components/header/header.component';
import { FooterComponent } from '@app/layout/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
