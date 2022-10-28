import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { cartData } from '../../data/cartData';

const ReviewItems = () => {
  const shippingCost = 30;
  let subTotal = 0;
  subTotal = cartData.reduce(
    (accu, curr) => accu + curr.price.split(' ')[0] * curr.quantity,
    0
  );

  return (
    <Box component={'div'}>
      <Typography variant='h6' gutterBottom fontWeight={400}>
        Order Summary
      </Typography>

      <List disablePadding>
        {cartData?.map((product, index) => {
          const totalPrice = product.price.split(' ')[0] * product.quantity;
          return (
            <ListItem key={index}>
              <ListItemText
                primary={product.title}
                secondary={`${product.quantity} x ${product.price}`}
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
