import Layout from "../../../components/Layout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Link from "next/link";
import AverageReview from "../../../components/AverageReview";
import { CardActionArea } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "../../styles/Home.module.css";
import Filter from "../../../components/Filter";

const Category = ({ category, averageReviews }) => {
  const router = useRouter();
  const price = useSelector((state) => state.filter.price);
  const numReviews = useSelector((state) => state.filter.numReviews);
  const avgReview = useSelector((state) => state.filter.avgReviews);

  const showContent = (business) => {
    return (
      (!price || price === business.price_range) &&
      (!numReviews || business.reviews.length >= numReviews) &&
      (!avgReview || averageReviews[business.url] >= avgReview)
    );
  };

  const handleBusinessClick = (slug) => {
    router.push(`/business/${slug}`);
  };
  return (
    <Layout>
      <Grid container className={styles.root} columnSpacing="5rem">
        <Grid item xs={12} md={3}>
          <Filter />
        </Grid>

        <Grid item xs={12} md={9}>
          {category.business.map(
            (business) =>
              showContent(business) && (
                <Card
                  key={business.slug}
                  onClick={() => handleBusinessClick(business.slug)}
                >
                  <CardActionArea>
                    <Box>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography variant="h5">
                              {business.name}
                            </Typography>
                            <Typography variant="subtitle1">
                              {business.price_range}
                            </Typography>
                            <Link variant="subtitle1" href={business.website}>
                              {business.website}
                            </Link>
                            <Typography variant="subtitle1">
                              {business.phone}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              className={styles.subtitle}
                            >
                              {business.description}
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <AverageReview
                              value={averageReviews[business.url]}
                            />
                            <Typography variant="subtitle1">
                              {business.hours}
                            </Typography>
                            <Typography variant="subtitle1">
                              {business.street_address} {business.city},{" "}
                              {business.region} {business.postal_code}{" "}
                              {business.country}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              )
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps({ query: { slug } }) {
  const { data } = await axios.get(
    `http://127.0.0.1:8000/category?slug=${slug}`
  );
  let avgReviews = {};

  if (data && data.results && data.results[0].business) {
    for (let i = 0; i < data.results[0].business.length; i++) {
      let totalReviewsStars = 0;
      for (let j = 0; j < data.results[0].business[i].reviews.length; j++) {
        totalReviewsStars =
          totalReviewsStars +
          Number(data.results[0].business[i].reviews[j].stars);
      }

      const inverse = 1 / 2;

      avgReviews[data.results[0].business[i].url] =
        Math.round(
          totalReviewsStars /
            data.results[0].business[i].reviews.length /
            inverse
        ) * inverse;
    }
  }

  return {
    props: {
      category: data.results[0] || null,
      averageReviews: avgReviews,
    },
  };
}

export default Category;
