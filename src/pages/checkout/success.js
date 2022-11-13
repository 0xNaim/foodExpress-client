import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';

const Success = () => {
  const router = useRouter();
  const isLoggedIn = useAuth();

  if (!isLoggedIn) router.push('/');

  return (
    <Box component={'div'}>
      <Typography variant='h4'>Your order has been confirmed</Typography>
    </Box>
  );
};

export default Success;
