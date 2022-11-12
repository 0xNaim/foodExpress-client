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
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

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

  // Alert handler
  // const handleOpenSnackbar = () => setOpenSnackbar(true);
  // const handleCloseSnackbar = () => setOpenSnackbar(false);

  if (isError) {
    // setMessage('Order failed!');
    // setSeverity('error');
    // handleOpenSnackbar();
    alert('Order failed!');
  }

  if (!isError && isSuccess) {
    // setMessage('Order confirmed, thank you!');
    // setSeverity('success');
    // setOpenSnackbar(true);
    alert('Order confirmed, thank you!');
    dispatch(resetCart());
    dispatch(resetForm());
    router.push('/');
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
              isLoading
                ? 'Processing...'
                : `Pay ${getTotalPrice(cart) + shippingCost}/-`
            }
            handleClick={handlePayment}
            disabled={!stripe || !elements || payDisable || isLoading}
          />
        </Box>
      </Box>

      {/* {isSuccess && (
        <Notify
          openSnackbar={handleOpenSnackbar}
          closeSnackbar={handleCloseSnackbar}
          message={message}
          severity={severity}
        />
      )} */}

      {error && (
        <Notify
          openSnackbar={handleOpenSnackbar}
          closeSnackbar={handleCloseSnackbar}
          message={message}
          severity={severity}
        />
      )}
    </>
  );
};

export default PaymentForm;
