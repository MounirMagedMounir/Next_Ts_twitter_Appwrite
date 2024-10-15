import { Comment } from "./commentModel";

export type commentsModel ={
    Comments : Array<Comment>;
    total: number;
    skip: number;
    limit:number;
  }
  