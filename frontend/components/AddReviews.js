import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { reviewActions } from "../store/slices/ReviewSlice";
import style from "../src/styles/Home.module.css";
import axios from "axios";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const AddReviews = ({ business }) => {
  const dispatch = useDispatch();
  const stars = useSelector((state) => state.review.stars);
  const title = useSelector((state) => state.review.title);
  const comment = useSelector((state) => state.review.comment);

  const submitHandler = () => {
    const csrftoken = getCookie("csrftoken");

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    };

    const body = {
      title,
      content: comment,
      stars,
      business: business.url,
    };

    axios.post("http://localhost:8000/reviews/", body, config);

    dispatch(reviewActions.setStars(""));
    dispatch(reviewActions.setComment(""));
    dispatch(reviewActions.setTitle(""));
  };

  return (
    <Grid container className="mt-3 mb-6" columns={6} rowGap="0.5rem">
      <Grid item xs={6}>
        <Typography variant="h6" className="mb-1">
          Drop A Review
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="stars">Stars</InputLabel>
          <Select
            labelId="stars"
            id="starsComponent"
            label="Stars"
            onChange={(e) => dispatch(reviewActions.setStars(e.target.value))}
            value={stars}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={1.5}>1.5</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3.5}>3.5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={4.5}>4.5</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            label="Title"
            id="titleComponent"
            onChange={(e) => dispatch(reviewActions.setTitle(e.target.value))}
            value={title}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            label="Tell us abouty your experience here"
            id="commentComponent"
            multiline
            minRows={4}
            onChange={(e) => dispatch(reviewActions.setComment(e.target.value))}
            value={comment}
          />
        </FormControl>
      </Grid>
      <Button variant="contained" className={style.btn} onClick={submitHandler}>
        Write a Review
      </Button>
    </Grid>
  );
};

export default AddReviews;
