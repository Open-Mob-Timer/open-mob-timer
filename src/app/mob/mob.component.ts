import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MobService } from '@dtm/core/services';
import { Mob } from '@dtm/models';
import { UsersService } from './services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '@dtm/shared/models/user.model';
import { UsersSocketService } from './services/users-socket.service';
import { Subscription } from 'rxjs';
import { DesktopNotificationService } from '@dtm/core/services';

@Component({
  selector: 'mob-timer-mob',
  templateUrl: './mob.component.html',
  styleUrls: ['./mob.component.scss']
})
export class MobComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  public mob: Mob;
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
    this.mobLink = document.location.href;
    this.usersSocketService.setupSocketConnection(id);

    this.mobService.getMob(id).subscribe((res: Mob) => {
      if (res.id) {
        this.mob = res;

        this.setTimeRemaining();
        this.addSocketListeners();
      }
    });

    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    }, { updateOn: 'change' });
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
      this.usersSocketService.on('user-deleted').subscribe((user: User) => {
        this.mob.users = this.mob.users.filter(x => x.id !== user.id);
      })
    );
  }

  public copyLink(): void {
    const event = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.mobLink);
      e.preventDefault();
    };
    document.addEventListener('copy', event);
    document.execCommand('copy');
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
      this.desktopNotificationService.notify(`Your turn is over, ${user.name}! Click START for the next mobster.`);
      this.toggleTurn(index);
    }
  }

  public addUser(): void {
    const user: User = {
      name: this.userForm.value.name,
      mobId: this.mob.id
    };
    this.usersService.addUser(user).subscribe(() => {
      this.userForm.reset();
    });
  }

  public removeUser(index: number): void {
    this.usersService.deleteUser(this.mob.users[index]).subscribe();
  }

  public toggleIsAway(index): void {
    const user = this.mob.users[index];
    user.isAway = !user.isAway;
    this.usersService.updateUser(user).subscribe();
  }

  public toggleTurn(index: number): void {
    this.usersService.toggleTurn(this.mob.users[index]).subscribe();
  }
}
