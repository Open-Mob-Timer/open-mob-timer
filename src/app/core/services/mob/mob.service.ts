import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mob } from '@dtm/shared/models';

@Injectable({
  providedIn: 'root'
})
export class MobService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMob(id: string): Observable<Mob> {
    return this.httpClient.get<Mob>(`api/mobs/${id}`);
  }

  public createMob(mob: Mob): Observable<Mob> {
    return this.httpClient.post<Mob>(`api/mobs`, mob);
  }
}
