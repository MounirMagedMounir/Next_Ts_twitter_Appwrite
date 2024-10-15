"use client";
import { forwardRef, useEffect, useState } from "react";
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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { addNewUser } from "@/data/remote/serverData";
import * as EmailValidator from "email-validator";
import { FormHelperText, PaletteMode } from "@mui/material";
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
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignUp() {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [misMach, setmisMach] = useState(false);
  const [alert, setAleart] = useState(false);
  const [massge, setMassge] = useState("");
  const [firtNameMassge, setFirtNameMassge] = useState("");
  const [lastNameMassge, setLastNameMassge] = useState("");
  const [emailMassge, setEmailMassge] = useState("");
  const [userMassge, setUserMassge] = useState("");
  const [passwordMassge, setPasswordMassge] = useState("");
  const [confirmPasswordMassge, setConfirmPasswordMassge] = useState("");
  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedFirstName, setValidatedFirstName] = useState(false);
  const [validatedLastName, setValidatedLastName] = useState(false);
  const [validatedUsername, setValidatedUsername] = useState(false);
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [validatedConfirmPassword, setValidatedConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const settings = UseAppSelector( (state) => state.settings.value);
  const [mode,setMode]=useState<PaletteMode>("dark")



useEffect(()=>{ 

  setMode(settings.theme)

},[])
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

  const onPress = async () => {
    if (user.Username.length < 8) {
      setLoading(false);
      setValidatedUsername(true);
      setUserMassge("UserName is less than 8");
    }

    if (user.LastName === "") {
      setLoading(false);
      setValidatedLastName(true);
    }
    if (user.FirstName === "") {
      setLoading(false);
      setValidatedFirstName(true);
    }
    if (!EmailValidator.validate(user.Email)) {
      setLoading(false);
      setValidatedEmail(true);
      setEmailMassge("")
    }
    if (!schema.validate(user.Password)) {
      setLoading(false);
      setValidatedPassword(true);
      setPasswordMassge(
        "Password is not on the format "
      );
    }
    if (!schema.validate(user.confirmPassword)) {
      setLoading(false);
      setValidatedConfirmPassword(true);
    }
    if (user.Password === user.confirmPassword) {
      setmisMach(false);
    
    } else {
      setLoading(false); 
       setConfirmPasswordMassge("Password MisMach")
      setmisMach(true);
    }
    if (
      EmailValidator.validate(user.Email) &&
      user.FirstName != "" &&
      user.LastName != "" &&
      schema.validate(user.Password) &&
      schema.validate(user.confirmPassword) &&
      user.Password === user.confirmPassword
    ) {
      router.push("/adduser");

      const response = null
      if (response) {
        router.push("/login");
        router.replace("/login");
      } else {
        setLoading(false);
        setMassge("Email alredy exists");
        setAleart(true);
        setmisMach(true);
      }
    }
  };

  const handelUserName = (e: any) => {
    setUser({ ...user, Username: e.target.value });

    if (user.Username.length >= 7) {
      setValidatedUsername(false);
      setUserMassge("");
    }
  };
  const handelemail = (e: any) => {
    setUser({ ...user, Email: e.target.value });
 

    if (user.Username.length >= 7) {
      setValidatedEmail(false);
      setEmailMassge("");
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
            Sign up
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  sx={{ marginLeft: "-10%" }}
                  margin="normal"
                  error={validatedFirstName}
                  value={user.FirstName}
                  onChange={(e) => {
                    setUser({ ...user, FirstName: e.target.value });
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
                  autoComplete="family-name"
                  margin="normal"
                  error={validatedLastName}
                  value={user.LastName}
                  onChange={(e) => {
                    setUser({ ...user, LastName: e.target.value });
                    setValidatedLastName(false);
                  }}
                />
              </Grid>

              <Box sx={{ mt: 1 }}>
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

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{ marginLeft: "-1%" }}
                  error={validatedEmail}
                  value={user.Email}
                  helperText={emailMassge}
                  onChange={(e) => {handelemail(e)
                 
                  }}
                />

                <FormControl sx={{ m: 1, width: "100%", marginLeft: "-0.2%" }}>
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
                    sx={{ marginLeft: "-1%" }}
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
                <FormControl sx={{ m: 1, width: "100%", marginLeft: "-0.2%" }}>
                  <InputLabel>confirmPassword</InputLabel>

                  <OutlinedInput
                    id="ConfirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword((show) => !show)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Conform password"
                    required
                    fullWidth
                    sx={{ marginLeft: "-1%" }}
                    name="Conform password"
                    autoComplete="current-password"
                    error={validatedConfirmPassword}
                    value={user.confirmPassword}
                    onChange={(e) => {
                      setUser({ ...user, confirmPassword: e.target.value });
                      setValidatedConfirmPassword(false);
                    }}
                  />
                       <FormHelperText sx={{ color: "red" }}>
                    {confirmPasswordMassge}
                  </FormHelperText>
                  <FormHelperText>
                    {" "}
                    Password Should have at least 8 char ,max 100 char,
                    uppercase ,lowercase , at least 2 digits and has no spaces
                  </FormHelperText>
                </FormControl>
              </Box>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onPress()}
            >
              {loading ? "loading..." : " Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      );
}
