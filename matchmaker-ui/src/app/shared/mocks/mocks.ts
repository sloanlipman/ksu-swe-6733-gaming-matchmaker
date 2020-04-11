import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

export class HttpServiceMock {
  httpOptions = new HttpHeaders();

  typeToString(type: number) {}
  stringToType(type: string) {}
  post(url: string, body: any, options?: any) {}
  get(url: string, options?: any) {}
  getUser(id: any) {}
  updateUser(user: any) {}
  getAllInterests() {}
  getAllGenres() {}
  getAllTimes() {}
  getAllPriorities() {}
  logout() {}
  handleError(err?: any) {}
}

export class EditProfileServiceMock extends HttpServiceMock {
  constructor() {
    super();
  }
  saveProfile(id: number, request: any) {}
}

export class LoginServiceMock extends HttpServiceMock {
  constructor() {
    super();
  }
  login(email, password) {}
}

export class MatchmakingServiceMock extends HttpServiceMock {
  constructor() {
    super();
  }
  getMatches(id: number) {}
}

export class RegisterServiceMock extends HttpServiceMock {
  constructor() {
    super();
  }
  register(email: string, firstName: string, lastName: string, age: string, zip: string, password: string, confirmPassword: string) {}
}
