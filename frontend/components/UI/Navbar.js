import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { authActions } from "../../store/slices/AuthSlice";
import {
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardActionArea,
} from "@mui/material";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleDrawer = (value) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setToggle(value);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    console.log("IN LOGOUT");
    try {
      // remove the http only cookie
      await axios.post("http://localhost:3000/api/logout");
      // remove the access token and the user from the state
      dispatch(authActions.setUser(null));
      dispatch(authActions.setAccessToken(null));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(authActions.setError(error.response.data.message));
      } else dispatch(authActions.setError("Something Went Wrong"));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} className="mb-4">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={"left"} open={toggle} onClose={toggleDrawer(!toggle)}>
            <div style={{ minWidth: 200 }}>
              <List>
                <ListItem onClick={() => router.push("/")}>
                  <CardActionArea className="p-5 flex items-center">
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </CardActionArea>
                </ListItem>
                {user ? (
                  <ListItem onClick={logoutHandler}>
                    <CardActionArea className="p-5 flex items-center">
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" />
                    </CardActionArea>
                  </ListItem>
                ) : (
                  <>
                    <ListItem onClick={() => router.push("account/login")}>
                      <CardActionArea className="p-5 flex items-center">
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign In" />
                      </CardActionArea>
                    </ListItem>
                    <ListItem onClick={() => router.push("account/register")}>
                      <CardActionArea className="p-5 flex items-center">
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                      </CardActionArea>
                    </ListItem>
                  </>
                )}
              </List>
            </div>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Local Reviews
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
