import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../../styles/Order.module.scss';

const Order = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  // form value state
  const [values, setValues] = useState({
    showPassword: false,
  });

  // form value get handle
  const handleChange = (e) => {
    const newValue = { ...values };
    (newValue[e.target.name] = e.target.value), setValues(newValue);
  };
  // password show and hide handle
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  //handle submit

  const onSubmit = (data) => {
    const { firstName, lastName, email, password, address } = data;
  };

  //from style
  const style = {
    p: { xs: 2, md: 6 },
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={style}>
          <div className={styles.container}>
            <h2 className={styles.head}>Order Details</h2>
            <div className={styles.common}>
              <p>Total Items</p>
              <p>5</p>
            </div>
            <div className={styles.common}>
              <p>Total Price</p>
              <p>5600 tk</p>
            </div>
            <div className={styles.common}>
              <p>Shipping Price</p>
              <p>35 tk</p>
            </div>
          </div>
          <hr style={{ margin: 1, opacity: '.3' }} />
          <div className={styles.totalAmount}>
            <p>Total Amount</p>
            <p>599 tk</p>
          </div>
          <h3 className={styles.payment}>Payment</h3>
          <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
            <TextField
              label='Name*'
              type='text'
              multiline
              maxRows={2}
              value={values?.firstName}
              onChange={handleChange}
              fullWidth
              name='firstName'
              {...register('firstName', { required: 'First Name is Required' })}
              error={errors.firstName?.message}
              helperText={errors.firstName?.message}
            />
          </FormControl>
          <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
            <TextField
              label='Email*'
              type='email'
              multiline
              maxRows={2}
              value={values?.email}
              onChange={handleChange}
              fullWidth
              name='email'
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
            />
          </FormControl>

          <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
            <TextareaAutosize
              minRows={5}
              placeholder='write your address'
              type='text'
              multiline
              value={values?.address}
              onChange={handleChange}
              fullWidth
              name='address'
              {...register('address', { required: 'address is Required' })}
              error={errors.address?.message}
              helperText={errors.address?.message}
            />
          </FormControl>

          <Grid container>
            <Grid item md='4' sx={{ m: 'auto', mt: 1 }}>
              <FormControl fullWidth>
                <Select
                  {...register('paymentMethod', {
                    required: 'paymentMethod is Required',
                  })}
                  id='demo-simple-select'
                  value={values?.paymentMethod}
                  onChange={handleChange}
                  name='paymentMethod'
                >
                  <MenuItem value='card'>Card</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md='6' sx={{ m: 'auto', mt: 1 }}>
              <FormControl fullWidth>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  sx={{ borderRadius: '9px', padding: '10px 20px', mt: 3 }}
                >
                  Update
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>
      </form>
    </>
  );
};
export default Order;
