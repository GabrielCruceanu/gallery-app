import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoStreamComponent } from './photo-stream.component';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PhotoStreamService } from '@app/features/photo-stream/services/photo-stream.service';

describe('PhotoStreamComponent', () => {
  let component: PhotoStreamComponent;
  let fixture: ComponentFixture<PhotoStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoStreamComponent, NgIf, HttpClientModule],
      providers: [PhotoStreamService],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
