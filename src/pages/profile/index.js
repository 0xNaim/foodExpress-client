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
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../redux/features/profile/profileApi';
import styles from '../../styles/Profile.module.scss';
const Notify = dynamic(() => import('../../components/ui/notify/Notify'), {
  suspense: true,
});

const Profile = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    router.push('/');
  }

  // get user
  const { data: user, isLoading, isSuccess } = useGetProfileQuery();
  const [
    updateProfile,
    {
      isError: isUpdateError,
      error: responseError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Alert handler
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  useEffect(() => {
    if (isUpdateSuccess) {
      handleOpenSnackbar();
    }

    if (isUpdateError) {
      handleOpenSnackbar();
    }
  }, [isUpdateError, isUpdateSuccess]);

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
  const handleFormSubmit = (data) => {
    const { password } = data;
    const id = user?.id;

    const payload = {
      username: values?.firstName || user?.username,
      lastName: values?.lastName || user?.lastName,
      phone: values?.phone,
      address: values?.address,
      password,
    };

    updateProfile({ id, payload });
    setEditMode(false);
  };

  return (
    <>
      <Head>
        <title>Profile || FoodExpress</title>
      </Head>

      {isLoading && <Typography variant="body2">Loading...</Typography>}

      {!isLoading && isSuccess && (
        <form className={styles.profile__wrapper}>
          <FormGroup>
            <Box className={styles.header}>
              <Typography className={styles.head} variant="h3">
                My{' '}
                <Box component="span" color="primary">
                  Profile
                </Box>
              </Typography>
              <Box>
                {editMode ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit(handleFormSubmit)}
                    color="primary"
                    disableRipple
                    size="small"
                    sx={{
                      mr: 3,
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    onClick={handleEditMode}
                    variant="contained"
                    size="small"
                    sx={{
                      mr: 3,
                    }}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  disableRipple
                  onClick={() => router.push('/profile/orders')}
                >
                  My Orders
                </Button>
              </Box>
            </Box>
            <Typography variant="body1">Personal Information</Typography>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined">
              <TextField
                type="text"
                multiline
                maxRows={2}
                defaultValue={user?.username}
                value={values.firstName}
                onChange={handleChange}
                placeholder="First Name"
                fullWidth
                name="firstName"
                disabled={!editMode}
              />
            </FormControl>

            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined">
              <TextField
                placeholder="Last Name"
                type="text"
                multiline
                maxRows={2}
                defaultValue={user?.lastName}
                value={values.lastName}
                onChange={handleChange}
                fullWidth
                name="lastName"
                disabled={!editMode}
              />
            </FormControl>

            <Typography variant="body1">Email Address</Typography>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined">
              <TextField
                type="email"
                value={user?.email}
                multiline
                maxRows={2}
                onChange={handleChange}
                fullWidth
                name="email"
                disabled
              />
            </FormControl>

            <Typography variant="body1">Phone</Typography>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined">
              <TextField
                type="text"
                multiline
                maxRows={2}
                defaultValue={user?.phone}
                value={values.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                fullWidth
                name="phone"
                disabled={!editMode}
              />
            </FormControl>

            <Typography variant="body1">Address</Typography>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth variant="outlined">
              <TextareaAutosize
                minRows={5}
                placeholder="write your address"
                type="text"
                multiline="true"
                defaultValue={user?.address}
                value={values.address}
                onChange={handleChange}
                fullwidth="true"
                name="address"
                disabled={!editMode}
              />
            </FormControl>
            <Typography variant="body1">Password</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth variant="outlined">
              <TextField
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                {...register('password', {
                  minLength: 6,
                })}
                defaultValue=""
                error={errors?.password}
                helperText={errors?.password && 'Password must be 6 characters'}
                disabled={!editMode}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
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

      {isUpdateError && (
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={handleCloseSnackbar}
          message={responseError?.data?.error?.message}
          severity="error"
        />
      )}

      {isUpdateSuccess && (
        <Notify
          openSnackbar={openSnackbar}
          closeSnackbar={handleCloseSnackbar}
          message={'Profile Updated'}
          severity="success"
        />
      )}
    </>
  );
};

export default Profile;
