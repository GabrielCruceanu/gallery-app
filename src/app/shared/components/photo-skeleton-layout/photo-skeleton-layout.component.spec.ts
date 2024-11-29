import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PhotoSkeletonLayoutComponent } from './photo-skeleton-layout.component';
import { signal } from '@angular/core';

describe('PhotoSkeletonLayoutComponent', () => {
  let component: PhotoSkeletonLayoutComponent;
  let fixture: ComponentFixture<PhotoSkeletonLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSkeletonLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoSkeletonLayoutComponent);
    component = fixture.componentInstance;

    const skeletonCountSignal = signal(10);
    fixture.componentRef.setInput('skeletonCount', 10);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have the skeleton array with the required number of entries', () => {
  //   // Verify the skeleton array length matches the skeletonCount signal value
  //   expect(component.photosSkeleton.length).toEqual(component.skeletonCount());
  // });
  //
  // it('should update the skeleton array when skeletonCount changes', () => {
  //   // Update the signal value and check for reactive behavior
  //   component.skeletonCount.set(15);
  //   fixture.detectChanges(); // Trigger change detection
  //
  //   expect(component.photosSkeleton.length).toEqual(15);
  // });
});
