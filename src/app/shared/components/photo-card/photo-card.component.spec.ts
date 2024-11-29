import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhotoCardComponent } from './photo-card.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { PHOTO_MOCK } from '@app/shared/mock/photo';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;

  beforeEach(async () => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = PHOTO_MOCK.download_url;
    head.appendChild(link);

    await TestBed.configureTestingModule({
      imports: [PhotoCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;

    // Provide mock inputs
    const signalPhotoInput = signal(PHOTO_MOCK);
    const signalHasLink = signal(PHOTO_MOCK);
    component.photo = signalPhotoInput as unknown as typeof component.photo;
    component.hasLink = signalHasLink as unknown as typeof component.hasLink;

    fixture.detectChanges(); // Apply changes
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the photo URL in the img element', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy(); // Ensure img is rendered
    expect(imgElement.nativeElement.src).toContain(
      component.photo().download_url,
    );
  });
});
