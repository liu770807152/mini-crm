import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {UsersComponent} from "./users.component";
import {RouterModule} from "@angular/router";
import {SpinComponent} from "../spin/spin.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  declarations: [UsersComponent, SpinComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    FlexLayoutModule
  ]
})
export class UsersModule { }
