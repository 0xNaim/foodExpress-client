import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ReviewItems = () => {
  const { cart } = useSelector((state) => state.cart);

  const shippingCost = 30;
  let subTotal = 0;
  subTotal = cart.reduce((accu, curr) => accu + curr.price * curr.quantity, 0);

  return (
    <Box component={'div'}>
      <Typography variant='h6' gutterBottom fontWeight={400}>
        Order Summary
      </Typography>

      <List disablePadding>
        {cart?.map((product, index) => {
          const totalPrice = product.price * product.quantity;
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
            {subTotal + shippingCost} Tk
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default ReviewItems;
