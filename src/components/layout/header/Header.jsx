import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../../../../public/assets/empty.png';
import useAuth from '../../../hooks/useAuth';
import { userLoggedOut } from '../../../redux/features/auth/authSlice';
import { removeFromCart } from '../../../redux/features/cart/cartSlice';
import { useGetCategoriesQuery } from '../../../services/categories/categoriesApi';

import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';
import CartItems from '../../cart-items/CartItems';

import Image from 'next/image';
import { resetForm } from '../../../redux/features/checkout/checkoutSlice';
import getTotalPrice from '../../../utils/getTotalPrice';
import MyDrawer from '../../drawer/Drawer';
import Modal from '../../modal/Modal';
import CustomButton from '../../ui/Button/CustomButton';
import Notify from '../../ui/notify/Notify';
import styles from './Header.module.scss';
import ListItems from '../sidebar/list-items/ListItems';

const Header = () => {
  const { data, isSuccess } = useGetCategoriesQuery();
  const { cart, message } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shippingCost } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const isLoggedIn = useAuth();

  const [cartDrawer, setCartDrawer] = useState(false);
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [open, setOpen] = useState({});
  const [signUp, setSignUp] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Notify handler
  const handleOpenSnackbar = () => setOpenSnackbar(true);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Remove item from the cart
  const handleRemoveFromCart = (payload) => {
    dispatch(removeFromCart(payload));
    handleOpenSnackbar();
  };

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

  // toggle cart drawer
  const toggleCartDrawer = () => setCartDrawer((prev) => !prev);

  // toggle category drawer
  const toggleCategoryDrawer = () => setCategoryDrawer((prev) => !prev);

  // single category
  const handleClick = (id) => setOpen({ [id]: !open[id] });

  // user logout
  const handleUserLogout = () => {
    dispatch(userLoggedOut());
    dispatch(resetForm());
  };

  const categories = data?.data?.map((category) => category);

  return (
    <>
      <AppBar position='static' className={styles.appBar__wrapper}>
        <Container className={styles.container} maxWidth='xl'>
          <Box component='div' className={styles.appBar__menuIcon}>
            <MenuIcon color='primary' onClick={toggleCategoryDrawer} />
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
              onClick={toggleCartDrawer}
              component='div'
              className={styles.cart__wrapper}
            >
              <IconButton disableRipple>
                <Badge badgeContent={cart?.length} color='error' max={10}>
                  <ShoppingCartIcon className={styles['cart--icon']} />
                </Badge>
              </IconButton>

              <Box className={styles.cart} component='div'>
                <Typography className={styles.cart__title} variant='body2'>
                  Your Cart
                </Typography>
                <Typography className={styles.cart__total} variant='body1'>
                  {getTotalPrice(cart)}.00 Tk
                </Typography>
              </Box>
            </Box>

            {isLoggedIn ? (
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
                  <Link href='/profile'>
                    <a className={styles.link}>
                      <MenuItem disableRipple onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Profile</Typography>
                      </MenuItem>
                    </a>
                  </Link>
                  <Link href='/profile/orders'>
                    <a className={styles.link}>
                      <MenuItem disableRipple onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Order</Typography>
                      </MenuItem>
                    </a>
                  </Link>
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
        </Container>
      </AppBar>

      <MyDrawer open={cartDrawer} onClose={toggleCartDrawer} anchor='right'>
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
            <CartItems handleRemoveFromCart={handleRemoveFromCart} />
          </Box>

          {cart?.length === 0 && (
            <Box className={styles.empty__cart} component='div'>
              <Image
                src={EmptyCart}
                width={150}
                height={150}
                alt='Empty Cart'
              />
              <Typography variant='subtitle1'>Your cart is empty!</Typography>
            </Box>
          )}

          {cart?.length > 0 && <Divider className={styles.separator} />}

          {cart?.length > 0 && (
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
                  {getTotalPrice(cart) + shippingCost} Tk
                </Typography>
              </Box>

              <Box
                className={styles['sidebar-cart__btn__wrapper']}
                component='div'
              >
                <Link href='/cart' passHref>
                  <a className={styles['sidebar-cart__link']}>
                    <Box
                      className={styles['sidebar-cart__btn']}
                      component='div'
                    >
                      <CustomButton
                        label='View Cart'
                        variant='outlined'
                        handleClick={toggleCartDrawer}
                        fullWidth
                      />
                    </Box>
                  </a>
                </Link>
                <Link href='/checkout' passHref>
                  <a className={styles['sidebar-cart__link']}>
                    <Box
                      className={styles['sidebar-cart__btn']}
                      component='div'
                    >
                      <CustomButton
                        label='Checkout'
                        handleClick={toggleCartDrawer}
                        fullWidth
                      />
                    </Box>
                  </a>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </MyDrawer>

      <MyDrawer
        open={categoryDrawer}
        onClose={toggleCategoryDrawer}
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
            toggleCategoryDrawer={toggleCategoryDrawer}
            open={open}
          />
        )}
      </MyDrawer>

      <Notify
        openSnackbar={openSnackbar}
        closeSnackbar={handleCloseSnackbar}
        message={message}
        severity='error'
      />
    </>
  );
};

export default Header;
