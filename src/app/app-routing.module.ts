import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'Foyer', pathMatch: 'full' },
  {
    path: 'Foyer',
    loadChildren: () =>
      import('./modules/adherent/adherent.module').then(
        (m) => m.AdherentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
