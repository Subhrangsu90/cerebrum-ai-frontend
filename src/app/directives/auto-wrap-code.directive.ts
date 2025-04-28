import {
  AfterViewChecked,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAutoWrapCode]',
})
export class AutoWrapCodeDirective implements AfterViewChecked {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewChecked() {
    const preElements = this.el.nativeElement.querySelectorAll('pre');

    preElements.forEach((pre: HTMLElement) => {
      // Avoid wrapping again
      const alreadyWrapped =
        pre.parentElement?.classList.contains('code-wrapper');
      if (alreadyWrapped) return;

      // Create wrapper and header
      const wrapper = this.renderer.createElement('div');
      this.renderer.addClass(wrapper, 'code-wrapper');

      const header = this.renderer.createElement('div');
      this.renderer.addClass(header, 'code-header');

      const codeType = this.renderer.createElement('span');
      this.renderer.addClass(codeType, 'code-type');

      const languageClass = Array.from(pre.classList).find((className) =>
        className.startsWith('language-')
      );
      const languageType = languageClass
        ? languageClass.replace('language-', '')
        : 'code';

      this.renderer.setProperty(codeType, 'innerText', languageType);

      // Create and append the copy icon
      const copyIcon = this.renderer.createElement('span');
      this.renderer.addClass(copyIcon, 'copy-icon');
      copyIcon.innerHTML = `<i class="pi pi-copy" style="font-size: 0.8rem"></i> Copy`; // Initial state with "Copy"

      this.renderer.appendChild(header, codeType);
      this.renderer.appendChild(header, copyIcon);

      // Attach the click event for copying code
      this.renderer.listen(copyIcon, 'click', () =>
        this.copyCode(pre, copyIcon)
      );

      this.renderer.appendChild(wrapper, header);

      // Move pre into wrapper
      const parent = pre.parentNode;
      this.renderer.insertBefore(parent, wrapper, pre);
      this.renderer.removeChild(parent, pre);
      this.renderer.appendChild(wrapper, pre);
    });
  }
  private copyCode(pre: HTMLElement, copyIcon: HTMLElement): void {
    const codeText = pre.innerText;

    // Create a temporary text area to copy the code text
    const textArea = document.createElement('textarea');
    textArea.value = codeText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Change the icon and text after copying
    this.renderer.setProperty(
      copyIcon,
      'innerHTML',
      `<i class="pi pi-check" style="font-size: 0.8rem"></i> Copied!`
    );

    // Reset after 2 seconds
    setTimeout(() => {
      this.renderer.setProperty(
        copyIcon,
        'innerHTML',
        `<i class="pi pi-copy" style="font-size: 0.8rem"></i> Copy`
      );
    }, 2000);
  }
}
