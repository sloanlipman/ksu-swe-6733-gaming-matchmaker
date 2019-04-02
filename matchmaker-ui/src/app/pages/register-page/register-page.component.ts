import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { RegisterService } from '../../shared/services/register-service/register.service';
import { LoginService } from '../../shared/services/login-service/login.service';
import { HttpService } from '../../shared/services/http-service/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage extends AppComponent implements OnInit {
  userRegisterForm: FormGroup;
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected loginService: LoginService,
    protected registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });

    }
  get f() { return this.userRegisterForm.controls; }

  onSubmit(): void {
    if (this.userRegisterForm.invalid) {
      this.registerService.handleError('Please fill in all required fields and try again');
    } else {
    this.showLoading();
    this.registerService.register(
      this.f.email.value,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.age.value,
      this.f.zip.value,
      this.f.password.value,
      this.f.confirmPassword.value).subscribe(data => {
      if (data) {
        if (data === 'Password Error') {
          this.closeDialog();
        } else if (data.detail.email === this.f.email.value) {
          this.loginService.login(data.detail.email, this.f.password.value).subscribe(result => {
            if (result) {
              this.goHome();
            } else {
                this.closeDialog();
              }
          });
          // TODO need to add checks to see if the user's profile is completed.
          // If there are no interests present, navigate to edit profile page.
        }
      } else {
          this.closeDialog();
      }
    });
  }
}
}
