/* eslint-disable react/jsx-key */
import {
  Box,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Checkout.module.scss';
import PaymentForm from '../components/checkout-form/payment-form/PaymentForm';
import ShippingForm from '../components/checkout-form/shipping-form/ShippingForm';
import useAuth from '../hooks/useAuth';
import useMultiStepForm from '../hooks/useMultiStepForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();

  const { currentStepIndex, nextStep, backStep, isFirstStep } =
    useMultiStepForm([<ShippingForm />, <PaymentForm />]);

  if (!isLoggedIn) {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Checkout || FoodExpress</title>
      </Head>

      <Box
        className={styles.checkout__wrapper}
        component='main'
        maxWidth={'md'}
      >
        <Paper className={styles.checkout__paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper className={styles.stepper} activeStep={currentStepIndex}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {isFirstStep ? (
            <ShippingForm nextStep={nextStep} />
          ) : (
            <PaymentForm nextStep={nextStep} backStep={backStep} />
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Checkout;
