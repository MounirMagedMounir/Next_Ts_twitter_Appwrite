"use client";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { Suspense, forwardRef, useEffect, useState } from "react";
import {
  useGetUserByIDQuery,
  useUpdateUserMutation,
} from "@/Redux/featuers/userApi";
import { CircularProgress, CssBaseline, FormHelperText, PaletteMode } from "@mui/material";
import { useRouter } from "next/navigation";
import { getUserLocalStorge } from "@/data/local/webData";
import { UseAppSelector } from "@/Redux/store";

function page({ params }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAleart] = useState(false);
  const [massge, setMassge] = useState("");
  const [emailMassge, setEmailMassge] = useState("");
  const [passwordMassge, setPasswordMassge] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedFirstName, setValidatedFirstName] = useState(false);
  const [validatedLastName, setValidatedLastName] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [NewData, setNewData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    image: "",
  });



  var passwordValidator = require("password-validator");
  var schema = new passwordValidator();
  schema
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);
  const { data: userData, isSuccess: isAppsSuccess } = useGetUserByIDQuery(
    params.id
  );

  const [upadateUser, { isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (isAppsSuccess) {
      setNewData({
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
  }, [isAppsSuccess]);

  const onPress = async () => {
    if (NewData.lastName === "") {
      setValidatedLastName(true);
    }
    if (NewData.firstName === "") {
      setValidatedFirstName(true);
    }
    if (!EmailValidator.validate(NewData.email)) {
      setValidatedEmail(true);
      setEmailMassge("Email is not in the right form");
    } else {
      setValidatedEmail(false);
      setEmailMassge("");
    }
    if (!schema.validate(NewData.password)) {
      setValidatedPassword(true);
      setPasswordMassge("password not in format");
    } else {
      setValidatedPassword(false);
      setPasswordMassge("");
    }

    if (
      EmailValidator.validate(NewData.email) &&
      NewData.firstName != "" &&
      NewData.lastName != "" &&
      schema.validate(NewData.password)
    ) {
      await upadateUser(NewData)
    }
  };

  if(isSuccess){
    router.replace("/user");
}
  return (
    <>
              <CssBaseline />
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >     
           {loading ? (
                  <CircularProgress />
                ) : (<>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
               sx={{ marginLeft: "-0.7%" }}
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                margin="normal"
                error={validatedFirstName}
                value={NewData.firstName}
                onChange={(e) => {
                  setNewData({ ...NewData, firstName: e.target.value });
                  setValidatedFirstName(false);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                    sx={{ marginLeft: "3%" }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                margin="normal"
                error={validatedLastName}
                value={NewData.lastName}
                onChange={(e) => {
                  setNewData({ ...NewData, lastName: e.target.value });
                  setValidatedLastName(false);
                }}
              />
            </Grid>

            <Box sx={{ mt: 1 }}>
              <TextField
               sx={{ m: 1, width: "126%", marginLeft: "5%" }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                error={validatedEmail}
                value={NewData.email}
                onChange={(e) => {
                  setNewData({ ...NewData, email: e.target.value });
                  setValidatedEmail(false);
                }}
              />
              <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                {emailMassge}
              </FormHelperText>
              <FormControl sx={{ m: 1, width: "100%", marginLeft: "-0.2%" }}>
                <InputLabel   sx={{ marginLeft: "5%" }}>Password *</InputLabel>

                <OutlinedInput
                 sx={{ m: 1, width: "126%", marginLeft: "5%" }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  required
                  fullWidth
                  name="password"
                  error={validatedPassword}
                  value={NewData.password}
                  onChange={(e) => {
                    setNewData({ ...NewData, password: e.target.value });
                    setValidatedPassword(false);
                  }}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {passwordMassge}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => onPress()}
            // href="/updateUser"
          >
            Save
          </Button>
        </Box>
        </>)}
      </Box>
   </>
  );
}

export default page;
