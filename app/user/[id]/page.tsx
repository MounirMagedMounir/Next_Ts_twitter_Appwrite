"use client";
import { UseAppSelector } from "@/Redux/store";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Suspense, forwardRef, useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Modal, Palette, PaletteMode } from "@mui/material";
import {  useGetUserByIDQuery} from "@/Redux/featuers/userApi";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { getUserLocalStorge } from "@/data/local/webData";
import { amber } from "@mui/material/colors";
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 
export default function page({ params }: any) {
const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    image: "",
  });
  

  const {
    data: userData,
    isLoading: isAppsLoading,
    isUninitialized: isAppsUninitialized,
    isSuccess: isAppsSuccess,
    isError: isAppError,
    error: appError,
  } = useGetUserByIDQuery(params.id);


	useEffect(()=>{
    if(isAppsSuccess){
 
    setUser({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      gender: userData.gender,
      image: userData.image,
    });

 setLoading(false);   
  
  }
	}, [isAppsSuccess])
  



    
        

  return (
    <>
      <CssBaseline />  
    
      <Card
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: " #dad7cd",
          maxWidth: 600,
          height: 700,
          align: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CardContent
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            align: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
           {loading ? (
                  <CircularProgress color="inherit"/>
                ) : (<>
          <Suspense fallback={<p>...loading</p>}>
          <Avatar alt={user.firstName}src={'https://picsum.photos/200/300?random='+`${user.id}`} sx={{ width: 110, height: 110 }} />
          <Typography sx={{ marginTop: 2, fontSize: 26, fontWeight: 700 }}>
            {user.firstName} {user.lastName}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href={"/user/updateUser/"+`${user.id}`}
            sx={{ marginLeft: 60, marginTop: 2 }}
          >
            Edit <EditIcon />
          </Button>
         
          <Typography sx={{ marginTop: 2, fontSize: 26, fontWeight: 400 }}>
            FirstName : {user.firstName}
          </Typography>

          <Typography sx={{ marginTop: 2, fontSize: 26, fontWeight: 400 }}>
            LastName: {user.lastName}
          </Typography>

          <Typography sx={{ marginTop: 2, fontSize: 26, fontWeight: 400 }}>
            Email: {user.email}
          </Typography>

          <Typography sx={{ marginTop: 2, fontSize: 26, fontWeight: 400 }}>
            Gender: {user.gender}
          </Typography>
            </Suspense></>)}
        </CardContent>
      </Card>
    </>
   
  );
}
