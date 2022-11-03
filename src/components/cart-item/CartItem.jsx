import { Add, Clear, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { cartData } from '../../data/cartData';
import styles from './CartItem.module.scss';

const CartItem = ({ showQuantity, showTotal }) => {
  return (
    <>
      {cartData?.map((data, i) => {
        const totalPrice = data.price.split(' ')[0] * data.quantity;

        return (
          <Box className={styles.cartItems__wrapper} key={i} component='div'>
            <Box
              component={'div'}
              className={styles.cartItems__description__wrapper}
            >
              <Image
                className={styles.cartItems__thumbnail}
                src={data.image}
                width={100}
                height={60}
                alt={data.title}
              />

              <Box className={styles.cartItems__description} component='div'>
                <Typography variant='body1'>{data.title}</Typography>
                <Typography variant='body2'>{data.weight}</Typography>
                <Typography
                  className={styles.cartItems__price__wrapper}
                  variant='body2'
                >
                  {data.quantity} x{' '}
                  <Box className={styles.cartItems__price} component='span'>
                    &nbsp;{data.price}
                  </Box>{' '}
                </Typography>
              </Box>
            </Box>

            {showQuantity && (
              <Box className={styles.cartItems__btn} component='div'>
                <IconButton disableRipple>
                  <Remove />
                </IconButton>
                <Typography variant='body1'>{data.quantity}</Typography>
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
              <IconButton color='error' disableRipple>
                <Clear />
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default CartItem;
