import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import { HomeComponent } from './home.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UsersModule} from "./users/users.module";
import {RouterModule} from "@angular/router";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {UserDetailModule} from "./user-detail/user-detail.module";



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
    UserDetailModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
