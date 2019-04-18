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
  genreBoxes: FormControl;
  timeBoxes: FormControl;
  prioritiesBoxes: FormControl;
  infoForm: FormGroup;
  currentUserInterests = [];
  submitted: any;
  allInterests = JSON.parse(localStorage.getItem('interests'));
  allGenres = JSON.parse(localStorage.getItem('genres'));
  allTimes = JSON.parse(localStorage.getItem('times'));
  allPriorities = ['Interests', 'Games', 'Active Time'];

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
    });
    this.interestsBoxes = new FormControl();
    this.genreBoxes = new FormControl();
    this.timeBoxes = new FormControl();
    this.prioritiesBoxes = new FormControl();
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
    this.prioritiesBoxes.setValue(this.currentUser.priorities);
    }

  ngOnInit() {
      this.getFormControls();
      this.getUser();
      this.setFormControls();
    // TODO take out hardcoded values when real service is in place
      this.allTimes = ['Morning', 'Noon', 'Evening', 'Night Owl'];
  }

  compare(c1: any, c2: any) {
    return c1 && c2 && c1 === c2;
  }

   get f() { return this.infoForm.controls; }

  submitChanges() {
  if (this.infoForm.invalid) {
    this.editProfileService.handleError('Please fill in all required fields and try again');
  } else if (this.interestsBoxes.value.length === 0) {
    this.editProfileService.handleError('Please select at least one interest and try again');
  } else if (this.genreBoxes.value.length === 0) {
    this.editProfileService.handleError('Please select at least one game genre and try again');
  } else if (this.timeBoxes.value.length === 0) {
    this.editProfileService.handleError('Please select at least one active time and try again');
    // TODO add a check for priority
  } else {
      const orderedPriorities = ''; // TODO write a method to sort the priorities in order
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
        priorities: orderedPriorities
      });
        this.showLoading();
        this.editProfileService.saveProfile(this.currentUser.id, profileChanges).subscribe((data) => {
        if (data) {
          this.currentUser = this.editProfileService.updateUser(data);
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
