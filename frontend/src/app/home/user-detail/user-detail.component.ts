import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../services/window-service.service";
import * as dayjs from "dayjs";
import User from "../../types/user";
import {AxiosService} from "../../services/axios-server.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: number;
  userInfo: User | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private axiosService: AxiosService,
  ) {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id')) ;
  }

  ngOnInit(): void {
    if (this.id) {
      this.getUserInfo();
    }
  }

  getUserInfo(): void {
    // @ts-ignore
    this.axiosService.getUserById(this.id).then((res: User) => {
      const dob = dayjs(res.dob).format('DD/MM/YYYY');
      this.userInfo = {
        ...res,
        dob
      };
    })

  }

  deleteUser(): void {
    const isDeleted = this.windowService.confirm('Confirm to delete?');
    if (isDeleted)
      this.router.navigate(['/home']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToEditUser(): void {
    this.router.navigate(['/edit-user', this.id]);
  }

}
