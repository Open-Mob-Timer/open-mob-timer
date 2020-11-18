import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobComponent } from './mob.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@dtm/shared/shared.module';
import { UsersComponent } from './users/users.component';
import { InstrumentPanelComponent } from './instrument-panel/instrument-panel.component';

@NgModule({
  declarations: [MobComponent, UsersComponent, InstrumentPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class MobModule { }
