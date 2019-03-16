import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutPage{
  constructor(
    public dialogRef: MatDialogRef<''>
  ) {}
}
