import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { footerData, footerSocial } from '../../../data/footerData';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Box component='footer' className={styles.footer__wrapper}>
      <Container maxWidth='xl'>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography className={styles.getStarted__title} variant='body1'>
              Ready to get started?
            </Typography>
            <Link href={''}>
              <a className={styles.link}>
                <Button
                  className={styles.getStarted__btn}
                  variant='contained'
                  disableRipple
                >
                  Get Started
                </Button>
              </a>
            </Link>
          </Grid>

          {footerData?.map((data, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Typography className={styles.item__title} variant='body2'>
                {data.title}
              </Typography>

              {data?.links?.map((link, index) => (
                <Link href={link.url} key={index}>
                  <a className={styles.link}>
                    <Typography className={styles.item__link} variant='body2'>
                      {link.name}
                    </Typography>
                  </a>
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>

        <Box component='div' className={styles.footer__secondary}>
          <Box className={styles.__left} component='div'>
            <Link href=''>
              <a className={styles.link}>
                <Typography
                  className={styles.__text}
                  gutterBottom
                  variant='body2'
                >
                  Terms & Conditions
                </Typography>
              </a>
            </Link>
            <Link href=''>
              <a className={styles.link}>
                <Typography className={styles.__text} variant='body2'>
                  Privacy Policy
                </Typography>
              </a>
            </Link>
          </Box>
          <Box className={styles.__right} component='div'>
            {footerSocial?.map((item, index) => (
              <Link href={item.url} key={index}>
                <a className={styles.link}>
                  <Tooltip title={item.name}>
                    <IconButton className={styles.__icons} color='primary'>
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                </a>
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
