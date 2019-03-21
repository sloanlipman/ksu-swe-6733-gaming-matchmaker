
export class User {
  id: string; // TODO string or number?
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  active: boolean;
  type: string;

  constructor(obj?: any){
    this.id = obj && obj.id;
    this.email = obj && obj.email;
    this.firstName = obj && obj.first_name;
    this.lastName = obj && obj.last_name;
    this.age = obj && obj.age;
    this.active = obj && obj.active;
    this.type = obj && obj.type;

  }
}
