import { Add, Clear, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import styles from './Cart.module.scss';

const cartData = [
  {
    product: 'Soyabin Oil',
    img: '/assets/burger/1.jpg',
    price: '180 tk',
    quantity: '12 kg',
  },
  {
    img: '/assets/burger/1.jpg',
    product: 'Chal',
    price: '300 tk',
    quantity: '5 kg',
  },
  {
    img: '/assets/burger/1.jpg',
    product: 'Wheat',
    price: '250 tk',
    quantity: '5 kg',
  },
];

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

            {cartData.map((data) => (
              <Box
                component='div'
                className={styles.product_div}
                key={data.title}
              >
                <Box component='div' className={styles.product_img}>
                  <Image
                    src={data.img}
                    alt={data.title}
                    width={120}
                    height={65}
                  />
                </Box>

                <Box component='div' className={styles.product_details}>
                  <Box component='div'>
                    <Typography variant='body1'>{data.product}</Typography>
                    <Typography variant='subtitle2'>{data.price}</Typography>
                    <Typography variant='caption'>{data.quantity}</Typography>
                  </Box>

                  <Box
                    component='div'
                    className={styles.button__wrapper}
                  >
                    <IconButton disableRipple>
                      <Remove sx={{fontSize: 20}} /> 
                    </IconButton>
                    <Typography variant='body1'>1</Typography>
                    <IconButton disableRipple>
                      <Add sx={{fontSize: 20}}  />
                    </IconButton>
                  </Box>

                  <Box component='div'>
                    <IconButton disableRipple>
                      <Clear color='error' />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
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
