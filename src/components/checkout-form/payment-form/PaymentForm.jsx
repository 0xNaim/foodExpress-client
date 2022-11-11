import { Box, Divider } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import CustomButton from '../../ui/Button/CustomButton';
import ReviewItems from '../ReviewItems';
import styles from './PaymentForm.module.scss';

const PaymentForm = ({ backStep }) => {
  const { cart } = useSelector((state) => state.cart);

  const stripe = useStripe();
  const elements = useElements();

  // Handle payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (elements == null) return;


    // Generate token
    const cardElement =  elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);
   

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  const shipping = 30;

  let totalPrice = cart.reduce(
    (accu, curr) => accu + curr.price * curr.quantity,
    0
  );

  return (
    <Box component='div'>
      <ReviewItems />
      <Divider />
      <Box component='br' />

      <CardElement />
      <Box className={styles.paymentForm__btnGroup} component='div'>
        <CustomButton
          label={'Back'}
          handleClick={backStep}
          variant='outlined'
        />
        <CustomButton
          label={`Pay $${totalPrice + shipping}`}
          handleClick={handlePayment}
          disabled={!stripe || !elements}
        />
      </Box>
    </Box>
  );
};

export default PaymentForm;
