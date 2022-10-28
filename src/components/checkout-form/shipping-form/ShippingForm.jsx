import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRef } from 'react';
import CustomButton from '../../ui/Button/CustomButton';
import CustomTextField from '../CustomTextField';
import styles from './ShippingForm.module.scss';

const ShippingForm = ({ nextStep }) => {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const phoneRef = useRef('');
  const addressRef = useRef('');
  const postalCodeRef = useRef('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      postalCode: postalCodeRef.current.value,
    };

    console.log('Shipping Form Data: ', data);
    nextStep();
  };

  return (
    <Box component='form'>
      <Typography variant='h6' gutterBottom fontWeight={400}>
        Shipping Address
      </Typography>

      <Grid container spacing={3}>
        <CustomTextField ref={firstNameRef} label={'First Name*'} />
        <CustomTextField ref={lastNameRef} label={'Last Name*'} />
        <CustomTextField ref={emailRef} label={'Email Address*'} />
        <CustomTextField ref={phoneRef} label={'Phone Number*'} />
        <CustomTextField ref={addressRef} label={'Address*'} />
        <CustomTextField ref={postalCodeRef} label={'Postal Code*'} />
      </Grid>

      <Box className={styles['shipping-form__btn-group']} component='div'>
        <Link href='/cart'>
          <a className={styles['shipping-form__link']}>
            <CustomButton label='Back To Cart' variant='outlined' />
          </a>
        </Link>
        <CustomButton handleClick={handleFormSubmit} label='Next' />
      </Box>
    </Box>
  );
};

export default ShippingForm;
