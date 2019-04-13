import { Location } from '@angular/common';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { EditProfileService } from '../../shared/services/edit-profile-service/edit-profile.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends AppComponent implements OnInit {
  allInterests = [];
  selectedInterests = [];
  interestForm: FormGroup;
  infoForm: FormGroup;
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
    this.getFormControls();
  }

  getFormControls() {
    this.interestForm = this.formBuilder.group( {
      interestsBoxes: new FormControl('')
    });
    this.infoForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getUser();
    this.getAllInterests();
    console.log(this.allInterests);
  }

  get f() { return this.interestForm.controls; }

  submitChanges() {
    const selections =  this.f.interestsBoxes.value;
    console.log(selections);
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

  getAllInterests(){
    this.editProfileService.getAllInterests().subscribe(data => {
      if (data){
        for (let i = 0; i < data.length; ++i){
          this.allInterests.push(data[i]);
        }
      }
    });
  }

  isExistingUser() {
    if (this.currentUser.interests && this.currentUser.interests.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
