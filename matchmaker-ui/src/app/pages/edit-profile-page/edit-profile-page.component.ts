import { Location } from '@angular/common';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatDialog, MatSelectionList } from '@angular/material';
import { EditProfileService } from '../../shared/services/edit-profile-service/edit-profile.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends AppComponent implements OnInit {
  interestsBoxes: FormControl;
  infoForm: FormGroup;
  currentUserInterests = [];
  allInterests = JSON.parse(localStorage.getItem('interests'));

  favoriteGenres: string[] = ['FPS', 'RPG', 'Battle Arena', 'Action', 'RTS', 'Sports Simulation', 'MMORPG', 'Fighting', 'Tactical RPG',
  'RTT'];

  gamesPlayed: string[] = ['Fortnite', 'Call of Duty', 'Coutner Strike', 'FIFA', 'DOOM', 'Grand Theft Auto', 'Assasins Creed', 'Mario Bros',
  'Super Smash Borthers'];

  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected editProfileService: EditProfileService,
    private formBuilder: FormBuilder
  ) {
    super(injector, dialog);
  }

  getFormControls() {
    this.infoForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    this.interestsBoxes = new FormControl();
  }

  setFormControls() {
    this.currentUserInterests = this.currentUser.interests;
    this.infoForm.controls.firstName.setValue(this.currentUser.firstName);
    this.infoForm.controls.lastName.setValue(this.currentUser.lastName);
    this.infoForm.controls.age.setValue(this.currentUser.age);
    this.infoForm.controls.zip.setValue(this.currentUser.location.zip);
    this.infoForm.controls.email.setValue(this.currentUser.email);
    this.interestsBoxes.setValue(this.currentUser.interests);
    }

  ngOnInit() {
    this.getFormControls();
    this.getUser();
    this.setFormControls();
    console.log('all interests:', this.allInterests.length);

    console.log(this.allInterests);
    console.log(this.currentUserInterests);
    console.log(this.interestsBoxes.value);
  }

  compare(c1: any, c2: any) {
    console.log('IN COMPARE');
    return c1 && c2 && c1 === c2;
  }

   get f() { return this.interestsBoxes.value; }

  submitChanges() {
   // const selections =  this.f.interestsBoxes.value;
    // console.log(selections);
    const selections =  this.f.interestsBoxes.value;
  //  this.f.interestsBoxes.setValue('Hello');
    const req = `{
      "id": 127,
      "email": "qqqqq",
      "first_name": "Thor",
      "last_name": "Odinson",
      "age": 100,
      "is_active": true,
      "user_type": 2,
      "location": {
          "zip": "30609"
      },
      "interests": [
        "Yoga", "Singing", "Hiking", "Video gaming", "Yodeling", "Woodworking"
        ]
  }`;
    this.editProfileService.saveProfile(req, 127).subscribe(() => {
      this.editProfileService.getUser(this.currentUser.id).subscribe(data => {
        console.log('DATA IS', data);
        this.goHome();
      });
    });

    // If no interests are selected, do not let them hit submit
    /**  On submit, call something like
       * saveProfile().then(() => { // Error handling: Failed to save profile.
          * if success response received -->
            * this.editProfileService.updateUser(resp);
       * });
         *
    */
 //   this.router.navigateByUrl('/home');
  }



  isExistingUser() {
    if (this.currentUser.interests && this.currentUser.interests.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
