import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSkeletonComponent } from './photo-skeleton.component';

describe('PhotoSkeletonComponent', () => {
  let component: PhotoSkeletonComponent;
  let fixture: ComponentFixture<PhotoSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
