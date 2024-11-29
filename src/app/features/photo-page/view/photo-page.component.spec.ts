import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PhotoPageComponent } from './photo-page.component';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PhotoPageComponent', () => {
  let component: PhotoPageComponent;
  let fixture: ComponentFixture<PhotoPageComponent>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', [
      'getFavoritePhotoById',
      'removeFromFavorites',
    ]);

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '123' : null),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [PhotoPageComponent, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: FavoritesService, useValue: mockFavoritesService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
