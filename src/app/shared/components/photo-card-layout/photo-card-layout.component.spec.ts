import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCardLayoutComponent } from './photo-card-layout.component';
import { signal } from '@angular/core';
import { PHOTO_MOCK } from '@app/shared/mock/photo';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

describe('PhotoCardLayoutComponent', () => {
  let component: PhotoCardLayoutComponent;
  let fixture: ComponentFixture<PhotoCardLayoutComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    const mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '123' : null),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [PhotoCardLayoutComponent, BrowserAnimationsModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCardLayoutComponent);
    component = fixture.componentInstance;
    const signalPhotosInput = signal([PHOTO_MOCK]);
    const signalHasLink = signal(true);
    component.photos = signalPhotosInput as unknown as typeof component.photos;
    component.hasLink = signalHasLink as unknown as typeof component.hasLink;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
