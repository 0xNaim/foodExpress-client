import { Box, Paper } from '@mui/material';
import Head from 'next/head';
import ShippingForm from '../components/checkout-form/ShippingForm';
import Layout from '../components/layout';
import styles from '../styles/Checkout.module.scss'

const Checkout = () => {
  

  return (
    <>
      <Head>
        <title>Checkout || FoodExpress</title>
      </Head>

      <Layout>
        <Box className={styles.checkout__wrapper} component='main' maxWidth={'md'}>
          <Paper className={styles.checkout__paper}>
            <ShippingForm />
          </Paper>
        </Box>
      </Layout>
    </>
  );
};

export default Checkout;
