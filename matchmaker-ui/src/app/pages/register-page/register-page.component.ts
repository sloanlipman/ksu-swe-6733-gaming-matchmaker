import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { RegisterService } from '../../shared/services/register-service/register.service';
import { LoginService } from '../../shared/services/login-service/login.service';
import { HttpService } from '../../shared/services/http-service/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage extends AppComponent implements OnInit {
  userRegisterForm: FormGroup;
  hide: any;
  submitted: any;
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected loginService: LoginService,
    protected registerService: RegisterService
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.clearEverything();
  }
  get f() {
    return this.userRegisterForm.controls;
  }

  onSubmit(user: User, password: string, confirmPassword: string): void {
    if (password === confirmPassword) {
      this.registerService
        .register(user.email, user.firstName, user.lastName, user.age, user.location.zip, password, confirmPassword)
        .subscribe((data) => {
          if (data) {
            this.handleRegistration(data, password);
          }
        });
    } else {
      this.closeDialog();
    }
  }

  handleRegistration(data: any, password: string) {
    this.loginService.login(data.detail.email, password).subscribe((result) => {
      if (result) {
        this.getUser();
        this.editProfile();
      }
    });
  }
}
