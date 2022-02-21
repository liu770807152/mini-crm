import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class UserDetailModule { }
