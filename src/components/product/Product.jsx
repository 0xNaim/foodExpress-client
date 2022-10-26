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
import CustomButton from '../ui/Button/CustomButton';
import styles from './Product.module.scss';

const Product = ({ image, title, weight, regularPrice, sellPrice }) => {
  return (
    <Card className={styles.product__wrapper}>
      <Box component='div'>
        <Image
          layout='responsive'
          src={image || '/assets/anaros.jpg'}
          width={100}
          height={100}
          alt={title || 'anaros'}
        />
      </Box>

      <CardContent>
        <Box className={styles.product__content} component='div'>
          <Typography
            className={styles['product__content--title']}
            variant='body1'
            gutterBottom
          >
            {(title || 'Anaros').substring(0, 20)}
          </Typography>

          <Box className={styles.product__details__wrapper} component='div'>
            <Box className={styles.product__details} component='div'>
              <Box className={styles.product__weight} component='div'>
                {weight || '1 pcs'}
              </Box>
              <Box className={styles.product__price} component='div'>
                {sellPrice || '80 tk'}
              </Box>
              {regularPrice && (
                <Box className={styles.product__oldPrice} component='div'>
                  {regularPrice}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>

      <CardActions>
        <Box className={styles.product__btnGroup} component='div'>
          <Button className={styles['product__details--btn']} disableRipple>
            Details&nbsp;
            <ArrowRightAltIcon />
          </Button>
          <Box className={styles['product__cart--btn']} component={'div'}>
            <CustomButton label='Add To Cart' showCartIcon fullWidth />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Product;
