import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToLogin() {
    this.router.navigateByUrl('/login-page');
  }
}
