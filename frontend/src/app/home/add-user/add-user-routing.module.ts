import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEditUserComponent} from "../add-edit-user/add-edit-user.component";

const routes: Routes = [
  // move data to home-routing, otherwise Home cannot get the data
  // { path: '', component: AddEditUserComponent, data: { title: 'AddUser', breadcrumb: ['Home', 'Add User'] } },
  // TODO: add canDeactivate
  { path: '', component: AddEditUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserRoutingModule { }
