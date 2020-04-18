import { Location } from '@angular/common';
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/shared/services/login-service/login.service';

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

  get f() {
    return this.userLoginForm.controls;
  }

  onSubmit(email: string, password: string): void {
    this.loginService.login(email, password).subscribe((data) => {
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
      }
    });
  }
}
