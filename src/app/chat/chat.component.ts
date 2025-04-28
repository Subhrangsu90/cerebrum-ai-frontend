import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { v4 as uuidv4 } from 'uuid';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TextareaModule } from 'primeng/textarea';
import { ChatService } from '../services/chat.service';
import { AutoWrapCodeDirective } from '../directives/auto-wrap-code.directive';
import { ChatMessage } from '../interfaces/chat-message';
import { Source } from '../interfaces/source';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    MarkdownComponent,
    ButtonModule,
    AutoWrapCodeDirective,
    DrawerModule,
    TextareaModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  public greetingMessage: string = '';
  public question: string = '';
  public chatHistory: ChatMessage[] = [];
  public loading: boolean = false;
  private sessionId = uuidv4();
  public isVisible: boolean = false;
  public sources: Source[] = [];
  public shouldScrollToViewportTop: boolean = false;
  public maxTextareaHeight: number = 200;

  private readonly elRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly chatService: ChatService = inject(ChatService);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  @ViewChild('textareaElement') textareaRef!: ElementRef<HTMLTextAreaElement>;

  ngOnInit(): void {
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greetingMessage = 'Good morning!';
    } else if (hours < 18) {
      this.greetingMessage = 'Good afternoon!';
    } else {
      this.greetingMessage = 'Good evening!';
    }
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  public ask() {
    const trimmedQuestion = this.question.trim();
    if (!trimmedQuestion) return;

    const currentQuestion = trimmedQuestion;
    this.question = '';
    this.loading = true;
    // Push temporary loading message
    const newMessage: ChatMessage = {
      question: currentQuestion,
      loading: true,
    };
    this.chatHistory.push(newMessage);
    // this.shouldScrollToViewportTop = true;
    setTimeout(() => {
      const lastMessageElement = document.querySelector(
        '.chat-entry:last-child .chat-question'
      );
      if (lastMessageElement) {
        console.log('Scrolling to last message element:', lastMessageElement);

        lastMessageElement.scrollIntoView();
      }
    }, 0);

    // this.scrollToTop();
    this.chatService.askQuestion(currentQuestion, this.sessionId).subscribe({
      next: (res) => {
        // Update the last message
        const lastMessage = this.chatHistory[this.chatHistory.length - 1];
        lastMessage.answer = res.answer;
        lastMessage.loading = false;
        this.loading = false;
        // this.shouldScrollToViewportTop = false;
        setTimeout(() => {
          const lastMessageElement = document.querySelector(
            '.chat-entry:last-child .chat-question'
          );
          if (lastMessageElement) {
            console.log(
              'Scrolling to last message element:',
              lastMessageElement
            );
            lastMessageElement.scrollIntoView();
          }
        }, 0);
      },
      error: (err) => {
        console.error('❌ Chat API error:', err);
        const lastMessage = this.chatHistory[this.chatHistory.length - 1];
        lastMessage.answer =
          'Sorry, I could not find an answer to your question.';
        lastMessage.loading = false;
        this.loading = false;
        // this.shouldScrollToViewportTop = false;
      },
    });
  }

  public onMarkdownRendered(): void {
    const nativeElement = this.elRef.nativeElement;
    const buttons = nativeElement.querySelectorAll('.source-btn');
    buttons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        this.sources = [];
        this.extractSources();
        this.isVisible = true;
      });
    });
  }

  private extractSources(): void {
    const nativeElement = this.elRef.nativeElement;
    const sourceLinks = nativeElement.querySelectorAll('.link');

    sourceLinks.forEach((link: any) => {
      this.sources.push({
        href: link.getAttribute('href'),
        title: link.getAttribute('title'),
        icon: link.getAttribute('data-icon'),
        snippet: link.getAttribute('data-snippet'),
      });
    });
  }

  enforceMaxHeight() {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    if (textarea.scrollHeight > this.maxTextareaHeight) {
      textarea.style.height = this.maxTextareaHeight + 'px';
      textarea.style.overflowY = 'auto';
    }
  }
}
