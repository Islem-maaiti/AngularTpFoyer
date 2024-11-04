import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdherentRoutingModule } from './adherent-routing.module';
import { AdherantLayoutComponent } from './adherant-layout/adherant-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationComponent } from './Views/reservation/reservation.component';
import { BlocComponent } from './Views/bloc/bloc.component';

@NgModule({
  declarations: [ AdherantLayoutComponent, ReservationComponent, BlocComponent],
  imports: [CommonModule, AdherentRoutingModule , FormsModule , ReactiveFormsModule],
})
export class AdherentModule {}
