import { Component, Input, OnInit } from '@angular/core';
import { UsersService, UsersSocketService } from '@dtm/core/services';
import { User } from '@dtm/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mob-timer-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @Input() public users: Array<User>;

  constructor(
    private usersService: UsersService
  ) { }

  public removeUser(index: number): void {
    this.usersService.deleteUser(this.users[index]).subscribe();
  }

  public toggleIsAway(index): void {
    const user = this.users[index];
    user.isAway = !user.isAway;
    this.usersService.updateUser(user).subscribe();
  }

  public toggleTurn(index: number): void {
    this.usersService.toggleTurn(this.users[index]).subscribe();
  }
}
