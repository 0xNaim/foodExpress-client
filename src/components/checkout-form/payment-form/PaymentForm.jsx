import { Box, Divider } from '@mui/material';
import CustomButton from '../../ui/Button/CustomButton';
import ReviewItems from '../ReviewItems';
import styles from './PaymentForm.module.scss';

const PaymentForm = ({ backStep }) => {
  return (
    <Box component='div'>
      <ReviewItems />
      <Divider />

      <Box className={styles.paymentForm__btnGroup} component='div'>
        <CustomButton
          label={'Back'}
          handleClick={backStep}
          variant='outlined'
        />
        <CustomButton label={'Pay'} />
      </Box>
    </Box>
  );
};

export default PaymentForm;
