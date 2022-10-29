import {
  Box,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import PaymentForm from '../components/checkout-form/payment-form/PaymentForm';
import ShippingForm from '../components/checkout-form/shipping-form/ShippingForm';
import Layout from '../components/layout';
import styles from '../styles/Checkout.module.scss';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <>
      <Head>
        <title>Checkout || FoodExpress</title>
      </Head>

      <Layout>
        <Box
          className={styles.checkout__wrapper}
          component='main'
          maxWidth={'md'}
        >
          <Paper className={styles.checkout__paper}>
            <Typography variant='h4' align='center'>
              Checkout
            </Typography>
            <Stepper className={styles.stepper} activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 ? (
              <ShippingForm nextStep={nextStep} />
            ) : (
              <PaymentForm nextStep={nextStep} backStep={backStep} />
            )}
          </Paper>
        </Box>
      </Layout>
    </>
  );
};

export default Checkout;
