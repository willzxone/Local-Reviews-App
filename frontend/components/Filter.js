import { useSelector, useDispatch } from "react-redux";
import { filterActions } from "../store/slices/FilterSlice";
import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const Filter = ({ isReview }) => {
  const price = useSelector((state) => state.filter.price);
  const numReviews = useSelector((state) => state.filter.numReviews);
  const avgReview = useSelector((state) => state.filter.avgReviews);
  const stars = useSelector((state) => state.filter.stars);
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(filterActions.setAvgReviews(""));
    dispatch(filterActions.setNumReviews(""));
    dispatch(filterActions.setPrice(""));

    isReview && dispatch(filterActions.setStars(""));
  };
  return (
    <Box>
      <Grid container className="mb-3">
        <Grid item xs={12}>
          <Typography variant="h5" className="mb-1">
            Filter the Results
          </Typography>
          <Divider />
        </Grid>
      </Grid>

      <Grid container rowSpacing="0.5rem">
        {!isReview && (
          <>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="price">Price</InputLabel>
                <Select
                  labelId="price"
                  id="priceInput"
                  label="Price"
                  onChange={(e) =>
                    dispatch(filterActions.setPrice(e.target.value))
                  }
                  value={price}
                >
                  <MenuItem value={"$"}>Very Cheap</MenuItem>
                  <MenuItem value={"$$"}>Cheap</MenuItem>
                  <MenuItem value={"$$$"}>Moderate</MenuItem>
                  <MenuItem value={"$$$$"}>Expensive</MenuItem>
                  <MenuItem value={"$$$$$"}>Very Expensive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="numReviews">Number of Reviews</InputLabel>
                <Select
                  labelId="numReviews"
                  id="numReviewsInput"
                  label="Number of Reviews"
                  onChange={(e) =>
                    dispatch(filterActions.setNumReviews(e.target.value))
                  }
                  value={numReviews}
                >
                  <MenuItem value={5}>5+</MenuItem>
                  <MenuItem value={10}>10+</MenuItem>
                  <MenuItem value={15}>15+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="avgReview">Average Review</InputLabel>
                <Select
                  labelId="avgReview"
                  id="avgReviewInput"
                  label="Average Review"
                  onChange={(e) =>
                    dispatch(filterActions.setAvgReviews(e.target.value))
                  }
                  value={avgReview}
                >
                  <MenuItem value={3}>3+ Stars</MenuItem>
                  <MenuItem value={4}>4+ Stars</MenuItem>
                  <MenuItem value={5}>5 Stars</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        {isReview && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="reviews">Review</InputLabel>
              <Select
                labelId="reviews"
                label="Review"
                value={stars}
                onChange={(e) =>
                  dispatch(filterActions.setStars(e.target.value))
                }
              >
                <MenuItem value={1}>1+ Stars</MenuItem>
                <MenuItem value={2}>2+ Stars</MenuItem>
                <MenuItem value={3}>3+ Stars</MenuItem>
                <MenuItem value={4}>4+ Stars</MenuItem>
                <MenuItem value={5}>5 Stars</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item>
          <Button variant="outlined" color="error" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filter;
