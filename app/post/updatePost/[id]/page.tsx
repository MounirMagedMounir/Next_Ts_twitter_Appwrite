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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Suspense, forwardRef, useEffect, useState } from "react";
import {
  useGetPostByIDQuery,
  useUpdatePostMutation,
} from "@/Redux/featuers/postApi";
import {
  CircularProgress,
  CssBaseline,
  FormHelperText,
  PaletteMode,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { getUserLocalStorge } from "@/data/local/webData";
import { UseAppSelector } from "@/Redux/store";

function page({ params }: any) {
  const [alert, setAleart] = useState(false);
  const [massge, setMassge] = useState("");
  const [bodyMassge, setBodyMassge] = useState("");
  const [titleMassge, setTitleMassge] = useState("");
  const [validatedBody, setValidatedBody] = useState(false);
  const [validatedTitle, setValidatedTitle] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [NewData, setNewData] = useState({
    id: 0,
    title: "",
    body: "",
    userId:0 ,
    tags: [""],
    reactions: 0,
  });
  
  const { data: postData, isSuccess: isAppsSuccess } = useGetPostByIDQuery(
    params.id
  );

  const [upadataPost, { isSuccess }] = useUpdatePostMutation();

  useEffect(() => {
    if (isAppsSuccess) {
      setNewData(postData);

      setLoading(false);
    }
  }, [isAppsSuccess]);

  const onPress = async () => {
    if (NewData.title === "") {
      setValidatedTitle(true);
    }
    if (NewData.body === "") {
      setValidatedBody(true);
    }
    if (NewData.title != "" && NewData.body != "") {
      await upadataPost(NewData);
    }
  };
  if (isSuccess) {
    setTimeout(() => {
    router.replace(`/post/${NewData.id}`);
  }, 100);
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
          p: 4
          ,height:"auto" 
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                

                <Box sx={{ mt: 1 }}>
                <TextField
                sx={{ m: 1, width: "126%", marginLeft: "30%",height:"auto" }}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                multiline

                error={validatedTitle}
                value={NewData.title}
                onChange={(e) => {
                  setNewData({ ...NewData, title: e.target.value });
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
                  setNewData({ ...NewData, body: e.target.value });

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
                // href="/updateUser"
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
      </>
      );
}

export default page;
