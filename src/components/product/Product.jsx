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
import Link from 'next/link';
import CustomButton from '../ui/button/CustomButton';
import styles from './Product.module.scss';

const Product = ({ product, handleAddToCart, discountPrice }) => {
  const payload = {
    slug: product?.slug,
    title: product?.title,
    image: product?.image?.data?.attributes?.url,
    price: product?.sellPrice,
    quantity: 1,
  };

  return (
    <>
      <Card className={styles.product__wrapper}>
        <Box component="div">
          <Image
            layout="responsive"
            src={product?.image?.data?.attributes?.url}
            width={100}
            height={100}
            alt={product?.title}
          />
        </Box>

        <CardContent>
          <Box className={styles.product__content} component="div">
            <Typography
              className={styles['product__content--title']}
              variant="body1"
              gutterBottom
            >
              {(product?.title).substring(0, 25)}
            </Typography>

            <Box className={styles.product__details__wrapper} component="div">
              <Box className={styles.product__details} component="div">
                <Box className={styles.product__weight} component="div">
                  {product?.weight}
                </Box>
                <Box className={styles.product__price} component="div">
                  {discountPrice ? product?.discountPrice : product?.sellPrice}{' '}
                  tk
                </Box>

                {product?.regularPrice && !discountPrice && (
                  <Box className={styles.product__oldPrice} component="div">
                    {`${product?.regularPrice} tk`}
                  </Box>
                )}

                {discountPrice && (
                  <Box className={styles.product__oldPrice} component="div">
                    {`${product?.sellPrice} tk`}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          <Box className={styles.product__btnGroup} component="div">
            <Link href={`/products/${product.slug}`}>
              <Button className={styles['product__details--btn']} disableRipple>
                Details&nbsp;
                <ArrowRightAltIcon />
              </Button>
            </Link>
            <Box className={styles['product__cart--btn']} component={'div'}>
              <CustomButton
                handleClick={() => handleAddToCart(payload)}
                label="Add To Cart"
                showCartIcon
                fullWidth
              />
            </Box>
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
