import { User } from "@/models/userModel";
import { setTokenCookies } from "@/helper/cookies";



export const paginationUsers =async (limit:string,skip:string):Promise<User[] | undefined> => { 

  try {
    const res = await  
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,age`)
    if (res.status == 200) {
      const resJson = await res.json();
      if (resJson) {
        return resJson
      } 
    }
  }
  catch (e: any) {
    throw new Error('some error');
  }

}
