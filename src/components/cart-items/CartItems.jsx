import { Add, Clear, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styles from './CartItems.module.scss';

const CartItems = ({ showQuantity, showTotal, handleRemoveFromCart }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <>
      {cart?.map((item) => {
        const totalPrice = item.price * item.quantity;

        return (
          <Box
            className={styles.cartItems__wrapper}
            key={item.slug}
            component='div'
          >
            <Box
              component={'div'}
              className={styles.cartItems__description__wrapper}
            >
              <Image
                className={styles.cartItems__thumbnail}
                src={item.image}
                width={100}
                height={60}
                alt={item.title}
              />

              <Box className={styles.cartItems__description} component='div'>
                <Typography variant='body1'>{item.title}</Typography>
                <Typography variant='body2'>{item.weight}</Typography>
                <Typography
                  className={styles.cartItems__price__wrapper}
                  variant='body2'
                >
                  {item.quantity} x{' '}
                  <Box className={styles.cartItems__price} component='span'>
                    &nbsp;{item.price} tk
                  </Box>{' '}
                </Typography>
              </Box>
            </Box>

            {showQuantity && (
              <Box className={styles.cartItems__btn} component='div'>
                <IconButton disableRipple>
                  <Remove />
                </IconButton>
                <Typography variant='body1'>{item.quantity}</Typography>
                <IconButton disableRipple>
                  <Add />
                </IconButton>
              </Box>
            )}

            {showTotal && (
              <Box className={styles.cartItems__totalPrice} component={'div'}>
                <Typography variant='subtitle1' fontWeight={500}>
                  {totalPrice} Tk
                </Typography>
              </Box>
            )}

            <Box className={styles.clear__btn} component='div'>
              <IconButton
                onClick={() => handleRemoveFromCart({ slug: item.slug })}
                color='error'
                disableRipple
              >
                <Clear />
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default CartItems;
