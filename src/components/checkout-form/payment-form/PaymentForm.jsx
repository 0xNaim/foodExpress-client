import { Box, Divider } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../../redux/features/cart/cartSlice';
import { resetForm } from '../../../redux/features/checkout/checkoutSlice';
import { useCreateOrderMutation } from '../../../services/order/orderApi';
import getTotalPrice from '../../../utils/getTotalPrice';
import CustomButton from '../../ui/Button/CustomButton';
import Notify from '../../ui/notify/Notify';
import ReviewItems from '../ReviewItems';
import styles from './PaymentForm.module.scss';

const PaymentForm = ({ backStep }) => {
  const { cart } = useSelector((state) => state.cart);
  const { shippingAddress, shippingCost } = useSelector(
    (state) => state.checkout
  );
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();
  const dispatch = useDispatch();

  const [payDisable, setPayDisable] = useState(true);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  // Alert handler
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Handle payment
  const handlePayment = async (e) => {
    e.preventDefault();
    setPayDisable(true);

    if (elements == null) return;

    // Generate token
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setMessage('Payment failed!');
      setSeverity('error');
      setError(true);
    }

    const data = {
      items: cart,
      amount: getTotalPrice(cart) + shippingCost,
      shippingAddress,
      token: payload?.token?.id,
    };

    createOrder(data);
  };

  if (isError) {
    alert('Order failed!');
  }

  if (!isError && isSuccess) {
    dispatch(resetCart());
    dispatch(resetForm());
    router.push('/checkout/success');
  }

  return (
    <>
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
            label={
              isLoading && payDisable
                ? 'Processing...'
                : `Pay ${getTotalPrice(cart) + shippingCost}/-`
            }
            handleClick={handlePayment}
            disabled={!stripe || !elements || payDisable || isLoading}
          />
        </Box>
      </Box>

      {error && (
        <Notify
          openSnackbar={error}
          closeSnackbar={handleCloseSnackbar}
          message={message}
          severity={severity}
        />
      )}
    </>
  );
};

export default PaymentForm;
