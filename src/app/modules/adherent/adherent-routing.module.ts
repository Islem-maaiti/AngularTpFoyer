import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdherantLayoutComponent } from './adherant-layout/adherant-layout.component';

import { ReservationComponent } from './Views/reservation/reservation.component';
import { BlocComponent } from './Views/bloc/bloc.component';

const routes: Routes = [
  {
    path: '',
    component: AdherantLayoutComponent,
    children: [
      {path: 'Reservation',component: ReservationComponent},
      {path: 'Bloc',component: BlocComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdherentRoutingModule {}
