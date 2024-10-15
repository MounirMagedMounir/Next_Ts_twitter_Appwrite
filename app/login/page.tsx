"use client";

import { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogInUser from "@/helper/login";
import { FormHelperText, PaletteMode } from "@mui/material";
import { useLoginMutation } from "@/Redux/featuers/isAuthApi";
import { getUserLocalStorge } from "@/data/local/webData";
import { UseAppSelector } from "@/Redux/store";
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



export default function login() {
  const [user, setUser] = useState({ Username: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAleart] = useState(false);
  const [validatedUsername, setValidatedUsername] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [massge, setMassge] = useState("");
  const [userMassge, setUserMassge] = useState("");
  const [passwordMassge, setPasswordMassge] = useState("");
  const [loading, setLoading] = useState(false);
  const settings = UseAppSelector( (state) => state.settings.value);



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

  const router = useRouter();
  const [
    login,
    {
      data,
      isError,
      error,
      isLoading,
      isFetching,
      isSuccess,
      refetch,
    },
  ] = useLoginMutation();

  const onPress = async () => {
    if (user.Username.length < 8) {
      setLoading(false);
      setValidatedUsername(true);
      setUserMassge("UserName is less than 8");
    }

    if (!schema.validate(user.Password)) {
      setLoading(false);
      setValidatedPassword(true);
      setPasswordMassge("Password is not on the format");
    } else if (user.Username.length >= 8) {
      await login(user); 
    }

  };


  const handelError = () => {
 if (isSuccess) {
    setTimeout(() => {
      router.replace("/");
    }, 100);
  } else if (error?.status===400) {
     setLoading(false);
    setAleart(true);
    setMassge("UserName or Password is incorrect");
  }
  }
  useEffect(() => {
       handelError()
      },[isSuccess,error]);

  const handelUserName = (e: any) => {
    setUser({ ...user, Username: e.target.value });

    if (user.Username.length >= 7) {
      setValidatedUsername(false);
      setUserMassge("");
    }
  };
  
  const handelPassword = (e: any) => {
    setUser({ ...user, Password: e.target.value });

    if (schema.validate(user.Password)) {
      setValidatedPassword(false);
      setPasswordMassge("");
    }
  };
  return (
      <Container component="main" maxWidth="xs">
        <Snackbar
          open={alert}
          autoHideDuration={4000}
          onClose={() => setAleart(false)}
        >
          <Alert
            severity="error"
            onClose={() => setAleart(false)}
            sx={{
              position: "fixed",
              right: 0,
              top: "12%",
            }}
          >
            {massge}
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ marginLeft: "-1%" }}
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              error={validatedUsername}
              value={user.Username}
              helperText={userMassge}
              onChange={(e) => {
                handelUserName(e);
              }}
            />

            <FormControl sx={{ m: 1, width: "100%", marginLeft: "-1%" }}>
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
                autoComplete="current-password"
                error={validatedPassword}
                value={user.Password}
                onChange={(e) => {
                  handelPassword(e);
                }}
              />
              <FormHelperText sx={{ color: "red" }}>
                {passwordMassge}
              </FormHelperText>
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <LogInUser
              onPress={onPress}
              loading={loading}
              setLoading={setLoading}
            />

            <Grid container>
              <Grid item xs>
                <Link href="/forgetPss" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      );
}
