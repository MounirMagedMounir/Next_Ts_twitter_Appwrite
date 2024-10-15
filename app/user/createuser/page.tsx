"use client";
import { UseAppSelector } from "@/Redux/store";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Suspense, forwardRef, useEffect, useState } from "react";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import DialogConfirm from "@/app/components/dialogConfirm";
import Dialogalert from "@/app/components/dialogalert";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  PaletteMode,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useAddUserMutation,
  useGetUserByIDQuery,
} from "@/Redux/featuers/userApi";
import { useDispatch } from "react-redux";
import { usersModel } from "@/models/usersModel";
import * as EmailValidator from "email-validator";
import {
  deleteTokenLocalStorge,
  getUserLocalStorge,
  setUserLocalStorge,
} from "@/data/local/webData";

function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAleart] = useState(false);
  const [massge, setMassge] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedFirstName, setValidatedFirstName] = useState(false);
  const [validatedLastName, setValidatedLastName] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [emailMassge, setEmailMassge] = useState("");
  const [passwordMassge, setPasswordMassge] = useState("");
  const router = useRouter();



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

  const [NewData, setNewData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    image: "",
  });

  const [addUser, { isSuccess }] = useAddUserMutation();
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
      await addUser(NewData);
    }
  };

  if (isSuccess) {
    deleteTokenLocalStorge("createDrift");
    router.replace("/user");
  }

  const drift = getUserLocalStorge("createDrift");

  useEffect(() => {
    if (drift !== false) {
      setAleart(true);
    }
  }, [alert]);

  const handelcontinue = () => {
    setNewData(drift);
    setAleart(false);
  };

  const handelEmail = (e: any) => {
    setNewData({ ...NewData, email: e.target.value });
    setUserLocalStorge("createDrift", NewData);
    if (EmailValidator.validate(NewData.email)) {
      setValidatedEmail(false);
      setEmailMassge("");
    }
  };

  const handelPassword = (e: any) => {
    setNewData({ ...NewData, password: e.target.value });
    setUserLocalStorge("createDrift", NewData);
    if (schema.validate(NewData.password)) {
      setValidatedPassword(false);
      setPasswordMassge("");
    }
  };

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
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                sx={{ marginLeft: "-0.7%" }}
                margin="normal"
                error={validatedFirstName}
                value={NewData.firstName}
                onChange={(e) => {
                  setNewData({ ...NewData, firstName: e.target.value });
                  setUserLocalStorge("createDrift", NewData);
                  setValidatedFirstName(false);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
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
                  setUserLocalStorge("createDrift", NewData);
                  setValidatedLastName(false);
                }}
              />
            </Grid>

            <Box>
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
                  handelEmail(e);
                }}
              />
              <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                {emailMassge}
              </FormHelperText>

              <FormControl sx={{ m: 1, width: "126%", marginLeft: "5%" }}>
                <InputLabel>Password</InputLabel>

                <OutlinedInput
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
                    handelPassword(e);
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
          >
            Add
          </Button>
          <Button
            onClick={() => {
              setUserLocalStorge("createDrift", NewData);
            }}
            href="/user"
          >
            save information for later
          </Button>

          <Dialogalert
            continueclick={() => {
              handelcontinue();
             setAleart(false);
            }}
            canselclick={() => {
              setAleart(false);
              deleteTokenLocalStorge("createDrift");
            }}
            opendialog={alert}
            triggerbutton={false}
            dialogtitle={"there is some information was saved do you want to retrive it"}
            buttonContent={" save information for later"}
            continuebuttonhref={null}
          />
        </Box>
      </Box>
          </>
  );
}

export default page;
