import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MobService, DesktopNotificationService, UsersSocketService, UsersService } from '@dtm/core/services';
import { Mob } from '@dtm/models';
import { User } from '@dtm/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mob-timer-mob',
  templateUrl: './mob.component.html',
  styleUrls: ['./mob.component.scss']
})
export class MobComponent implements OnInit, OnDestroy {
  public mob: Mob = {name: 'test'}; // temp
  public mobLink: string;
  public timeRemaining = '0:00';
  private subscriptions$: Array<Subscription> = [];

  constructor(
    private route: ActivatedRoute,
    private mobService: MobService,
    private usersService: UsersService,
    private usersSocketService: UsersSocketService,
    private desktopNotificationService: DesktopNotificationService
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersSocketService.setupSocketConnection(id);

    this.mobService.getMob(id).subscribe((res: Mob) => {
      if (res.id) {
        this.mob = res;

        this.setTimeRemaining();
        this.addSocketListeners();
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions$.forEach(x => x.unsubscribe());
  }

  public addSocketListeners(): void {
    this.subscriptions$.push(
      this.usersSocketService.on('user-added').subscribe((user: User) => {
        this.mob.users.push(user);
      })
    );

    this.subscriptions$.push(
      this.usersSocketService.on('user-updated').subscribe((user: User) => {
        const index = this.mob.users.findIndex(x => x.id === user.id);
        this.mob.users[index] = user;

        this.setTimeRemaining();
      })
    );

    this.subscriptions$.push(
      this.usersSocketService.on('user-timer-ended').subscribe((user: User) => {
        const index = this.mob.users.findIndex(x => x.id === user.id);
        this.mob.users[index] = user;
        this.timeRemaining = '0:00';

        this.desktopNotificationService.notify(`Your turn is over, ${user.name}! Click START for the next mobster.`);
      })
    );

    this.subscriptions$.push(
      this.usersSocketService.on('user-deleted').subscribe((user: User) => {
        this.mob.users = this.mob.users.filter(x => x.id !== user.id);
      })
    );
  }

  public setTimeRemaining(): void {
    const index = this.mob.users.findIndex(x => x.turnEndsAt);
    const user = this.mob.users[index];

    if (!user) {
      this.timeRemaining = '0:00';

      return;
    }

    const currentDate = Date.now();
    const diff = new Date(user.turnEndsAt).getTime() - currentDate;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    let secondsInMinute: number | string = Math.floor(seconds - (minutes * 60));

    if (secondsInMinute < 10) {
      secondsInMinute = `0${secondsInMinute.toString()}`;
    }

    this.timeRemaining = `${minutes}:${secondsInMinute}`;

    if (diff > 0) {
      setTimeout(() => this.setTimeRemaining(), 1000);
    } else {
      this.expireTurn(index);
    }
  }

  private expireTurn(index: number): void {
    this.usersService.expireTurn(this.mob.users[index]).subscribe();
  }
}
