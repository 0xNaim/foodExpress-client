import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../../../data/cartData';
import { userLoggedOut } from '../../../services/auth/authSlice';
import { useGetCategoriesQuery } from '../../../services/categoriesApi';
import SignUp from '../../auth/Signin';
import Signin from '../../auth/SignUp';
// <<<<<<< HEAD
// import CartItems from '../../cart-items/CartItems'; 
// =======
import CartItem from '../../cart-item/CartItem';
// >>>>>>> a9ed3e939e7c0ed235984935f744729434fbac4d
import MyDrawer from '../../drawer/Drawer';
import Modal from '../../modal/Modal';
import CustomButton from '../../ui/Button/CustomButton';
import ListItems from '../sidebar/list/List';
import styles from './Header.module.scss';

const Header = () => {
  const { accessToken, user } = useSelector((state) => state.auth || {});
  const { data, isSuccess } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCategoryDrawer, setOpenCategoryDrawer] = useState(false);
  const [open, setOpen] = useState({});
  const [signUp, setSignUp] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  // handle open user menu
  const handleOpenUserMenu = () => {
    setUserMenu(true);
  };

  // handle close user menu
  const handleCloseUserMenu = () => {
    setUserMenu(false);
  };

  // handle signup
  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  // modal close
  const handleClose = () => {
    setOpenModel(false);
  };

  // toggle drawer
  const toggleDrawerHandler = () => setOpenDrawer((prev) => !prev);

  const toggleCategoryDrawerHandler = () =>
    setOpenCategoryDrawer((prev) => !prev);

  // single category
  const handleClick = (id) => setOpen({ [id]: !open[id] });

  // user logout
  const handleUserLogout = () => {
    dispatch(userLoggedOut());
  };

  const categories = data?.data?.map((category) => category);

  const shippingCost = 30;
  const totalPrice = cartData.reduce(
    (accu, curr) => accu + curr.price.split(' ')[0] * curr.quantity,
    0
  );

  return (
    <>
      <AppBar position='static' className={styles.appBar__container}>
        <Toolbar>
          <Box component='div' className={styles.appBar__menuIcon}>
            <MenuIcon color='primary' onClick={toggleCategoryDrawerHandler} />
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

            {accessToken ? (
              <Box className={styles.profile} component='div'>
                <Tooltip title='Open Settings'>
                  <IconButton onClick={handleOpenUserMenu} disableRipple>
                    <Avatar>{user?.username?.charAt(0).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  className={styles.user_menu}
                  open={userMenu}
                  onClose={handleCloseUserMenu}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disableRipple>
                    <Link href='/dashboard'>
                      <a className={styles.link}>
                        <Typography textAlign='center'>Dashboard</Typography>
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleUserLogout} disableRipple>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box className={styles.account} component='div'>
                <IconButton
                  className={styles.account__iconBtn}
                  onClick={() => setOpenModel(true)}
                  disableRipple
                >
                  <AccountCircleIcon
                    className={styles.account__icon}
                    color='primary'
                  />
                </IconButton>
              </Box>
            )}

            <Modal openModel={openModel} handleClose={handleClose}>
              {signUp ? (
                <SignUp handleSignUp={handleSignUp} />
              ) : (
                <SignIn handleClose={handleClose} handleSignUp={handleSignUp} />
              )}
            </Modal>
          </Box>
        </Toolbar>
      </AppBar>

      <MyDrawer open={openDrawer} onClose={toggleDrawerHandler} anchor='right'>
        <Box className={styles['sidebar-cart__wrapper']} component='div'>
          <Typography
            className={styles['sidebar-cart__title']}
            variant='h5'
            textAlign={'center'}
          >
            Shopping Cart
          </Typography>
          <Divider />

          <Box className={styles['sidebar-cart__content']} component='div'>
{/* <<<<<<< HEAD
            <CartItems /> */}
{/* ======= */}
            <CartItem />
{/* >>>>>>> a9ed3e939e7c0ed235984935f744729434fbac4d */}
          </Box>

          <Divider className={styles.separator} />

          <Box className={styles['sidebar-cart__btnGroup']} component='div'>
            <Box
              className={styles['sidebar-cart__price__wrapper']}
              component='div'
            >
              <Typography
                className={styles['sidebar-cart__subtotal']}
                variant='body1'
              >
                Total + Shipping:
              </Typography>
              <Typography
                className={styles['sidebar-cart__price']}
                variant='body1'
              >
                {totalPrice + shippingCost} Tk
              </Typography>
            </Box>

            <Box
              className={styles['sidebar-cart__btn__wrapper']}
              component='div'
            >
              <Link href='/cart' passHref>
                <a className={styles['sidebar-cart__link']}>
                  <Box className={styles['sidebar-cart__btn']} component='div'>
                    <CustomButton
                      label='View Cart'
                      variant='outlined'
                      fullWidth
                    />
                  </Box>
                </a>
              </Link>
              <Link href='/checkout' passHref>
                <a className={styles['sidebar-cart__link']}>
                  <Box className={styles['sidebar-cart__btn']} component='div'>
                    <CustomButton label='Checkout' fullWidth />
                  </Box>
                </a>
              </Link>
            </Box>
          </Box>
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

        {categories?.length === 0 && (
          <Typography variant='body1'>There is no categories</Typography>
        )}

        {isSuccess && categories?.length > 0 && (
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
