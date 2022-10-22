import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../../services/categoriesApi';
import MyDrawer from '../../ui/Drawer';
import ListItems from '../sidebar/list/List';
import styles from './Header.module.scss';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCategoryDrawer, setOpenCategoryDrawer] = useState(false);
  const [open, setOpen] = useState({});

  const toggleDrawerHandler = () => setOpenDrawer((prev) => !prev);

  const toggleCategoryDrawerHandler = () =>
    setOpenCategoryDrawer((prev) => !prev);

  const handleClick = (id) => setOpen({ [id]: !open[id] });

  const {
    data: { data },
    isLoading,
    isSuccess,
  } = useGetCategoriesQuery();

  const categories = data?.map((category) => category);

  return (
    <>
      <AppBar position='static' className={styles.appBar__container}>
        <Toolbar>
          <Box component='div' className={styles.appBar__menuIcon}>
            <IconButton color='primary' onClick={toggleCategoryDrawerHandler}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box component={'div'} className={styles.brand__wrapper}>
            <Link href='/'>
              <a className={styles.link}>
                <Typography className={styles.brand__name} variant='h4'>
                  Food
                  <Box
                    className={styles['brand__name--color']}
                    component='span'
                  >
                    Express
                  </Box>
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

      <MyDrawer open={openDrawer} onClose={toggleDrawerHandler} anchor='right'>
        <Box component='div'>
          <Typography variant='h5' textAlign={'center'}>
            Cart
          </Typography>
          <Divider />
        </Box>
      </MyDrawer>

      <MyDrawer
        open={openCategoryDrawer}
        onClose={toggleCategoryDrawerHandler}
        anchor='left'
      >
        <Box component='div'>
          <Typography className={styles['sicebar-brand__name']} variant='h5'>
            Food
            <Box
              className={styles['sicebar-brand__name--color']}
              component='span'
            >
              Express
            </Box>
          </Typography>
          <Divider />
        </Box>

        {data?.length === 0 && (
          <Typography variant='body1'>There is no categories</Typography>
        )}

        {isSuccess && data?.length > 0 && (
          <ListItems
            categories={categories}
            handleClick={handleClick}
            open={open}
          />
        )}
      </MyDrawer>
    </>
  );
};

export default Header;
