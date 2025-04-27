import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  imports: [],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.scss',
})
export class CopyButtonComponent {
  @Input() codeText: string = ''; // Input to pass the code to be copied
  buttonText: string = 'Copy Code';

  copyCode() {
    navigator.clipboard.writeText(this.codeText).then(() => {
      this.buttonText = 'Copied!';

      setTimeout(() => {
        this.buttonText = 'Copy Code';
      }, 1500);
    });
  }
}
