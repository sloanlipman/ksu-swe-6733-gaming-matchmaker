import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { RegisterService } from '../../shared/services/register-service/register.service';
import { HttpService } from '../../shared/services/http-service/http.service';

@Component({
  selector: 'register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage extends AppComponent implements OnInit {
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected registerService: RegisterService,

  ) {
    super(injector, dialog);
  }

  ngOnInit() {
  this.registerService.register(
      'test@aaa.com', 'Sloan', 'Lipman', 26, 'password', 'password')
      .subscribe(data => (
        console.log(data)
      ));
  }
}
