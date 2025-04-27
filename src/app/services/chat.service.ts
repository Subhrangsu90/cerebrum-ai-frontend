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

  askQuestion(
    question: string,
    sessionId: string
  ): Observable<{ question: string; answer: string }> {
    const url = `${this.baseUrl}${CHAT_API.ASK}`;
    return this.http.post<{ question: string; answer: string }>(url, {
      question,
      sessionId,
    });
  }
}
