import { Location } from '@angular/common';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatDialog, } from '@angular/material';
import { EditProfileService } from '../../shared/services/edit-profile-service/edit-profile.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Priorities } from 'src/app/shared/models/priorities';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends AppComponent implements OnInit {
  interestsBoxes: FormControl;
  genreBoxes: FormControl;
  timeBoxes: FormControl;
  prioritiesForm: FormGroup;
  prioritiesFormArray: FormArray;
  infoForm: FormGroup;
  currentUserInterests = [];
  submitted: any;
  allInterests = JSON.parse(localStorage.getItem('interests'));
  allGenres = JSON.parse(localStorage.getItem('genres'));
  allTimes = JSON.parse(localStorage.getItem('times'));

  // TODO either get the value from the DB or talk with backend team to get the right names
 /* allPriorities: Priorities[] = [
    {value: 'interests', label: 'Interests'},
    {value: 'genres', label: 'Genres'},
    {value: 'activeTime', label: 'Active Time'},
    {value: 'location', label: 'Location'}
  ];*/
  allPriorities = ['Interests', 'Game Genres', 'Active Time', 'Location'];
  prioritiesArray: string[];
  currentUserPriorities:  [];


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

  ngOnInit() {
      this.getFormControls();
      this.getUser();
     // this.setCurrentPriorities();
      this.setFormControls();
    // TODO take out hardcoded values when real service is in place
      this.allTimes = ['Morning', 'Noon', 'Evening', 'Night Owl'];
  }

  /*setCurrentPriorities() {
    for (let i = 0; i < this.currentUser.priorities.length; ++i) {
      if (this.currentUser.priorities[i] === 'interests') {
        this.currentUserPriorities.push(this.allPriorities[0]);
        console.log(this.currentUserPriorities);
      }
      if (this.currentUser.priorities[i] === 'games') {
        this.currentUserPriorities.push(this.allPriorities[1]);
        console.log(this.currentUserPriorities);
      }
      if (this.currentUser.priorities[i] === 'activeTime') {
        this.currentUserPriorities.push(this.allPriorities[2]);
        console.log(this.currentUserPriorities);
      }
    }
  } */

addPriority() {
  return this.formBuilder.group({
    value: ''
  });
}
  getFormControls() {
    this.infoForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });

    this.prioritiesForm = this.formBuilder.group({
      priority1: new FormControl('', [Validators.required]),
      priority2: new FormControl('', [Validators.required]),
      priority3: new FormControl('', [Validators.required]),
      priority4: new FormControl('', [Validators.required]),
    });

    this.prioritiesFormArray = this.formBuilder.array([ this.addPriority() ]);


    this.interestsBoxes = new FormControl();
    this.genreBoxes = new FormControl();
    this.timeBoxes = new FormControl();
  }

  setFormControls() {
    this.currentUserInterests = this.currentUser.interests;
    this.infoForm.controls.firstName.setValue(this.currentUser.firstName);
    this.infoForm.controls.lastName.setValue(this.currentUser.lastName);
    this.infoForm.controls.age.setValue(this.currentUser.age);
    this.infoForm.controls.zip.setValue(this.currentUser.location.zip);
    this.infoForm.controls.email.setValue(this.currentUser.email);
    this.interestsBoxes.setValue(this.currentUser.interests);
    this.genreBoxes.setValue(this.currentUser.genres);
    this.timeBoxes.setValue(this.currentUser.times);
    this.prioritiesForm.controls.priority1.setValue(this.currentUser.priorities[0]);
    this.prioritiesForm.controls.priority2.setValue(this.currentUser.priorities[1]);
    this.prioritiesForm.controls.priority3.setValue(this.currentUser.priorities[2]);
    this.prioritiesForm.controls.priority4.setValue(this.currentUser.priorities[3]);

    console.log(this.p.priority1.value);
  }

  compare(c1: any, c2: any) {
    return c1 && c2 && c1 === c2;
  }

   get f() { return this.infoForm.controls; }
   get p() {return this.prioritiesForm.controls; }

  submitChanges() {

  // Put priorities in an array so they are ready to go
    this.prioritiesArray = [this.p.priority1.value, this.p.priority2.value, this.p.priority3.value, this.p.priority4.value];
    let unique;
    const distinctPriorities = new Set(this.prioritiesArray);
    console.log(distinctPriorities);
    console.log(distinctPriorities.size);
    if (distinctPriorities.size === this.prioritiesArray.length) { // Check that the selections are distinct
      unique = true;
    } else {
      unique = false;
    }
    console.log('unique is', unique);

    console.log('p#1', this.p.priority1.value);
    if (this.infoForm.invalid) {
      this.editProfileService.handleError('Please fill in all required fields and try again');
    } else if (this.interestsBoxes.value.length === 0) {
      this.editProfileService.handleError('Please select at least one interest and try again');
    } else if (this.genreBoxes.value.length === 0) {
     this.editProfileService.handleError('Please select at least one game genre and try again');
  //   } else if (this.timeBoxes.value.length === 0) {
 //       this.editProfileService.handleError('Please select at least one active time and try again');
    } else if (this.prioritiesForm.invalid) {
      this.editProfileService.handleError('Please select your matchmaking priorities and try again');
    } else if (this.prioritiesForm.valid && !unique)  {
        this.editProfileService.handleError('Please make unique selections for your matchmaking priorities and try again');
    }  else {
      localStorage.setItem('priorities', JSON.stringify(this.prioritiesArray)); // TODO remove this

        const profileChanges = JSON.stringify({
          id: this.currentUser.id,
          email: this.f.email.value,
          first_name: this.f.firstName.value,
          last_name: this.f.lastName.value,
          age: this.f.age.value,
          is_active: true,
          user_type: this.editProfileService.stringToType(this.currentUser.type),
          location: {
            zip: this.f.zip.value,
          },
          interests: this.interestsBoxes.value,
          genres: this.genreBoxes.value,
          times: this.timeBoxes.value,
          priorities: this.prioritiesArray
        });
          this.showLoading();
          this.editProfileService.saveProfile(this.currentUser.id, profileChanges).subscribe((data) => {
          if (data) {
            this.currentUser = this.editProfileService.updateUser(data);
            console.log(this.prioritiesArray);
            this.goHome();
          } else {
            this.dismissLoading();
          }
      });
    }
  }



  isExistingUser() {
    if (this.currentUser.interests && this.currentUser.interests.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
