import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [ { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
 { path: 'registration', component: UserRegistrationComponent },];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
