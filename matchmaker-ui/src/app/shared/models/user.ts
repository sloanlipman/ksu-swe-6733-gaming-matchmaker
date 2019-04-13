export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  location: any;
  isActive: boolean;
  type: string;
  interests?: string[];

  constructor(obj?: any){
    this.id = obj && obj.id;
    this.email = obj && obj.email;
    this.firstName = obj && obj.firstName;
    this.lastName = obj && obj.lastName;
    this.age = obj && obj.age;
    this.location = obj && obj.location;
    this.isActive = obj && obj.isActive;
    this.type = obj && obj.type;
    this.interests = obj && obj.interests;

  }
}
