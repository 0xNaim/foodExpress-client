import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import getTotalPrice from '../../utils/getTotalPrice';

const ReviewItems = () => {
  const { cart } = useSelector((state) => state.cart);
  const { shippingCost } = useSelector((state) => state.checkout);

  return (
    <Box component={'div'}>
      <Typography variant='h6' gutterBottom fontWeight={400}>
        Order Summary
      </Typography>

      <List disablePadding>
        {cart?.map((product, index) => {
          const totalPrice = product.quantity * product.price
          return (
            <ListItem key={index}>
              <ListItemText
                primary={product.title}
                secondary={`${product.quantity} x ${product.price} Tk`}
              />
              <Typography variant='body2'>{totalPrice} Tk</Typography>
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemText primary='Total + Shipping Cost:' />
          <Typography variant='subtitle1' fontWeight={700}>
            {getTotalPrice(cart) + shippingCost} Tk
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default ReviewItems;
