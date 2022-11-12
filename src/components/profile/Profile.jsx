import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Profile.module.scss';

const Profile = () => {
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
            <h2 className={styles.head}>
              Your <span color='primary'>Profile</span>
            </h2>
            <div>
              <Button
                variant='contained'
                color='primary'
                disableRipple
                type='submit'
                sx={{
                  mr: 3,
                  borderRadius: '9px',
                  padding: '10px 20px',
                }}
              >
                Update
              </Button>
              <Button
                variant='contained'
                color='primary'
                disableRipple
                sx={{ borderRadius: '9px', padding: '10px 20px' }}
              >
                My Order
              </Button>
            </div>
          </div>
          <h3>Personal Information</h3>
          <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
            <TextField
              label='First Name*'
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
              label='Last Name*'
              type='text'
              multiline
              maxRows={2}
              value={values?.lastName}
              onChange={handleChange}
              fullWidth
              name='lastName'
              {...register('lastName', { required: 'Last Name is Required' })}
              error={errors.lastName?.message}
              helperText={errors.lastName?.message}
            />
          </FormControl>
          <h3>Email Address</h3>
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
          <h3>Address</h3>
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
          <h3>Password</h3>
          <FormControl sx={{ mt: 1 }} fullWidth variant='outlined'>
            <TextField
              label='Password*'
              type={values.showPassword ? 'text' : 'password'}
              value={values?.password}
              onChange={handleChange}
              name='password'
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleClickShowPassword} edge='end'>
                      {values?.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </FormGroup>
      </form>
    </>
  );
};
export default Profile;
