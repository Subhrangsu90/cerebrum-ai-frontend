import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatHistoryComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
