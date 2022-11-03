import Head from 'next/head';
import React, { useRef } from 'react';
import Layout from '../components/layout';

// Import css files
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import DailyProducts from '../components/product/daily_products/DailyProducts';
import MonthlyProducts from '../components/product/monthly_products/MonthlyProducts';
import SafeFoods from '../components/product/safe_foods/SafeFoods';

const Home = () => {
  const ref = useRef(null);

  const handleNextSlide = () => {
    ref.current.slickNext();
  };

  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  // products = data && data.data.length > 0 && data.data[0].attributes.products.data;

  const buttonSX = {
    color: 'white',
    background: 'black',
    '&:hover': {
      background: 'black',
    },
  };
  return (
    <>
      <Head>
        <title>Home || FoodExpress</title>
      </Head>

      <Layout>
        <DailyProducts />
        <hr style={{ margin: '1rem', opacity: '.3' }} />
        <MonthlyProducts />
        <hr style={{ margin: '1rem', opacity: '.3' }} />
        <SafeFoods />
      </Layout>
    </>
  );
};

export default Home;
