import { TestBed } from '@angular/core/testing';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { ElementRef } from '@angular/core';

describe('InfiniteScrollDirective', () => {
  let directive: InfiniteScrollDirective;
  let mockElementRef: ElementRef<{
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
  }>;

  beforeEach(() => {
    const mockElement = {
      nativeElement: {
        scrollHeight: 500,
        scrollTop: 200,
        clientHeight: 100,
      },
    };

    mockElementRef = new ElementRef(mockElement.nativeElement);

    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        InfiniteScrollDirective,
      ],
      imports: [InfiniteScrollDirective],
    });

    directive = TestBed.inject(InfiniteScrollDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit scrolled event when at bottom', () => {
    const spy = spyOn(directive.scrolled, 'emit');
    mockElementRef.nativeElement.scrollHeight = 300;
    mockElementRef.nativeElement.scrollTop = 200;
    mockElementRef.nativeElement.clientHeight = 100;
    directive.scrollOffset = 0;

    directive.onScroll();

    expect(spy).toHaveBeenCalled();
  });

  it('should not emit scrolled event when not at bottom', () => {
    const spy = spyOn(directive.scrolled, 'emit');
    mockElementRef.nativeElement.scrollHeight = 500;
    mockElementRef.nativeElement.scrollTop = 100;
    mockElementRef.nativeElement.clientHeight = 200;
    directive.scrollOffset = 50;

    directive.onScroll();

    expect(spy).not.toHaveBeenCalled();
  });
});
