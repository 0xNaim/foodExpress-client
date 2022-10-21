import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './SubHeader.module.scss';

const SubHeader = () => {
  return (
    <>
      <Container maxWidth='xl' className={styles['sub-header__container']}>
        <Grid container>
          <Grid item md={2.5}>
            <Box component='span' className={styles['sub-header__btn']}>
              All Categories
            </Box>
          </Grid>
          <Grid item md={9.5}>
            <Box component='div' className={styles['sub-header']}>
              <Link href='/shop' passHref>
                <a className={styles['sub-header--link']}>
                  <Typography
                    className={styles['sub-header__special']}
                    variant='body1'
                  >
                    <LocalOfferIcon
                      className={styles['sub-header__special__icon']}
                    />{' '}
                    Special Prices
                  </Typography>
                </a>
              </Link>
              <Link href='/' passHref>
                <a className={styles['sub-header--link']}>
                  <Typography variant='body1'>Offers</Typography>
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
