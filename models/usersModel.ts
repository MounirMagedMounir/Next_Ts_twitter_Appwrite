import { User } from "./userModel";

export type usersModel ={
    users : Array<User>;
    total: number;
    skip: number;
    limit:number;
  }
  