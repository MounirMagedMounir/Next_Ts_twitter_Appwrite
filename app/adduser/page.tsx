import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

async function page() {
    const router = useRouter();
    try {
        const user= await addNewUser(curruser)
          if(user)
    setTimeout(() => {
        router.push("/login");
   router.replace("/login"); 
     }, 100);
    } catch (error) {
        router.push("/signup");
        router.replace("/signup");  
    }
  
}

export default page