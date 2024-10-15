"use client";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Suspense, forwardRef, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../components/table";
import { usePostsQuery } from "@/Redux/featuers/postsApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUserLocalStorge } from "@/data/local/webData";
import { UseAppSelector } from "@/Redux/store";
import { CircularProgress, PaletteMode, Skeleton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function page() {

  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [postsData, setPostsData] = useState({
    posts: [
      {
        id: 0,
        title: '',
        body: '',
        userId: 0,
        tags: [''],
        reactions: 0
      },
    ],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [filtervalue, setfilterValue] = useState('');
  



  const { data, isSuccess } = usePostsQuery();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setPostsData(data);
    }
  }, [isSuccess]);

  return (
    <>
          <CssBaseline />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              marginTop: "3%",
              marginLeft: "40%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              variant="text"
              color="primary"
              sx={{
                marginLeft: "30%",
                marginTop: "30%",
                height: 50,
                width: 50,
              }}
              href={`/post/search?value=${value}`}
            >
              search
            </Button>
          </Box>

          <Grid item xs={8}>
            <Button onClick={handleOpenModal}>
              <FilterAltIcon />
            </Button>
            {loading ? (
              <Button
                onClick={() => {
                  setPostsData(data);
                  setLoading(false);
                }}
              >
                <ClearIcon />
              </Button>
            ) : null}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
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
                ) : (
                  <>
                    
                    <TextField
                      sx={{}}
                      fullWidth
                      id="Age"
                      label="Age"
                      name="Age"
                      margin="normal"
                      onChange={(e) => {
                        setfilterValue( e.target.value );
                      }}
                    />
                    <Button
                      href={`/post/filter?userID=${filtervalue}`}
                    >
                      Apply
                    </Button>
                  </>
                )}
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              href={`/post/createPost/${postsData.total+1}`}
              sx={{ marginLeft: "130%", marginTop: 1 }}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Suspense fallback={<p>...loading</p>}>
          {isSuccess ? (
            <Table pathDelete="/post/deletePost/"pathEdit="/post/" colum1="userId" colum2="title" colum3="tags"colum4="reactions" List={postsData.posts} />
            ) : (
            <>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </>
          )}
        </Suspense>
          </>
  );
}
