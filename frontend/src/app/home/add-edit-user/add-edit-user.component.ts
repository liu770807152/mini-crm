import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../services/window-service.service";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  private id: string | null = '';
  minDate: Date;
  maxDate: Date;
  submitted = false;
  formValues: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(20),
    ]],
    gender: ['man'],
    dob: [''],
    age: ['', [Validators.required, Validators.min(1)]],
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
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
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

  // TODO: replace with Axios GET API
  getUserInfo(): void {
    const info = {id: 1, name: 'Mike', job: 'Product Manager', email: 'test@gmail.com', phone: '0489578456'};
    this.formValues.patchValue(info);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formValues.valid) {
      console.log(this.formValues.value)
      if (this.id) {
        // TODO: replace with Axios PUT API
        this.windowService.alert('Edit success!');
        console.log(this.formValues.value);
      } else {
        // TODO: replace with Axios POST API
        this.windowService.alert('Add success!');
        console.log(this.formValues.value);
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }

  // TODO: add canDeactivate()

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
