import { Component } from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material/';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPage {
  constructor(
    public dialogRef: MatDialogRef<ContactPage>
  ) {}
}
