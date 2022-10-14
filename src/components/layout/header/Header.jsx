import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.scss';

const navItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Product',
    link: '/product',
  },
];

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawerHandler = () => setOpenDrawer(!openDrawer);

  return (
    <>
      <AppBar position='static' className={styles.appBar__container}>
        <Toolbar>
          <Box component={'div'} className={styles.brand__wrapper}>
            <Link href='/'>
              <a className={styles.link}>
                <Typography className={styles.brand__name} variant='h5'>
                  Logo
                </Typography>
              </a>
            </Link>
          </Box>

          <Box
            component='div'
            className={styles.menu__wrapper}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {navItems.map((item, idx) => (
              <Link href={item.link} key={idx}>
                <a className={styles.link}>
                  <Typography className={styles.menu__item} variant='body2'>
                    {item.name}
                  </Typography>
                </a>
              </Link>
            ))}
          </Box>

          <IconButton
            onClick={toggleDrawerHandler}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon className={styles.menu__btn} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={styles.mobileMenu__wrapper}
        variant='temporary'
        open={openDrawer}
        onClose={toggleDrawerHandler}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '75%' },
        }}
      >
        <Box component='div'>
          <Typography className={styles.mobileMenu__brand}  variant='h5'>Storefront</Typography>
          <Divider />

          <List>
            {navItems.map((item, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
