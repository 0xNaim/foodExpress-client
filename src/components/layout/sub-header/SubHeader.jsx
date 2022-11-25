import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './SubHeader.module.scss';

const SubHeader = () => {
  return (
    <>
      <Container maxWidth='xl' className={styles['sub-header__container']}>
        <Grid container>
          <Grid
            className={styles['sub-header__btn__wrapper']}
            item
            xs={0}
            md={2}
          >
            <Box component='span' className={styles['sub-header__btn']}>
              All Categories
            </Box>
          </Grid>
          <Grid item xs={12} md={10}>
            <Box component='div' className={styles['sub-header']}>
              <Link href='/special-price' passHref>
                <a className={styles['sub-header--link']}>
                  <Typography
                    className={styles['sub-header__special']}
                    variant='body1'
                  >
                    <LocalOfferIcon
                      className={styles['sub-header__special__icon']}
                    />
                    Special Prices
                  </Typography>
                </a>
              </Link>
              <Link href='/products' passHref>
                <a className={styles['sub-header--link']}>
                  <Typography variant='body1'>Shop</Typography>
                </a>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider className={styles.divider} />
    </>
  );
};

export default SubHeader;
