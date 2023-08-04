import Layout from "../../components/Layout";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import axios from "axios";

const App = ({ data }) => {
  const router = useRouter();

  const handleCategoryClick = (slug) => {
    router.push(`/category/${slug}`);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.slug}>
            <Card onClick={() => handleCategoryClick(item.slug)}>
              <CardActionArea>
                <CardHeader
                  avatar={<Avatar>C</Avatar>}
                  title={`${item.name}`}
                  subheader={`View All ${item.name} Business`}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get("http://127.0.0.1:8000/category");

  return {
    props: {
      data: data.results,
    },
  };
}

export default App;
