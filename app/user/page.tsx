"use client";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Suspense, forwardRef, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../components/table";
import { useUsersQuery } from "@/Redux/featuers/usersApi";
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
  const [gender, setGender] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [usersData, setUsersData] = useState({
    users: [
      {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        image: "",
      },
    ],
    total: 0,
    skip: 0,
    limit: 0,
  });
  const [filtervalue, setfilterValue] = useState({ key: "", value: "" });




  const { data, isSuccess } = useUsersQuery();

  const handleGender = (event: any) => {
    setGender(event.target.value);
    setfilterValue({ key: "gender", value: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setUsersData(data);
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
              href={`/user/search?value=${value}`}
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
                  setUsersData(data);
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
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-controlled-open-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={gender}
                        label="Gender"
                        onChange={(e) => {
                          handleGender(e);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      sx={{}}
                      fullWidth
                      id="Age"
                      label="Age"
                      name="Age"
                      margin="normal"
                      onChange={(e) => {
                        setfilterValue({ key: "age", value: e.target.value });
                      }}
                    />
                    <Button
                      href={`/user/filter?key=${filtervalue.key}&value=${filtervalue.value}`}
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
              href="/user/createuser"
              sx={{ marginLeft: "130%", marginTop: 1 }}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Suspense fallback={<p>...loading</p>}>
          {isSuccess ? (
            <Table pathDelete="/user/deleteuser/" pathEdit="/user/" colum1="firstName" colum2="lastName" colum3="username"colum4="email" List={usersData.users} />
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
