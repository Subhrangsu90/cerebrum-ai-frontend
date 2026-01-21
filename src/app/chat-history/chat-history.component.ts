import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-history',
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
})
export class ChatHistoryComponent {
  private readonly chatService = inject(ChatService);

  public sessions: string[] = [];
  public loading = true;

  ngOnInit(): void {
    this.loadAllSessions();
  }

  private loadAllSessions(): void {
    this.chatService.getAllChatHistories().subscribe({
      next: (data) => {
        this.sessions = Object.keys(data);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  selectSession(sessionId: string) {
    window.dispatchEvent(
      new CustomEvent('chat-session-selected', {
        detail: sessionId,
      }),
    );
  }
}
