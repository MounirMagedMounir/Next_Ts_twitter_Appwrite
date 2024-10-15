

export const setUserLocalStorge = (key:string,user: any) => {
  try {
   
    localStorage.setItem(key, JSON.stringify(user));

  } catch (error) { return false }
}

export const getUserLocalStorge = (key:string): any => {
  try {
    const user = localStorage.getItem(key);
    if (user) {

      return JSON.parse(user);
    }
    else{
      return false
    }

  } catch (err) { }

  return []


}




export const deleteTokenLocalStorge = (key:string): boolean => {

  try {
    localStorage.removeItem(key);
    return true
  } catch (error) {
    return false
  }

}


