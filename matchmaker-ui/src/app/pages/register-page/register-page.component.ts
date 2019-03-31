import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { RegisterService } from '../../shared/services/register-service/register.service';
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
    protected registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {
    super(injector, dialog);
  }

  ngOnInit() {
    this.userRegisterForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      streetAddress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
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
   /* this.registerService.register(this.f.email.value, this.f.password.value).subscribe(data => {
      if (data) {
        this.goHome();
      } else {
          this.closeDialog();
      }
    }); */
  }
}
}
