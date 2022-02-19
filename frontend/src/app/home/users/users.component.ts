import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

export interface User {
  id: number;
  name: string;
  job: string;
  email: string;
  phone: string;
}

export interface SearchParams {
  name: string;
  job: string;
  email: string;
}

const TEMP_DATA: User[] = [
  {id: 1, name: 'Mike', job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456'},
  {id: 2, name: 'Ben', job: 'Sales', email: 'test@gmail.com', phone: '0489578456'},
  {id: 3, name: 'Simons', job: 'Receptionist', email: 'test@gmail.com', phone: '0489578456'},
  {id: 4, name: 'Anthony', job: 'Scholar', email: 'test@gmail.com', phone: '0489578456'},
  {id: 5, name: 'Will', job: 'Professor', email: 'test@gmail.com', phone: '0489578456'},
  {id: 6, name: 'Smith', job: 'Teacher', email: 'test@gmail.com', phone: '0489578456'},
  {id: 7, name: 'John', job: 'Accountant', email: 'test@gmail.com', phone: '0489578456'},
  {id: 8, name: 'Johnson', job: 'Engineer', email: 'test@gmail.com', phone: '0489578456'},
  {id: 9, name: 'livingston', job: 'Business Owner', email: 'test@gmail.com', phone: '0489578456'},
  {id: 10, name: 'Berkley', job: 'Driver', email: 'test@gmail.com', phone: '0489578456'},
  {id: 11, name: 'Kimberly', job: 'Chef', email: 'test@gmail.com', phone: '0489578456'},
  {id: 12, name: 'June', job: 'Bartender', email: 'test@gmail.com', phone: '0489578456'},
  {id: 13, name: 'Annie', job: 'Policeman', email: 'test@gmail.com', phone: '0489578456'},
  {id: 14, name: 'Jose', job: 'Fireman', email: 'test@gmail.com', phone: '0489578456'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchParams: SearchParams = {
    name: '',
    job: '',
    email: ''
  }
  displayedColumns: string[] = ['name', 'job', 'email', 'phone', 'operation'];
  userList: User[] = [];
  showSpin: boolean = false;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.showSpin = true;
    this.getList();
  }

  getList(): void {
    setTimeout(() => {
      this.userList = TEMP_DATA;
      this.showSpin = false;
    }, 1000);
  }

  goToDetail(user: User): void {
    this.route.navigate(['user-detail', user.id]);
  }

  goToEdit(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.route.navigate(['/edit-user', id]);
  }

  // TODO: Implement search
  search(): void {
    console.log(this.searchParams);
    this.getList();
  }

  // TODO: Implement reset
  reset(): void {
    this.searchParams = {
      name: '',
      job: '',
      email: '',
    };
    this.getList();
  }

  // TODO: Implement delete
  deleteUser(id: number, event: MouseEvent): void {
    event.stopPropagation();
    console.log('delete');
  }
}
