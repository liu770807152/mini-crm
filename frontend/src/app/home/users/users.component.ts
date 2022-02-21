import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TrimStringService} from "../../services/trim-string.service";

export interface User {
  id: number;
  name: string;
  age: number;
  dob?: string;
  job?: string;
  email: string;
  phone?: string;
  gender?: string;
  brief?: string;
}

export interface SearchParams {
  name: string;
  job: string;
  email: string;
}

const TEMP_DATA: User[] = [
  {id: 1, name: 'Mike dqwdqqwqwqwdq', age: 12, job: 'Product Manager aaaaaaaaaaaa', email: 'test@gmail.comdsddqwdqqwdq', phone: '0489578456', gender: 'other'},
  {id: 2, name: 'Mike', age: 1, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'man'},
  {id: 3, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'woman'},
  {id: 4, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'man'},
  {id: 5, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'woman'},
  {id: 6, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'woman'},
  {id: 7, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'other'},
  {id: 8, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'other'},
  {id: 9, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'secret'},
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
  // @ts-ignore
  innerWidth: number;
  showSpin: boolean = false;
  constructor(private route: Router, private trimService: TrimStringService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.showSpin = true;
    this.getRange();
    this.getList();
  }

  trim(str: string): string {
    return this.trimService.trim(str, this.getRange());
  }

  getRange(): number {
    if (this.innerWidth <= 400) {
      return 12;
    } else if (this.innerWidth <= 820) {
      return 16;
    }
    return 35;
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
