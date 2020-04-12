import { User } from '../models/user';

// TODO add genres and times
export class MockUsers {
  constructor() {}

  getUser1() {
    // For use as a frontend user object
    return JSON.parse(
      `{
        "id": 127,
        "email": "qqqqq",
        "firstName": "Cheff",
        "lastName": "Goldblum",
        "age": 1000,
        "isActive": true,
        "type": "regular",
        "location": {
            "id": 64582,
            "zip": "90210",
            "city": "BEVERLY HILLS",
            "state": "CA",
            "lat": 34.09,
            "lng": -118.41,
            "locationString": null
        },
        "interests": [
            "Animation",
            "Video gaming",
            "3D printing",
            "Singing",
            "Woodworking",
            "Yodeling",
            "Acting",
            "Acrobatics",
            "Hiking",
            "Yoga",
            "Amateur radio"
        ],
        "priorities": [
          "Interests",
          "Genres",
          "Times",
          "Location"
        ],
        "genres": [
          "RPG"
        ],
        "times": [
          "Afternoon"
        ]
      }`
    );
  }

  getUser2() {
    // For use as a front end user object
    return {
      id: 74,
      email: 'admin@aaa.com',
      firstName: 'admin',
      lastName: 'admin',
      age: 98,
      isActive: true,
      type: 'admin',
      location: {
        id: 83782,
        zip: 30075,
        city: 'Roswell',
        state: 'GA',
        lat: 34.03,
        lng: -84.35,
        locationString: null
      },
      interests: []
    };
  }

  getNewUser() {
    return new User({
      email: 'test123@test.com',
      firstName: 'Test',
      lastName: 'User',
      age: 24,
      location: {
        zip: 99999
      }
    });
  }
}
