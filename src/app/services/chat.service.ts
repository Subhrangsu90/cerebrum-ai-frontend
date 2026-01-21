import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { CHAT_API } from '../api/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly baseUrl = environment.baseUrl;
  private http: HttpClient = inject(HttpClient);

  // Ask question API
  askQuestion(
    question: string,
    sessionId: string,
  ): Observable<{ question: string; answer: string }> {
    const url = `${this.baseUrl}${CHAT_API.ASK}`;

    return this.http.post<{ question: string; answer: string }>(url, {
      question,
      sessionId,
    });
  }

  // Get single session chat history
  getSessionHistory(sessionId: string): Observable<{
    sessionId: string;
    history: { role: 'user' | 'assistant'; content: string }[];
  }> {
    const url = `${this.baseUrl}${CHAT_API.HISTORY}/${sessionId}`;

    return this.http.get<{
      sessionId: string;
      history: { role: 'user' | 'assistant'; content: string }[];
    }>(url);
  }

  // Get all chat histories
  getAllChatHistories(): Observable<
    Record<string, { role: 'user' | 'assistant'; content: string }[]>
  > {
    const url = `${this.baseUrl}${CHAT_API.ALL_HISTORY}`;

    return this.http.get<
      Record<string, { role: 'user' | 'assistant'; content: string }[]>
    >(url);
  }
}
