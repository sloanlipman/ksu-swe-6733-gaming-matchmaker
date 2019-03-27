import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { RegisterService } from 'src/app/shared/services/register-service/register.service';

@Component({
  selector: 'register',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPage extends AppComponent implements OnInit {
  registerService: RegisterService;
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
    super(injector, dialog);
  }

  ngOnInit() {}
}
