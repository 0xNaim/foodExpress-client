import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../../../../public/assets/empty.png';
import useAuth from '../../../hooks/useAuth';
import { removeFromCart } from '../../../redux/features/cart/cartSlice';
import getTotalPrice from '../../../utils/getTotalPrice';
import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';
import CartItems from '../../cart-items/CartItems';
import Modal from '../../modal/Modal';
import CustomButton from '../../ui/button/CustomButton';
import Notify from '../../ui/notify/Notify';
import MyDrawer from '../Drawer';
import styles from './CartDrawer.module.scss';

const CartDrawer = ({ cartDrawer, toggleCartDrawer }) => {
  const { cart } = useSelector((state) => state.cart);
  const { shippingCost } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const [authAlert, setAuthAlert] = useState(null);
  const [openAuthAlert, setOpenAuthAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [signUp, setSignUp] = useState(false);

  // Auth check
  const isLoggedIn = useAuth();

  // Notify handler
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Auth alert handler
  const handleOpenAuthAlert = () => setOpenAuthAlert(true);
  const handleCloseAuthAlert = () => setOpenAuthAlert(false);

  // modal handler
  const handleOpen = () => {
    setOpenModel(true);
    setAuthAlert('Please Login Before Checkout');
    handleOpenAuthAlert();
  };
  const handleClose = () => setOpenModel(false);

  // handle signup
  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  // Remove item from the cart
  const handleRemoveFromCart = (payload) => {
    dispatch(removeFromCart(payload));
    setMessage('Product Removed From The Cart');
    handleOpenSnackbar();
  };

  return (
    <>
      <MyDrawer open={cartDrawer} onClose={toggleCartDrawer} anchor='right'>
        <Box className={styles['cart__wrapper']} component='div'>
          <Typography
            className={styles['cart__title']}
            variant='h5'
            textAlign={'center'}
          >
            Shopping Cart
          </Typography>
          <Divider />

          <Box className={styles['cart__content']} component='div'>
            <CartItems handleRemoveFromCart={handleRemoveFromCart} />
          </Box>

          {cart?.length === 0 && (
            <Box className={styles.empty__cart} component='div'>
              <Image
                src={EmptyCart}
                width={150}
                height={150}
                alt='Empty Cart'
              />
              <Typography variant='subtitle1'>Your cart is empty!</Typography>
            </Box>
          )}

          {cart?.length > 0 && <Divider className={styles.separator} />}

          {cart?.length > 0 && (
            <Box className={styles['cart__btnGroup']} component='div'>
              <Box className={styles['cart__price__wrapper']} component='div'>
                <Typography
                  className={styles['cart__subtotal']}
                  variant='body1'
                >
                  Total + Shipping:
                </Typography>
                <Typography className={styles['cart__price']} variant='body1'>
                  {getTotalPrice(cart) + shippingCost} Tk
                </Typography>
              </Box>

              <Box className={styles['btn__wrapper']}>
                <Link href={'/cart'}>
                  <a className={styles['link']}>
                    <Box className={styles['cart__btn']} component='div'>
                      <CustomButton
                        label='View Cart'
                        variant='outlined'
                        handleClick={toggleCartDrawer}
                        fullWidth
                      />
                    </Box>
                  </a>
                </Link>

                {isLoggedIn ? (
                  <Link href='/checkout'>
                    <a className={styles['link']}>
                      <Box className={styles['cart__btn']} component='div'>
                        <CustomButton
                          label='Checkout'
                          handleClick={toggleCartDrawer}
                          fullWidth
                        />
                      </Box>
                    </a>
                  </Link>
                ) : (
                  <Box className={styles['cart__btn']} component='div'>
                    <CustomButton
                      label='Checkout'
                      handleClick={handleOpen}
                      fullWidth
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </MyDrawer>

      <Modal openModel={openModel} handleClose={handleClose}>
        {signUp ? (
          <SignUp handleSignUp={handleSignUp} />
        ) : (
          <SignIn handleClose={handleClose} handleSignUp={handleSignUp} />
        )}
      </Modal>

      {authAlert && (
        <Notify
          openSnackbar={openAuthAlert}
          closeSnackbar={handleCloseAuthAlert}
          message={authAlert}
          severity='error'
        />
      )}

      <Notify
        openSnackbar={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
        message={message}
        severity='error'
      />
    </>
  );
};

export default CartDrawer;
