
import { getUserLocalStorge } from '@/data/local/webData';


export const checkUserLocalStorge = () => {

  const user = getUserLocalStorge("user");
  if (user) {
    return true
  }
  else {
    return false
  }
}

