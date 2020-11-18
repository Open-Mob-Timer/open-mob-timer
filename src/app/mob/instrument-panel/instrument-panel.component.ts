import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from '@dtm/core/services';
import { User } from '@dtm/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Mob } from '@dtm/shared/models';

@Component({
  selector: 'mob-timer-instrument-panel',
  templateUrl: './instrument-panel.component.html',
  styleUrls: ['./instrument-panel.component.scss']
})
export class InstrumentPanelComponent implements OnInit, OnChanges {
  @Input() public mob: Mob;
  @Input() public timeRemaining: string;

  public userForm: FormGroup;

  constructor(
    private usersService: UsersService
  ) { }

  public ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)])
    }, { updateOn: 'change' });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.timeRemaining?.currentValue) {
      this.timeRemaining = changes.timeRemaining.currentValue;
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
}
