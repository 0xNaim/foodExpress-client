import { Box, Divider } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import getTotalPrice from '../../../utils/getTotalPrice';
import CustomButton from '../../ui/Button/CustomButton';
import ReviewItems from '../ReviewItems';
import styles from './PaymentForm.module.scss';

const PaymentForm = ({ backStep }) => {
  const { cart } = useSelector((state) => state.cart);
  const { shippingAddress, shippingCost } = useSelector(
    (state) => state.checkout
  );
  const [payDisable, setPayDisable] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  // Handle payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (elements == null) return;

    // Generate token
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    const data = {
      items: cart,
      amount: totalPrice + shipping,
      token: payload?.token?.id,
    };

    console.log(data);
  };

  return (
    <Box component='div'>
      <ReviewItems />
      <Divider />
      <Box component='br' />

      <CardElement
        onChange={(e) => {
          if (e.complete) {
            setPayDisable(false);
          } else {
            setPayDisable(true);
          }
        }}
      />
      <Box className={styles.paymentForm__btnGroup} component='div'>
        <CustomButton
          label={'Back'}
          handleClick={backStep}
          variant='outlined'
        />
        <CustomButton
          label={`Pay $${getTotalPrice(cart) + shippingCost}`}
          handleClick={handlePayment}
          disabled={!stripe || !elements || payDisable}
        />
      </Box>
    </Box>
  );
};

export default PaymentForm;
