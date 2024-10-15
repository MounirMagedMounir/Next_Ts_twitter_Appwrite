"use client";
import { User } from "@/models/userModel";
import { setTokenCookies } from "./cookies";
import { useLoginMutation } from "@/Redux/featuers/isAuthApi";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "@/Redux/featuers/currentUser";
import { useRouter } from "next/navigation";

export default function logInUser ({onPress,loading,setLoading,}:{onPress:any,loading:any,setLoading:any}) {
 
  return (
    <>
       <Button
              type="button"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setLoading(true);
                onPress();
              }}
            >
              {loading ? "loading..." : " Log In"}
            </Button>

    </>
  );
};
