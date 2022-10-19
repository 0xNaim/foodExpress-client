import { Box, Container, Toolbar } from '@mui/material';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Box component='footer' className={styles.footer__wrapper}>
      <Toolbar>Naim</Toolbar>
      {/* <Container maxWidth='xl'>Naim</Container> */}
    </Box>
  );
};

export default Footer;
