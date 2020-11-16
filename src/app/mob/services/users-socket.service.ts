import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '@dtm/environment';
import { User } from '@dtm/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersSocketService {
  private socket: any;

  constructor() { }

  public setupSocketConnection(id: string): void {
    this.socket = io();

    this.socket.on('connect', (data) => {
      this.socket.emit('join-room', id);
    });
  }

  public emit(message: string, user: User): void {
    this.socket.emit(message, user);
  }

  public on(event: string): Observable<User> {
    return new Observable<User>(observer => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
