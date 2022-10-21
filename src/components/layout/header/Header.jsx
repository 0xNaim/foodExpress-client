import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,

} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import styled from './Header.module.css';

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

const Header = (props) => {
  const {sidebar, changeSidebar} = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawerHandler = () => setOpenDrawer(!openDrawer);

  return (
    <>
    <div style={{zIndex:"20"}}>
      <AppBar position='static' className={styles.appBar__container}>
        <Toolbar>
          <div onClick={()=>changeSidebar()} className={styled.menu_icon} >{sidebar ? <CloseIcon className={styled.menu_icon} style={{ color: "black", fontSize: "2.5rem" }} />:<MenuIcon className={styled.menu_icon} style={{ color: "black", fontSize: "2.5rem" }} />}</div>
          <Box component={'div'} className={styles.brand__wrapper}>
            <Link href='/'>
              <a className={styles.link}>
                <Typography className={styles.brand__name} variant='h4'>
                  <Box
                    className={styles['brand__name--color']}
                    component='span'
                  >
                    Food
                  </Box>
                  Express
                </Typography>
              </a>
            </Link>
          </Box>

          <Box component='div' className={styles.search__wrapper}>
            <input
              className={styles.search__input}
              type='text'
              placeholder='Search any product'
            />
            <Button
              className={styles.search__btn}
              variant='contained'
              disableRipple
            >
              Search
            </Button>
          </Box>

          <Box component='div' className={styles.info}>
            <Box component='div' className={styles.support__info}>
              <Typography className={styles.support__number} variant='h6'>
                +8801 90000 0000
              </Typography>
              <Typography className={styles.support__text} variant='body2'>
                24/7 Support
              </Typography>
            </Box>

            <Box
              onClick={toggleDrawerHandler}
              component='div'
              className={styles.cart__wrapper}
            >
              <IconButton disableRipple>
                <Badge badgeContent={5} color='error' max={10}>
                  <ShoppingCartIcon className={styles['cart--icon']} />
                </Badge>
              </IconButton>

              <Box className={styles.cart} component='div'>
                <Typography className={styles.cart__title} variant='body2'>
                  Your Cart
                </Typography>
                <Typography className={styles.cart__total} variant='body1'>
                  $100.00
                </Typography>
              </Box>
            </Box>

            <Box className={styles.account} component='div'>
              <IconButton className={styles.account__iconBtn} disableRipple>
                <AccountCircleIcon
                  className={styles.account__icon}
                  color='primary'
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant='temporary'
        open={openDrawer}
        onClose={toggleDrawerHandler}
        anchor='right'
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' },
        }}
      >
        <Box component='div'>
          <Typography variant='h5' textAlign={'center'}>Cart</Typography>
          <Divider />
        </Box>
      </Drawer>
      </div>
    </>
  );
};

export default Header;
