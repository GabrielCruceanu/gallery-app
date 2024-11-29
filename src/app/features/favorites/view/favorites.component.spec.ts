import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '@app/features/favorites/services/favorites.service';
import { Photo } from '@app/models';
import { PHOTO_MOCK, PHOTO_MOCK_TWO } from '@app/shared/mock/photo';
import { ActivatedRoute } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    favoritesService = jasmine.createSpyObj('FavoritesService', [
      'getAllFavorites',
    ]);

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;

    // Mock service methods
    favoritesService.getAllFavorites.and.returnValue([
      PHOTO_MOCK,
      PHOTO_MOCK_TWO,
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Favorite Photos', () => {
    it('should get favorite photos from the service', () => {
      const mockPhotos: Photo[] = [PHOTO_MOCK, PHOTO_MOCK_TWO];

      favoritesService.getAllFavorites.and.returnValue(mockPhotos);
      fixture.detectChanges();

      expect(component.allFavorites).toEqual(mockPhotos);

      expect(favoritesService.getAllFavorites).toHaveBeenCalled();
    });
  });
});
