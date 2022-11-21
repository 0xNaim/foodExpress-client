import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserRegisterMutation } from '../../redux/features/auth/authApi';

const SignUp = ({ handleSignUp, handleClose }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [userRegister, { isLoading, isSuccess, error: responseError }] =
    useUserRegisterMutation();

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

  // Handle close modal
  if (isSuccess) {
    handleClose()
  }

  const onSubmit = (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    if (confirmPassword !== password) {
      setError('confirmPassword', {
        type: 'custom',
        message: 'password and confirm password not match',
      });
    } else {
      userRegister({
        username: firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
    }
  };

  //from style
  const style = {
    p: { xs: 2, md: 6 },
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup sx={style}>
          <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
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

          <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
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

          <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
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
              error={
                errors.email?.message || responseError?.data?.error?.message
              }
              helperText={
                errors.email?.message || responseError?.data?.error?.message
              }
            />
          </FormControl>

          <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
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

          <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
            <TextField
              type={values.showPassword ? 'text' : 'password'}
              value={values?.password}
              onChange={handleChange}
              name='confirmPassword'
              {...register('confirmPassword', {
                required: 'Confirm Password is Required',
              })}
              label='ConfirmPassword*'
              error={errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
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

          <FormControl sx={{ m: 1 }} variant='outlined'>
            <Button
              type='submit'
              variant='contained'
              disableRipple
              disabled={isLoading}
              style={{
                marginTop: '40px',
                borderRadius: '14px',
                padding: '15px 20px',
              }}
            >
              {isLoading ? <CircularProgress color='inherit' /> : 'Sign Up'}
            </Button>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <p>
                Already Have An Account?{' '}
                <Button
                  disableRipple
                  onClick={handleSignUp}
                  color='primary'
                  sx={{
                    '&:hover': { background: 'none' },
                  }}
                >
                  Sign In
                </Button>
              </p>
            </Grid>
          </Grid>
        </FormGroup>
      </form>
    </>
  );
};
export default SignUp;
