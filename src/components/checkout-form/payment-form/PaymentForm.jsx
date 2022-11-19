import { Box, Divider } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../../redux/features/cart/cartSlice';
import { resetForm } from '../../../redux/features/checkout/checkoutSlice';
import { useCreateOrderMutation } from '../../../services/order/orderApi';
import getTotalPrice from '../../../utils/getTotalPrice';
import CustomButton from '../../ui/button/CustomButton';
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  // Alert handler
  const handleOpenSnackbar = () => setOpenSnackbar(true);
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

  useEffect(() => {
    if (isSuccess) {
      setMessage('Order has been confirmed');
      setSeverity('success');
      handleOpenSnackbar();
      dispatch(resetCart());
      dispatch(resetForm());
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }

    if (isError) {
      setMessage('Order has been failed');
      setSeverity('error');
      handleOpenSnackbar();
    }
  }, [isError, isSuccess, dispatch, router]);

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

      {isError ||
        (isSuccess && (
          <Notify
            openSnackbar={openSnackbar}
            closeSnackbar={handleCloseSnackbar}
            message={message}
            severity={severity}
          />
        ))}
    </>
  );
};

export default PaymentForm;
