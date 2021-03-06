import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Router } from '@angular/router';
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
export class LoginPage extends AppComponent implements OnInit {
  userLoginForm: FormGroup;
  submitted: any;
  hide: any;
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
    this.clearEverything();
    this.userLoginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  }

  get f() { return this.userLoginForm.controls; }

  onSubmit(): void {
    if (this.userLoginForm.invalid) {
      this.loginService.handleError('Please fill in all required fields and try again');
    } else {
      this.showLoading();
      this.loginService.login(this.f.email.value, this.f.password.value).subscribe(data => {
        if (data) {
          if (
            (data.interests && data.interests.length === 0) ||
            (data.priorities && data.priorities.length === 0) ||
            (data.times && data.times.length === 0) ||
            (data.genres && data.genres.length === 0)
            ) {
            this.editProfile();
          } else {
            this.goHome();
          }
        } else {
            this.closeDialog();
          }
      });
    }
  }
}
