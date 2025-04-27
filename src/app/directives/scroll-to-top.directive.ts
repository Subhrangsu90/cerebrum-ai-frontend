import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appScrollToTop]',
})
export class ScrollToTopDirective {
  @Input() appScrollToTop: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appScrollToTop'] && this.appScrollToTop) {
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    const element = this.el.nativeElement;
    if (element) {
      element.scrollTop = 0; // Scroll to the top of the element
    }
  }
}
