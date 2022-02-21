import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {AddEditUserComponent} from "../home/add-edit-user/add-edit-user.component";

@Injectable({
  providedIn: 'root'
})
export class UserCanDeactivateGuardService implements CanDeactivate<AddEditUserComponent>{
  canDeactivate(
    component: AddEditUserComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return component.canDeactivate();
  }
}
