import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Photo } from '@app/models';
import {
  PHOTO_MOCK,
  PHOTO_MOCK_TREE,
  PHOTO_MOCK_TWO,
} from '@app/shared/mock/photo';

describe('FavoritesService', () => {
  let favoritesService: FavoritesService;
  let spyLocalStorage: jasmine.SpyObj<Storage>;
  const photoMock: Photo = PHOTO_MOCK;
  const photoMockTwo: Photo = PHOTO_MOCK_TWO;
  const photoMockThree: Photo = PHOTO_MOCK_TREE;

  beforeEach(() => {
    setupMocks();
    setupTestBed();

    favoritesService = TestBed.inject(FavoritesService);
    spyLocalStorage.getItem.and.returnValue(null);
  });

  function setupMocks() {
    spyLocalStorage = jasmine.createSpyObj('localStorage', [
      'getItem',
      'setItem',
    ]);
  }

  function setupTestBed() {
    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        { provide: Storage, useValue: spyLocalStorage },
      ],
    });
  }

  it('should be created', () => {
    expect(favoritesService).toBeTruthy();
  });

  describe('#addToFavorites', () => {
    it('should add a photo to the favorites if it is not already there', () => {
      favoritesService.addToFavorites(photoMock);
      spyLocalStorage.setItem('favorites', JSON.stringify([photoMock]));

      expect(favoritesService.isFavorite(photoMock)).toBe(true);
      expect(spyLocalStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        JSON.stringify([photoMock]),
      );

      spyLocalStorage.getItem.and.returnValue(JSON.stringify([photoMock]));
      const storedFavorites = JSON.parse(spyLocalStorage.getItem('favorites')!);
      expect(storedFavorites).toContain(jasmine.objectContaining(photoMock));
    });

    it('should remove a photo from the favorites if it is already there', () => {
      favoritesService.addToFavorites(photoMock);
      favoritesService.addToFavorites(photoMock);

      expect(favoritesService.isFavorite(photoMock)).toBe(false);
      expect(spyLocalStorage.getItem('favorites')).not.toContain(
        JSON.stringify(photoMock),
      );
    });
  });

  describe('#isFavorite', () => {
    it('should return false if a photo is not in the favorites', () => {
      expect(favoritesService.isFavorite(photoMockTwo)).toBe(false);
    });
  });

  describe('#removeFromFavorites', () => {
    it('should remove a photo from the favorites', () => {
      spyLocalStorage.getItem.and.returnValue(JSON.stringify([photoMockThree]));
      favoritesService.removeFromFavorites(photoMockThree);

      expect(favoritesService.isFavorite(photoMockThree)).toBe(false);
    });
  });

  describe('#getFavoritePhotoById', () => {
    it('should return undefined if a photo with the passed id does not exist', () => {
      const nonexistentId = 'nonexistent';

      expect(favoritesService.getFavoritePhotoById(nonexistentId)).toBe(
        undefined,
      );
    });
  });
});
