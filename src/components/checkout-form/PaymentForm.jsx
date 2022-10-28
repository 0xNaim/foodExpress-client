import { Box, Button, Divider } from '@mui/material';
import ReviewItems from './ReviewItems';

const PaymentForm = () => {
  return (
    <Box component='div'>
      <ReviewItems />
      <Divider />

      <Box
        component='div'
        sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}
      >
        <Button variant='outlined' disableRipple>
          Back
        </Button>
        <Button variant='contained' disableRipple>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;
