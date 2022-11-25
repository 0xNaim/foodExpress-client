import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useRef } from 'react';

// Import css files
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
const DailyProducts = dynamic(
  () => import('../components/product/daily_products/DailyProducts'),
  { suspense: true }
);
const MonthlyProducts = dynamic(
  () => import('../components/product/monthly_products/MonthlyProducts'),
  { suspense: true }
);
const SafeFoods = dynamic(
  () => import('../components/product/safe_foods/SafeFoods'),
  { suspense: true }
);

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

      <DailyProducts />
      <br />
      <MonthlyProducts />
      <br />
      <SafeFoods />
    </>
  );
};

export default Home;
