import { Component, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDialogRef } from '@angular/material/';
import { take } from 'rxjs/operators';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPage {
  constructor(public dialogRef: MatDialogRef<ContactPage>, private ngZone: NgZone) {}

  @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
