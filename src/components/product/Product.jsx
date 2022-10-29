import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import CartBtn from '../ui/Button/CartBtn';
import styles from './Product.module.scss';


const Product = (props) => {
  const { product,handleOpen} = props;
  return (
    <Card className={styles.product__wrapper}>
      <Box component='div'>
        <Image
          layout='responsive'
          src={'/assets/anaros.jpg'}
          width={100}
          height={100}
          alt={product.title || 'anaros'}
        />
      </Box>

      <CardContent>
        <Box className={styles.product__content} component='div'>
          <Typography
            className={styles['product__content--title']}
            variant='body1'
            gutterBottom
          >
            {(product.title || 'Anaros').substring(0, 20)}
          </Typography>

          <Box className={styles.product__details__wrapper} component='div'>
            <Box className={styles.product__details} component='div'>
              <Box className={styles.product__weight} component='div'>
                {product.weight || '1 pcs'}
              </Box>
              <Box className={styles.product__price} component='div'>
                {product.sellPrice || '80 tk'}
              </Box>
              {product.regularPrice && (
                <Box className={styles.product__oldPrice} component='div'>
                  {product.regularPrice}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CardActions>
        <Box className={styles.product__btnGroup} component='div'>
          <Button onClick={handleOpen} className={styles['product__details--btn']} disableRipple>
            Details&nbsp;
            <ArrowRightAltIcon />
          </Button>
          <Box className={styles['product__cart--btn']} component={'div'}>
            <CartBtn showCartIcon />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Product;
