import axios from "axios";

//const dispatch = useDispatch();

const checkIfUserLoggedIn = async () => {
  const { data } = await axios.post("http://localhost:3000/api/user");

  return data;
};

export default checkIfUserLoggedIn;
