import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputAdornment,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useGetProfileQuery } from '../../services/profile/profileApi';
import styles from '../../styles/Profile.module.scss';

const Profile = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    router.push('/');
  }

  // get user
  const { data: user, isLoading, isSuccess } = useGetProfileQuery();

  const [editMode, setEditMode] = useState(false);

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

  // handle edit mode
  const handleEditMode = () => setEditMode(true);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <>
      <Head>
        <title>Profile || FoodExpress</title>
      </Head>

      {isLoading && <Typography variant='body2'>Loading...</Typography>}

      {!isLoading && isSuccess && (
        <form>
          <FormGroup>
            <Box className={styles.container}>
              <Typography className={styles.head} variant='h3'>
                My{' '}
                <Box component='span' color='primary'>
                  Profile
                </Box>
              </Typography>
              <Box>
                {editMode ? (
                  <Button
                    variant='contained'
                    onClick={handleSubmit}
                    color='primary'
                    disableRipple
                    size='small'
                    sx={{
                      mr: 3,
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    onClick={handleEditMode}
                    variant='contained'
                    size='small'
                    sx={{
                      mr: 3,
                    }}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  disableRipple
                  onClick={() => router.push('/profile/orders')}
                >
                  My Orders
                </Button>
              </Box>
            </Box>
            <Typography variant='body1'>Personal Information</Typography>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
              <TextField
                type='text'
                multiline
                maxRows={2}
                defaultValue={user?.username}
                value={values?.firstName}
                onChange={handleChange}
                placeholder='First Name'
                fullWidth
                name='firstName'
                disabled={!editMode}
              />
            </FormControl>

            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
              <TextField
                placeholder='Last Name'
                type='text'
                multiline
                maxRows={2}
                defaultValue={user?.lastName}
                value={values?.lastName}
                onChange={handleChange}
                fullWidth
                name='lastName'
                disabled={!editMode}
              />
            </FormControl>
            <Typography variant='body1'>Email Address</Typography>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant='outlined'>
              <TextField
                type='email'
                defaultValue={user?.email}
                multiline
                maxRows={2}
                value={values?.email}
                onChange={handleChange}
                fullWidth
                name='email'
                disabled
              />
            </FormControl>
            <Typography variant='body1'>Address</Typography>
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
                disabled={!editMode}
              />
            </FormControl>
            <Typography variant='body1'>Password</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth variant='outlined'>
              <TextField
                label='Password'
                type={values.showPassword ? 'text' : 'password'}
                value={values?.password}
                onChange={handleChange}
                name='password'
                disabled={!editMode}
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
      )}
    </>
  );
};

export default Profile;
