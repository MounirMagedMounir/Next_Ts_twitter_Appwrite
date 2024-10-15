"use client";

import { deleteTokenLocalStorge } from "@/data/local/webData";
import { deleteTokenCookies } from "@/helper/cookies";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';


export default function signout() {
  const dispatch =useDispatch();
  const router = useRouter();
  setTimeout(() => {
    deleteTokenCookies();
     }, 50);  
  deleteTokenLocalStorge("user");


  setTimeout(() => {
       router.push("/");
  router.replace("/"); 
    }, 100);

 

}
