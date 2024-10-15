"use client";

import { setUserLocalStorge } from '@/data/local/webData';
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
function page() {
    const curruser=useSelector((state:any)=>state.user.value);
    const router = useRouter();


    setUserLocalStorge("user",curruser)

    setTimeout(() => {
        router.push("/");
   router.replace("/"); 
     }, 100);
 
}

export default page