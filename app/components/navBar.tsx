"use client";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { Avatar, Grid, Switch, TextField } from "@mui/material";
import { UseAppSelector } from "@/Redux/store";
import { getUserLocalStorge, setUserLocalStorge } from "@/data/local/webData";
import {useSelector, useDispatch} from 'react-redux'
import {  PaletteMode } from '@mui/material';
import { changeTheme, settings } from "@/Redux/featuers/settings";
export default function navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const user = UseAppSelector((state) => state.currentUser.value);
  const [scrimg, setScrimg] = useState("");
  const [theme, setTheme] = useState(true);
  
  
  const dispatch = useDispatch()
  const handleClose = () => {
    setIsOpen(false);
    setAnchorElUser(null);
  };
  const handleTheme = (e: any) => {
    setTheme(e.target.checked);
    setUserLocalStorge("theme", e.target.checked ? "dark" : "light");
    dispatch(changeTheme(  e.target.checked ? "dark" : "light"))
  };

  useEffect(() => {
    setTheme(getUserLocalStorge("theme") == "dark" ? true : false);
    setScrimg("https://picsum.photos/200/300?random=" + `${user.id}`);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Button href="/" sx={{ color: "white" }}>
              EX.Next MUI
            </Button>
          </Typography>{" "}
          {/* <TextField
            sx={{ marginRight: "3%" }}
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            href={`/user/search?value=${value}`}
          >
            search
          </Button> */}
          <Switch
            checked={theme}
            onChange={(e) => {
              handleTheme(e);
            }}
          />
          <IconButton
            sx={{ p: 0 }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => {
              setIsOpen(true);
              setAnchorElUser(event.currentTarget);
            }}
            color="inherit"
          >
            <Avatar src={scrimg} sx={{ width: 40, height: 40 }} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={null}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isOpen}
            onClose={handleClose}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton href="/">
                  <ListItemText primary={"home"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href={"/user/" + `${user.id}`}>
                  <ListItemText primary={"myAccount"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/user">
                  <ListItemText primary={"users"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/signout">
                  <ListItemText primary={"Sign out"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Menu>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpenMenu((show) => !show)}
          >
            <MenuIcon />
            <Box
              sx={{ width: "auto" }}
              role="presentation"
              onKeyDown={() => () => setIsOpenMenu(false)}
            >
              <Drawer
                anchor={"right"}
                open={isOpenMenu}
                onClose={() => () => setIsOpenMenu((show) => !show)}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton href="/">
                      <ListItemText primary={"home"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href={"/user/" + `${user.id}`}>
                      <ListItemText primary={"myAccount"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href="/user">
                      <ListItemText primary={"users"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href="/product">
                      <ListItemText primary={"products"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href="/post">
                      <ListItemText primary={"posts"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton href="/signout">
                      <ListItemText primary={"Sign out"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Drawer>
            </Box>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
