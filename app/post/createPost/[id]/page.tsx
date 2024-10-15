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
import Dialogalert from "@/app/components/dialogalert";
import {
  FormHelperText,

  PaletteMode,
} from "@mui/material";
import {
  useAddPostMutation
} from "@/Redux/featuers/postApi";
import {
  deleteTokenLocalStorge,
  getUserLocalStorge,
  setUserLocalStorge,
} from "@/data/local/webData";

function page({ params }: any) {
  const [alert, setAleart] = useState(false);
  const [validatedTitle, setValidatedTitle] = useState(false);
  const [validatedBody, setValidatedBody] = useState(false);
  const [titleMassge, setTitleMassge] = useState("");
  const [bodyMassge, setBodyMassge] = useState("");
  const router = useRouter();
  
  
  const currentUser = UseAppSelector((state) => state.currentUser.value);

  const [NewData, setNewData] = useState({
    id: params.id,
    title: "",
    body: "",
    userId: currentUser.id,
    tags: [""],
    reactions: 0,
  });

  const [addPost, { isSuccess }] = useAddPostMutation();

  const onPress = async () => {
    if (NewData.title === "") {
      setValidatedTitle(true);
    }
    if (NewData.body === "") {
      setValidatedBody(true);
    } 
    if (
      NewData.title != "" &&
      NewData.body != ""
    ) {
      await addPost(NewData);
    }
  };

  if (isSuccess) {
    deleteTokenLocalStorge("createPostDrift");
    router.replace("/post");
  }

  const drift = getUserLocalStorge("createPostDrift");

  useEffect(() => {
    if (drift !== false) {
      setAleart(true);
    }
  }, [alert]);

  const handelcontinue = () => {
    setNewData(drift);
    setAleart(false);
  };

  const handelTitle = (e: any) => {
    setNewData({ ...NewData, title: e.target.value });
    setUserLocalStorge("createPostDrift", NewData);
    if (NewData.title !== "") {
      setValidatedTitle(false);
      setTitleMassge("");
    }
  };

  const handelBody = (e: any) => {
    setNewData({ ...NewData, body: e.target.value });
    setUserLocalStorge("createPostDrift", NewData);
    if ( NewData.body != "") {
      setValidatedBody(false);
      setBodyMassge("");
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
            <Box>
            <TextField
                sx={{ m: 1, width: "126%", marginLeft: "30%",height:"auto" }}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                error={validatedTitle}
                value={NewData.title}
                multiline
                onChange={(e) => {
                  handelTitle(e);
                }}
              />
              <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                {titleMassge}
              </FormHelperText>

              <TextField
                sx={{ m: 1, width: "166%", marginLeft: "10%" ,height:"auto"}}
                margin="normal"
                required
                fullWidth
                id="body"
                label="content"
                name="body"
                multiline
                error={validatedBody}
                value={NewData.body}
                onChange={(e) => {
                  handelBody(e);
                }}
              />
              <FormHelperText sx={{ color: "red", marginLeft: "5%" }}>
                {bodyMassge}
              </FormHelperText>
            </Box>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => onPress()}
          >
          Add Post
          </Button>
          <Button
            onClick={() => {
              setUserLocalStorge("createPostDrift", NewData);
            }}
            href="/post"
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
              deleteTokenLocalStorge("createPostDrift");
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
