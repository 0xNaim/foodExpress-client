import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material';
import CartItems from './cart-items/CartItems';
import styles from './CartView.module.scss';

const cartDetailsData = [
  {
    title: 'Total Items',
    amount: 5,
  },
  {
    title: 'Total Price',
    amount: '5 tk',
  },
  {
    title: 'Shipping Price',
    amount: '50 tk',
  },
];

const CartView = () => {
  return (
    <Box component='div' className={styles.cart_wrapper}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8}>
          <Box component='div' className={styles.left_part}>
            <Typography variant={'h5'} fontWeight={'700'} marginBottom={'1rem'}>
              Shopping Cart
            </Typography>
            <CartItems showQuantity />
          </Box>
        </Grid>

        {/* <Divider orientation='vertical'  flexItem sx={{marginX: 5}} /> */}

        <Grid item xs={12} sm={12} md={4}>
          <Box component='div' className={styles.right_part}>
            <Typography variant={'h5'} fontWeight={'700'} marginBottom={'1rem'}>
              Cart Details
            </Typography>

            <Table>
              <TableBody>
                {cartDetailsData.map((d) => (
                  <TableRow key={d.title} className={styles.table_row}>
                    <Typography variant='body1' fontWeight={'500'}>
                      {d.title}
                    </Typography>

                    <Typography variant='body1' fontWeight={'500'}>
                      {d.amount}
                    </Typography>
                  </TableRow>
                ))}

                <hr />

                <TableRow className={styles.table_row}>
                  <Typography variant='body1' fontWeight={'500'}>
                    Total
                  </Typography>

                  <Typography variant='body1' fontWeight={'500'}>
                    5000 tk
                  </Typography>
                </TableRow>

                <TableRow className={''}>
                  <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    disableRipple
                    sx={{ borderRadius: '10px' }}
                  >
                    Submit
                  </Button>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartView;
