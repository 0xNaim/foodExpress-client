
// import { Typography } from '@mui/material';
import Link from 'next/link'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// import Item from '@mui/material';
import Paper from '@mui/material/Paper';
import Head from 'next/head';
import Layout from '../components/layout';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Head>
        <title>Home || FoodExpress</title>
      </Head>

      <Layout>

        {/* <Typography variant='h4'>
          Home
        </Typography> */}
        <Grid style={{ padding: "1rem" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} lg={3} >

            <Card sx={{ maxWidth: "full" }}>
              <CardMedia
                sx={{
                  objectFit: "contain"
                }}
                component="img"
                height="200"
                image="https://chaldn.com/_mpimage/broiler-chicken-skin-off-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D74661&q=low&v=1&m=400&webp=1"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Link href=""><Button size="small">Share</Button></Link>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>


          </Grid>
          <Grid item xs={3}>
            <Item>2</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>3</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>4</Item>
          </Grid>
        </Grid>

      </Layout>
    </>
  );
};

export default Home;
