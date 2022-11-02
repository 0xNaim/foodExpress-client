import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Button,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserLoginMutation } from '../../services/auth/authApi';

const SignIn = ({ handleSignUp }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [
    userLogin,
    { data, isLoading, isSuccess, isError, error: responseError },
  ] = useUserLoginMutation();
  // form value state
  const [values, setValues] = useState({
    showPassword: false,
  });

  const router = useRouter();

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
  //handle from submit
  const onSubmit = (data) => {
    const { email, password } = data;
    userLogin({
      identifier: email,
      password,
    });
  };

  // Redirect user to dashboard
  if (isSuccess) {
    router.push('/dashboard');
  }

  const snackbarCloseHandler = () => setOpenSnackbar(false);

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
              id='outlined-required'
              label='Email*'
              type='email'
              multiline
              maxRows={2}
              value={values?.email}
              onChange={handleChange}
              fullWidth
              name='email'
              error={errors.email?.message}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Invalid email address',
                },
              })}
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
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          {isError ? (
            <Alert severity='error'>Invalid email address or password!</Alert>
          ) : null}

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
              Sign In
            </Button>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <p>
                Don&apos;t Have An Account?{' '}
                <Button
                  disableRipple
                  onClick={handleSignUp}
                  color='primary'
                  sx={{
                    '&:hover': { background: 'none' },
                  }}
                >
                  Sign Up
                </Button>
              </p>
            </Grid>
          </Grid>
        </FormGroup>
      </form>

      {/* {isSuccess && (
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={snackbarCloseHandler}
          message={'Login Successful'}
          severity='success'
        />
      )} */}
    </>
  );
};
export default SignIn;