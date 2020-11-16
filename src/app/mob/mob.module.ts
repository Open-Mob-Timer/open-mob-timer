import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobComponent } from './mob.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MobComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MobModule { }
