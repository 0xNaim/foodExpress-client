import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import ProductDetails from '../product-details/ProductDetails';
import CustomButton from '../ui/Button/CustomButton';
import styles from './Product.module.scss';

const Product = ({ product }) => {
  const [modal, setModal] = useState(false);

  console.log(product)

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      <Card className={styles.product__wrapper}>
        <Box component='div'>
          <Image
            layout='responsive'
            src={product?.image?.data?.attributes?.url || '/assets/anaros.jpg'}
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
                  {product.sellPrice || '80 tk'} tk
                </Box>
                {product.regularPrice && (
                  <Box className={styles.product__oldPrice} component='div'>
                    {product.regularPrice} tk
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>

        <CardActions>
          <Box className={styles.product__btnGroup} component='div'>
            <Button
              onClick={openModal}
              className={styles['product__details--btn']}
              disableRipple
            >
              Details&nbsp;
              <ArrowRightAltIcon />
            </Button>
            <Box className={styles['product__cart--btn']} component={'div'}>
              <CustomButton label='Add To Cart' showCartIcon fullWidth />
            </Box>
          </Box>
        </CardActions>
      </Card>
      {/* <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            alignSelf: 'center',
            width: '50%',
            height: 'max-content',
            background: 'white',
          }}
        >
          <ProductDetails />
        </Box>
      </Modal> */}
    </>
  );
};

export default Product;
