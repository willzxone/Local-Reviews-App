import { useEffect } from "react";
import Navbar from "./UI/Navbar";
import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/AuthSlice";
import checkIfUserLoggedIn from "@/isLoggedIn";

const useStyles = {
  padding: "0 3rem",
  maxWidth: "95vw",
};
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const data = await checkIfUserLoggedIn();
      dispatch(authActions.setUser(data.user));
      dispatch(authActions.setAccessToken(data.access));
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div style={useStyles}>{children}</div>
    </>
  );
};

export default Layout;
