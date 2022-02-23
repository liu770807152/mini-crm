import { Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TrimStringService} from "../../services/trim-string.service";
import User from "../../types/user";
import SearchParams from "../../types/search";
import {AxiosService} from "../../services/axios-server.service";


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
  constructor(private route: Router, private trimService: TrimStringService, private axiosService: AxiosService) { }

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
    // @ts-ignore
    this.axiosService.getAllUsers().then((res: User[]) => {
      this.userList = res;
      this.showSpin = false;
    });
  }

  goToDetail(user: User): void {
    this.route.navigate(['user-detail', user.id]);
  }

  goToEdit(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.route.navigate(['/edit-user', id]);
  }

  search(): void {
    this.showSpin = true;
    const filter = Object.fromEntries(Object.entries(this.searchParams).filter(([_, v]) => v != ''));
    console.log(filter);
    // @ts-ignore
    this.axiosService.getUsersBySearchParams(this.searchParams).then((res: User[]) => {
      this.showSpin = false;
      this.userList = res;
    })
  }

  reset(): void {
    this.searchParams = {
      name: '',
      job: '',
      email: '',
    };
    this.getList();
  }

  deleteUser(id: number, event: MouseEvent): void {
    event.stopPropagation();
    // @ts-ignore
    this.axiosService.deleteOneUser(id).then((res: number) => {
      if (res === 1) {
        this.getList();
      }
    });
  }
}
