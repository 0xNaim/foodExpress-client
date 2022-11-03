import { Box, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../../ui/Button/CustomButton';
import styles from './ShippingForm.module.scss';

const ShippingForm = ({ nextStep }) => {
  const { control, handleSubmit } = useForm();

  const handleFormSubmit = (e) => {
    const { firstName, lastName, email, phone, address, postalCode } = e;

    nextStep();
  };

  return (
    <Box component='form'>
      <Typography variant='h6' gutterBottom fontWeight={400}>
        Shipping Address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name='firstName'
            defaultValue={''}
            rules={{ required: 'First Name Is Required' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                variant='standard'
                label='First Name*'
                fullWidth
                {...field}
                error={errors?.firstName?.message}
                helperText={errors?.firstName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name='lastName'
            defaultValue={''}
            rules={{ required: 'Last Name Is Required' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                variant='standard'
                label='First Name*'
                fullWidth
                {...field}
                error={errors?.lastName?.message}
                helperText={errors?.lastName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name='email'
            defaultValue={''}
            rules={{ required: 'Email Address Is Required' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                variant='standard'
                label='Email Address*'
                fullWidth
                {...field}
                error={errors?.email?.message}
                helperText={errors?.email?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name='phone'
            defaultValue={''}
            rules={{ required: 'Phone Number Is Required' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                variant='standard'
                label='Phone Number*'
                fullWidth
                {...field}
                error={errors?.phone?.message}
                helperText={errors?.phone?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name='address'
            defaultValue={''}
            rules={{ required: 'Address Is Required' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                variant='standard'
                label='Address*'
                fullWidth
                {...field}
                error={errors?.address?.message}
                helperText={errors?.address?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name='postalCode'
            defaultValue={''}
            rules={{ required: 'Postal Code Is Required' }}
            render={({ field, formState: { errors } }) => (
              <TextField
                variant='standard'
                label='Postal Code*'
                fullWidth
                {...field}
                error={errors?.postalCode?.message}
                helperText={errors?.postalCode?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box className={styles['shipping-form__btn-group']} component='div'>
        <Link href='/cart'>
          <a className={styles['shipping-form__link']}>
            <CustomButton label='Back To Cart' variant='outlined' />
          </a>
        </Link>
        <CustomButton
          handleClick={handleSubmit(handleFormSubmit)}
          label='Next'
        />
      </Box>
    </Box>
  );
};

export default ShippingForm;
