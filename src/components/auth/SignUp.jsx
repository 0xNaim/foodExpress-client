import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useUserRegister } from '../../redux/features/auth/authApi';

const SignUp = ({ handleSignUp }) => {
  const { register, handleSubmit, watch,setError, formState: { errors } } = useForm();
  const [userRegister, { data, isLoading, error: responseError }] =useUserRegister();
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
  const onSubmit = data => {
    const {firstName,lastName,password,confirmPassword} = data;
    if (confirmPassword !== password) {
      setError('confirmPassword', { type: 'custom', message: 'password and confirm password not match' });
  } else {
    userRegister({
          userName: firstName,
          lastName,
          password,
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
            required
            id='outlined-required'
            label='First Name'
            type='text'
            multiline
            maxRows={2}
            value={values?.firstName}
            onChange={handleChange}
            fullWidth
            name='firstName'
            {...register("password", { required: true })}
          />
          {errors.firstName && <Alert severity="error">{errors.firstName?.message}</Alert>}
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
          <TextField
            required
            id='outlined-required'
            label='Last Name'
            type='text'
            multiline
            maxRows={2}
            value={values?.lastName}
            onChange={handleChange}
            fullWidth
            name='lastName'
            {...register("password", { required: true })}
          />
          {errors.lastName && <Alert severity="error">{errors.lastName?.message}</Alert>}
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
          <TextField
            required
            id='outlined-required'
            label='Email'
            type='email'
            multiline
            maxRows={2}
            value={values?.email}
            onChange={handleChange}
            fullWidth
            name='email'
            {...register("email", { required: true,pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          />
          {errors.email && <Alert severity="error">{errors.email?.message}</Alert>}
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
          <InputLabel
            required
            htmlFor='outlined-required outlined-adornment-password'
          >
            Password
          </InputLabel>
          <OutlinedInput
            required
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values?.password}
            onChange={handleChange}
            name='password'
            {...register("password", { required: true })}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values?.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
          {errors.password && <Alert severity="error">{errors.password?.message}</Alert>}
        </FormControl>
        <FormControl sx={{ m: 1 }} fullWidth variant='outlined'>
          <InputLabel
            required
            htmlFor='outlined-required outlined-adornment-password'
          >
            Password
          </InputLabel>
          <OutlinedInput
            required
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values?.password}
            onChange={handleChange}
            name='confirmPassword'
            {...register("confirmPassword", { required: true })}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values?.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='confirmPassword'
          />
          {errors.confirmPassword && <Alert severity="error">{errors.confirmPassword?.message}</Alert>}
        </FormControl>
        <FormControl sx={{ m: 1 }} variant='outlined'>
          <Button
          type="submit"
            variant='contained'
            disableRipple
            style={{
              marginTop: '40px',
              borderRadius: '14px',
              padding: '15px 20px',
            }}
          >
            Sign Up
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
