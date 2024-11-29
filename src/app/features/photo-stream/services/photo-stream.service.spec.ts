import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PhotoStreamService } from './photo-stream.service';
import { EnvironmentService } from '@app/core/services/environment-service/environment.service';
import { PHOTO_MOCK } from '@app/shared/mock/photo';

describe('PhotosService', () => {
  let service: PhotoStreamService;
  let httpMock: HttpTestingController;
  let environmentService: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnvironmentService],
    });
    service = TestBed.inject(PhotoStreamService);
    httpMock = TestBed.inject(HttpTestingController);
    environmentService = TestBed.inject(EnvironmentService);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPhotos should fetch data', () => {
    const dummyPhotos = [PHOTO_MOCK];

    const page = 1;
    const limit = 10;

    service.getPhotos(page, limit).subscribe((photos: any) => {
      expect(photos.length).toBe(1);
      expect(photos).toEqual(dummyPhotos);
    });

    const req = httpMock.expectOne(
      `${environmentService.galleryApiUrl}/list?page=${page}&limit=${limit}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPhotos);
  });
});
