import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { EditProfileService } from '../../shared/services/edit-profile-service/edit-profile.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends AppComponent implements OnInit {
  interestsBoxes: FormControl;
  genreBoxes: FormControl;
  timeBoxes: FormControl;
  prioritiesForm: FormGroup;
  prioritiesFormArray: FormArray = this.formBuilder.array([]);
  infoForm: FormGroup;
  currentUserInterests = [];
  submitted: any;
  selectedPriorities: string[] = [];

  allInterests: string[];
  allGenres: string[];
  allPriorities: string[];
  allTimes: string[];

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
    this.getAllLists();
    this.getFormControls();
    this.getUser();
    setTimeout(() => {
      this.setFormControls();
    });
  }

  getAllLists() {
    this.allInterests = JSON.parse(localStorage.getItem('interests'));
    this.allGenres = JSON.parse(localStorage.getItem('genres'));
    this.allTimes = JSON.parse(localStorage.getItem('times'));
    this.allPriorities = JSON.parse(localStorage.getItem('priorities'));
  }

  getFormControls() {
    this.infoForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    });
    for (let i = 0; i < this.allPriorities.length; ++i) {
      this.prioritiesFormArray.push(new FormControl(this.allPriorities[i], [Validators.required]));
    }
    this.prioritiesForm = new FormGroup({
      priorities: this.prioritiesFormArray
    });

    this.interestsBoxes = new FormControl();
    this.genreBoxes = new FormControl();
    this.timeBoxes = new FormControl();
  }

  setFormControls() {
    this.infoForm.controls.firstName.setValue(this.currentUser.firstName);
    this.infoForm.controls.lastName.setValue(this.currentUser.lastName);
    this.infoForm.controls.age.setValue(this.currentUser.age);
    this.infoForm.controls.zip.setValue(this.currentUser.location.zip);
    this.infoForm.controls.email.setValue(this.currentUser.email);
    this.interestsBoxes.setValue(this.currentUser.interests);
    this.genreBoxes.setValue(this.currentUser.genres);
    this.timeBoxes.setValue(this.currentUser.times);
    for (let i = 0; i < this.prioritiesFormArray.length; ++i) {
      this.prioritiesFormArray.controls[i].setValue(this.currentUser.priorities[i]);
    }
  }

  compare(c1: any, c2: any) {
    return c1 && c2 && c1 === c2;
  }

  get f() {
    return this.infoForm.controls;
  }
  get p() {
    return this.prioritiesFormArray.controls;
  }

  submitChanges() {
    // Put priorities in an array so they are ready to go
    for (let i = 0; i < this.allPriorities.length; ++i) {
      this.selectedPriorities.push(this.p[i].value);
    }

    const profileChanges = JSON.stringify({
      id: this.currentUser.id,
      email: this.f.email.value,
      first_name: this.f.firstName.value,
      last_name: this.f.lastName.value,
      age: this.f.age.value,
      is_active: true,
      user_type: this.editProfileService.stringToType(this.currentUser.type),
      location: {
        zip: this.f.zip.value
      },
      interests: this.interestsBoxes.value,
      genres: this.genreBoxes.value,
      times: this.timeBoxes.value,
      priorities: this.selectedPriorities
    });
    this.editProfileService.saveProfile(this.currentUser.id, profileChanges).subscribe((data) => {
      if (data) {
        this.currentUser = this.editProfileService.updateUser(data);
        localStorage.removeItem('matches');
        this.goHome();
      }
    });
  }

  isExistingUser() {
    return (
      this.currentUser.interests &&
      this.currentUser.interests.length > 0 &&
      this.currentUser.priorities &&
      this.currentUser.priorities.length === this.allPriorities.length &&
      this.currentUser.genres &&
      this.currentUser.genres.length > 0 &&
      this.currentUser.times &&
      this.currentUser.times.length > 0
    );
  }
}
