import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPage } from '../landing-page/landing-page.component';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPageComponent extends AppComponent implements OnInit {
  userLoginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
     super(injector, dialog);
  }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   // this.authenticateCredentials('admin@aaa.com', 'admin');
  }

  get f() { return this.userLoginForm.controls; }

  onSubmit(): void {
    if (this.userLoginForm.valid) {
      this.submitted = true;

      // TODO add a loading indicator

      // stop here if form is invalid
      if (this.userLoginForm.invalid) {
          return;
      }
      this.loginService.login(this.f.email.value, this.f.password.value).subscribe(data => {
        if (data) {
          this.goHome();
        } else {
          console.log('Error');
        }
        });
      }
    }
  }

