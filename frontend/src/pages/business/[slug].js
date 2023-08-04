import Layout from "../../../components/Layout";
import axios from "axios";
import style from "../../styles/Home.module.css";
import AverageReview from "../../../components/AverageReview";
import AddReviews from "../../../components/AddReviews";
import Filter from "../../../components/Filter";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Divider,
  CardContent,
} from "@mui/material";

export default function BusinessPage({ business, averageReview }) {
  const stars = useSelector((state) => state.filter.stars);
  return (
    <Layout>
      <Grid container className={style.root} columnSpacing="2rem">
        <Grid item xs={12} md={6}>
          <Typography variant="h3">{business.name}</Typography>
          <Typography variant="h5">{business.price_range}</Typography>
          <AverageReview value={averageReview} />
          <div className={style.description}>
            <Typography variant="p">{business.description}</Typography>
          </div>

          <AddReviews business={business} />
          <Filter isReview />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <Typography variant="h5" style={{ fontWeight: "450" }}>
              Business Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Website" secondary={business.website} />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={`${business.street_address} ${business.city}, ${business.region}`}
                />
              </ListItem>

              <ListItem>
                <ListItemText primary="Phone" secondary={business.phone} />
              </ListItem>

              <ListItem>
                <ListItemText primary="Hours" secondary={business.hours} />
              </ListItem>
            </List>
          </Card>
          <Divider style={{ marginTop: "2rem" }} />
          <Card>
            {business &&
              business.reviews &&
              business.reviews.map(
                (review) =>
                  stars <= review.stars && (
                    <Box key={review.url}>
                      <CardContent>
                        <AverageReview value={review.stars} />
                        <Typography variant="h6">{review.title}</Typography>
                        <Typography variant="subtitle1">
                          {review.content}
                        </Typography>
                      </CardContent>
                    </Box>
                  )
              )}
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const { data } = await axios.get(
    `http://127.0.0.1:8000/business?slug=${slug}`
  );

  let avgReview = null;

  if (data && data.results && data.results[0].reviews) {
    let totalReviewsStars = 0;
    for (let i = 0; i < data.results[0].reviews.length; i++) {
      totalReviewsStars =
        totalReviewsStars + Number(data.results[0].reviews[i].stars);
    }

    const inverse = 1 / 2;

    avgReview =
      Math.round(totalReviewsStars / data.results[0].reviews.length / inverse) *
      inverse;
  }

  return {
    props: {
      business: data.results[0] || null,
      averageReview: avgReview,
    },
  };
}
