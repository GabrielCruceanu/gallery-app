import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent],
  standalone: true,
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
})
export class AppComponent {}
