import { Location } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog } from '@angular/material';
import { EditProfileService } from 'src/app/shared/services/edit-profile-service/edit-profile.service';
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

  typesOfInterest: string[] = ['Hiking', 'Reading', 'Cooking', 'Graphics', 'Programming', 'Surfing', 'Snowboarding', 'Drawing', 'Dogs',
  'Cats'];

  favoriteGenres: string[] = ['FPS', 'RPG', 'Battle Arena', 'Action', 'RTS', 'Sports Simulation', 'MMORPG', 'Fighting', 'Tactical RPG',
  'RTT'];

  gamesPlayed: string[] = ['Fortnite', 'Call of Duty', 'Coutner Strike', 'FIFA', 'DOOM', 'Grand Theft Auto', 'Assasins Creed', 'Mario Bros',
  'Super Smash Borthers'];

  ngOnInit() {
    this.getAllInterests();
    console.log(this.interests);
  }
  submitChanges() {
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

/*  existingUser(){
    // TODO
    // if no user interests, return false
    // else return true
    return true;
  } */
}
