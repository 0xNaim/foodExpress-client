import { Box, Toolbar, Typography } from '@mui/material';
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <Box className={styles.footer__wrapper} component={'footer'}>
      <Toolbar>
        <Typography className={styles.footer__text} variant='body2'>&copy; Storefront</Typography>
      </Toolbar>
    </Box>
  );
};

export default Footer;
