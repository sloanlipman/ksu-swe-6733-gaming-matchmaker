import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/';

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
