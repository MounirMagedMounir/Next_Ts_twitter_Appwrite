import { Post } from "./postModel";

export type postsModel ={
    posts : Array<Post>;
    total: number;
    skip: number;
    limit:number;
  }
  