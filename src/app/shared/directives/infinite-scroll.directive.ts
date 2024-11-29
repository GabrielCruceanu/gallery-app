import {
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Subject, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Input() scrollOffset = 200;
  @Output() scrolled = new EventEmitter<void>();
  private destroyRef = inject(DestroyRef);
  private el = inject(ElementRef<HTMLElement>);
  private scrollSubject = new Subject<void>();

  constructor() {
    this.scrollSubject
      .pipe(throttleTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.scrolled.emit();
      });
  }

  @HostListener('scroll', ['$event']) onScroll(): void {
    const element = this.el.nativeElement;
    const atBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight <=
      this.scrollOffset;

    if (atBottom) {
      this.scrollSubject.next();
    }
  }
}
