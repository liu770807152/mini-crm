import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEditUserComponent} from "../add-edit-user/add-edit-user.component";

const routes: Routes = [
  // { path: '', component: AddEditUserComponent, data: { title: 'EditUser', breadcrumb: ['Home', 'Edit User'] } },
  // TODO: add canDeactivate
  { path: '', component: AddEditUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserRoutingModule { }
