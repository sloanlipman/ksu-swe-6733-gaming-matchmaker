import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends AppComponent implements OnInit {
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog
  ) {
    super(injector, dialog);
  }

  ngOnInit() {}
  submitChanges() {
    this.router.navigateByUrl('/home');
  }

/*  existingUser(){
    // TODO
    // if no user interests, return false
    // else return true
    return true;
  } */
}
