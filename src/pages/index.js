import { Typography, Box } from '@mui/material';
import Head from 'next/head';
import Layout from '../components/layout';
import Product from '../components/product/Product';
import { useGetFeatureProductsQuery } from '../services/categoriesApi';
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { data, isLoading, isSuccess } = useGetFeatureProductsQuery();
  let products =data && data.data;

  console.log(products);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  // products = data && data.data.length > 0 && data.data[0].attributes.products.data;
  return (
    <>
      <Head>
        <title>Home || FoodExpress</title>
      </Head>

      <Layout>
        <Box sx={{width:"100%"}}>
        <h1>Home </h1>
        <Slider style={{}} {...settings}>
        {products && products.map((product, index) => (
          <Product product={product.attributes} />
        ))}
      </Slider>
        </Box>

      </Layout>
    </>
  );
};

export default Home;
