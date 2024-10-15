export class User {

    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  password: string;

    constructor(id: number, 
        email: string,
        firstName: string,
        lastName: string,
        gender: string,
        image: string,
        token: string,
        password:string ){
            this.id=id;
            this.email= email;
            this.firstName =firstName;
            this.lastName=lastName;
            this.gender=gender;
            this.image=image;
            this.token=token;
            this.password=password
        }

    toJSON(): object {
    return {
        id:   this.id,
    
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        image: this.image,
        token: this.token,
        password:this.password
    };
}

static fromJSON(json: any) {
    return new User(json.id,json.email,json.firstName,json.lastName,json.gender,json.image,json.token,json.password);
}
  }