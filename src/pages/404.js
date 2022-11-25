import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/404.module.scss';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 || Page Not Found</title>
      </Head>

      <Box className={styles['not-found__wrapper']}>
        <Image
          src={'/assets/404.gif'}
          width={400}
          height={350}
          alt="Page Not Found"
        />
        <Typography variant="h4" textAlign={'center'}>
          Page Not Found
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
