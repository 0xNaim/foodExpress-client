import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useState } from 'react';


const SignUp =({handleSignUp})=>{
  // form value state
    const [values, setValues] = useState({
        showPassword: false,
      });
// form value get handle
      const handleChange =(e)=>{
        const newValue = {...values}
        newValue[e.target.name]=e.target.value,
        setValues(newValue);
        
      }
// password show and hide handle
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  //from style
  const style = {
    p:6
  };
 return (
    <>
   <FormGroup sx={style}>
    <FormControl sx={{ m: 1,}} fullWidth  variant="outlined">
        <TextField
          required
          id="outlined-required"
          label="First Name"
          type="text"
          multiline
          maxRows={2}
          value={values?.firstName}
          onChange={handleChange}
          fullWidth
          name="firstName"
        />
    </FormControl>
    <FormControl sx={{ m: 1,}} fullWidth  variant="outlined">
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          type="text"
          multiline
          maxRows={2}
          value={values?.lastName}
          onChange={handleChange}
          fullWidth
          name="lastName"
        />
    </FormControl>
    <FormControl sx={{ m: 1,}} fullWidth  variant="outlined">
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          multiline
          maxRows={2}
          value={values?.email}
          onChange={handleChange}
          fullWidth
          name="email"
        />
    </FormControl>
    <FormControl sx={{ m: 1,}} fullWidth  variant="outlined">
     <InputLabel required htmlFor="outlined-required outlined-adornment-password">Password</InputLabel>
    <OutlinedInput
      required
      id="outlined-adornment-password"
      type={values.showPassword ? 'text' : 'password'}
      value={values?.password}
      onChange={handleChange}
      name="password"
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            // onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {values?.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
    />

  </FormControl>
   <FormControl sx={{ m: 1,}}  variant="outlined">
   <Button variant="contained" style={{marginTop:"40px",borderRadius:"14px",padding:"15px 20px"}}>Sign Up</Button>
   </FormControl>
   <Grid container spacing={2}>
   <Grid item xs={12} display="flex" justifyContent="center">
    <p>Don't Have Account? <Button onClick={handleSignUp} color="primary">Sign Up</Button></p>
    </Grid>
  </Grid>
  </FormGroup>
  </>
)
}
export default SignUp;