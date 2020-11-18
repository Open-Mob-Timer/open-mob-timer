import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@dtm/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`api/users`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`api/users/${user.id}`, user);
  }

  public toggleTurn(user: User): Observable<User> {
    return this.httpClient.put<User>(`api/users/${user.id}/toggle`, user);
  }

  public expireTurn(user: User): Observable<User> {
    return this.httpClient.put<User>(`api/users/${user.id}/expireturn`, user);
  }

  public deleteUser(user: User): Observable<any> {
    return this.httpClient.request<any>('delete', `api/users/${user.id}`, { body: user });
  }
}
