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
  genres?: string[]; // TODO decide what to actually call these
  times?: string[];
  priorities?: string[];

  constructor(obj?: any) {
    this.id = obj && obj.id;
    this.email = obj && obj.email;
    this.firstName = obj && (obj.firstName || obj.first_name);
    this.lastName = obj && (obj.lastName || obj.last_name);
    this.age = obj && obj.age;
    this.location = obj && obj.location;
    this.isActive = obj && (obj.isActive || obj.is_active);
    this.type = obj && (obj.type || obj.user_type);
    this.interests = obj && obj.interests;
    this.genres = obj && obj.genres;
    this.times = obj && obj.times;
    this.priorities = obj && obj.priorities;
  }
}
