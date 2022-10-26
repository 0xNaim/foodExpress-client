import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import CustomTextField from './CustomTextField';
import styles from './ShippingForm.module.scss';

const ShippingForm = () => {
  return (
    <Box component='form'>
      <Typography variant='h6' gutterBottom fontWeight={400}>
        Shipping Address
      </Typography>

      <Grid container spacing={3}>
        <CustomTextField label={'First Name*'} />
        <CustomTextField label={'Last Name*'} />
        <CustomTextField label={'Email Address*'} />
        <CustomTextField label={'Phone Number*'} />
        <CustomTextField label={'Address*'} />
        <CustomTextField label={'Postal Code*'} />
      </Grid>

      <Box className={styles['shipping-form__btn-group']} component='div'>
        <Link href='/cart'>
          <a className={styles['shipping-form__link']}>
            <Button
              className={styles['shipping-form__btn']}
              variant='outlined'
              disableRipple
            >
              Back To Cart
            </Button>
          </a>
        </Link>
        <Button
          className={styles['shipping-form__btn']}
          variant='contained'
          disableRipple
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ShippingForm;
