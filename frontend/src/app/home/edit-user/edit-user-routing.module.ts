import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddEditUserComponent} from "../add-edit-user/add-edit-user.component";
import {UserCanDeactivateGuardService} from "../../services/user-can-deactivate-guard.service";

const routes: Routes = [
  { path: '', component: AddEditUserComponent, canDeactivate: [UserCanDeactivateGuardService], }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserRoutingModule { }
