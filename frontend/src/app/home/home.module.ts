import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import { HomeComponent } from './home.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UsersModule} from "./users/users.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HomeComponent,
    AddEditUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    UsersModule,
  ]
})
export class HomeModule { }
