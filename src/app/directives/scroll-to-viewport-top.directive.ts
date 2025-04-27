import { Directive, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appScrollToViewportTop]',
})
export class ScrollToViewportTopDirective {
  @Input() appScrollToViewportTop: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ScrollToViewportTopDirective initialized');
    if (changes['appScrollToViewportTop'] && this.appScrollToViewportTop) {
      this.scrollToViewportTop();
    }
  }

  private scrollToViewportTop(): void {
    window.scrollTo(0, 0); // Scrolls to the top of the viewport
  }
}
