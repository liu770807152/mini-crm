import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../services/window-service.service";
import {AxiosService} from "../../services/axios-server.service";
import User from "../../types/user";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  private id: number;
  minDate: Date;
  maxDate: Date;
  submitted = false;
  formValues: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(20),
    ]],
    job: [''],
    gender: ['man'],
    dob: [''],
    age: [18, [Validators.required, Validators.min(1)]],
    phone: ['', Validators.pattern(/^\({0,1}((0|\+61)([24378])){0,1}\){0,1}(|-){0,1}[0-9]{2}(|-){0,1}[0-9]{2}(|-){0,1}[0-9]{1}(|-){0,1}[0-9]{3}$/)],
    email: ['', [
      Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]],
    brief: ['', Validators.maxLength(100)]
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private axiosService: AxiosService
  ) {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    // Set the minimum to January 1st 80 years in the past and December 31st in this year.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear, 11, 31);
  }

  ngOnInit(): void {
    if (this.id) {
      this.getUserInfo();
    }
  }

  getTitle(): string {
    return this.id ? 'Edit User Panel' : 'Add User Panel';
  }

  getUserInfo(): void {
    // @ts-ignore
    this.axiosService.getUserById(this.id).then((res: User) => {
      this.formValues.patchValue(res);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    const data = this.formValues.value;
    data.dob = dayjs(data.dob).format('YYYY-MM-DD');
    if (this.formValues.valid) {
      if (this.id) {
        // @ts-ignore
        this.axiosService.updateUser(data, this.id).then((res: number) => {
          if (res === 1) {
            this.windowService.alert('Edit success!');
          }
        });
      } else {
        // @ts-ignore
        this.axiosService.addNewUser(data).then((res: number) => {
          if (res === 1) {
            this.windowService.alert('Add success!');
          }
        });
      }
    }
  }

  Cancel(): void {
    this.router.navigate(['/home']);
  }

  canDeactivate() {
    if (this.formValues.dirty && !this.submitted) {
      return confirm('Data is not saved yet. Still want to leave?');
    }
    return true;
  }

  get formControls() {
    const controls = {
      name: this.formValues.get('name'),
      age: this.formValues.get('age'),
      phone: this.formValues.get('phone'),
      email: this.formValues.get('email'),
      brief: this.formValues.get('brief')
    }
    return {
      name: {
        control: controls.name,
        showErr: controls.name?.touched && controls.name.invalid,
        errors: controls.name?.errors
      },
      age: {
        control: controls.age,
        showErr: controls.age?.touched && controls.age.invalid,
        errors: controls.age?.errors
      },
      phone: {
        control: controls.phone,
        showErr: controls.phone?.touched && controls.phone.invalid,
        errors: controls.phone?.errors
      },
      email: {
        control: controls.email,
        showErr: controls.email?.touched && controls.email.invalid,
        errors: controls.email?.errors
      },
      brief: {
        control: controls.brief,
        showErr: controls.brief?.touched && controls.brief.invalid,
        errors: controls.brief?.errors
      },
    }
  }

}
