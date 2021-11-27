import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TicketComponent } from './ticket/ticket.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tickets', component: ViewerComponent },
  { path: 'tickets/:id', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
