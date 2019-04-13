import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material';
import { EditProfileService } from '../../shared/services/edit-profile-service/edit-profile.service';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePage extends AppComponent implements OnInit {
  interests = [];
  constructor(
    protected router: Router,
    protected location: Location,
    protected injector: Injector,
    protected dialog: MatDialog,
    protected editProfileService: EditProfileService
  ) {
    super(injector, dialog);
  }

  favoriteGenres: string[] = ['FPS', 'RPG', 'Battle Arena', 'Action', 'RTS', 'Sports Simulation', 'MMORPG', 'Fighting', 'Tactical RPG',
  'RTT'];

  gamesPlayed: string[] = ['Fortnite', 'Call of Duty', 'Coutner Strike', 'FIFA', 'DOOM', 'Grand Theft Auto', 'Assasins Creed', 'Mario Bros',
  'Super Smash Borthers'];

  ngOnInit() {
    this.getAllInterests();
    console.log(this.interests);
  }
  submitChanges() {
    // If no interests are selected, do not let them hit submit
    /**  On submit, call something like
       * saveProfile().then(() => { // Error handling: Failed to save profile.
          * if success response received -->
            * this.editProfileService.updateUser(resp);
       * });
         *
    */
    this.router.navigateByUrl('/home');
  }

  getAllInterests(){
    this.editProfileService.getAllInterests().subscribe(data => {
      if (data){
        for (let i = 0; i < data.length; ++i){
          this.interests.push(data[i]);
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
