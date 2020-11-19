import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MobService } from '@dtm/core/services';
import { Router } from '@angular/router';
import { Mob } from '@dtm/shared/models';
import { DesktopNotificationService } from '@dtm/core/services';

@Component({
  selector: 'mob-timer-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public mobForm: FormGroup;
  public isSubmitting: boolean;

  constructor(
    private router: Router,
    private mobService: MobService,
    private desktopNotificationService: DesktopNotificationService
  ) { }

  public ngOnInit(): void {
    this.desktopNotificationService.requestPermission();
    this.mobForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    }, { updateOn: 'change' });
  }

  public createNewMob(): void {
    if (this.mobForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.mobService.createMob({ name: this.mobForm.value.name }).subscribe((res: Mob) => {
      if (res.id) {
        this.router.navigate([res.id]);
      }

      this.mobForm.reset();
      this.isSubmitting = false;
    });
  }
}
