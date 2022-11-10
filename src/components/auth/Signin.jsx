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
import { useLoginMutation } from '../../redux/features/auth/authApi';

const Signin = ({ handleSignUp }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [login, { data, isLoading, error: responseError }] =useLoginMutation();
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
  //handle from submit
  const onSubmit = data => {
    const {email,password}=data;
    login({
      email,
      password,
  });
  };
  //from style
  const style = {
    p: {xs: 2, md: 6},
  };
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup sx={style}>
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
            id='outlined-required'
            htmlFor='outlined-adornment-password'
          >
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
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
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
          {errors.password && <Alert severity="error">{errors.email?.password}</Alert>}
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
    </>
  );
};
export default Signin;
