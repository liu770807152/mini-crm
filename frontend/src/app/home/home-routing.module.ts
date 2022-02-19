import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users/users.component';
import {UserDetailComponent} from "./user-detail/user-detail.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'HomePage' },
    children: [
      {
        path: 'home',
        component: UsersComponent,
        data: { title: 'UserList', breadcrumb: ['Home', 'User List'] }
      },
      {
        path: 'add-user',
        loadChildren: () => import('./add-user/add-user.module').then(m => m.AddUserModule),
        data: { title: 'AddUser', breadcrumb: ['Home', 'Add User'] }
      },
      {
        path: 'edit-user/:id',
        loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserModule),
        data: { title: 'EditUser', breadcrumb: ['Home', 'Edit User'] }
      },
      {
        path: 'user-detail/:id',
        component: UserDetailComponent,
        data: { title: 'UserDetail', breadcrumb: ['Home', 'User Detail'] }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
