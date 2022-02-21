import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../services/window-service.service";
import {User} from "../users/users.component";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  id: string | null;
  userInfo: User | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private windowService: WindowService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.getUserInfo();
    }
  }

  // TODO: replace with Axios GET API
  getUserInfo(): void {
    const info = {id: 1, name: 'Mike', age: 12, job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456', gender: 'other', dob: new Date()};
    this.userInfo = {
      ...info,
      dob: dayjs(info.dob).format('DD/MM/YYYY')
    };
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
