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
import useAuth from '../../../hooks/useAuth';
import { userLoggedOut } from '../../../redux/features/auth/authSlice';
import { useGetCategoriesQuery } from '../../../services/categories/categoriesApi';

import SignIn from '../../auth/SignIn';
import SignUp from '../../auth/SignUp';

import { resetForm } from '../../../redux/features/checkout/checkoutSlice';
import {
  clearSearchTerm,
  searched,
} from '../../../redux/features/search/searchSlice';
import getTotalPrice from '../../../utils/getTotalPrice';
import CartDrawer from '../../drawer/cart-drawer/CartDrawer';
import MyDrawer from '../../drawer/Drawer';
import Modal from '../../modal/Modal';
import ListItems from '../sidebar/list-items/ListItems';
import styles from './Header.module.scss';

const Header = () => {
  const { data, isSuccess } = useGetCategoriesQuery();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isLoggedIn = useAuth();

  const [cartDrawer, setCartDrawer] = useState(false);
  const [categoryDrawer, setCategoryDrawer] = useState(false);
  const [open, setOpen] = useState({});
  const [signUp, setSignUp] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [search, setSearch] = useState('');

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

  // modal handler
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => setOpenModel(false);

  // handle search term
  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searched(search));
    }
  };

  // handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(clearSearchTerm());
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

          <Box component='form' className={styles.search__wrapper}>
            <input
              className={styles.search__input}
              type='text'
              placeholder='Search any product'
              onChange={handleSearchChange}
            />
            <Button
              className={styles.search__btn}
              onClick={(e) => handleSearch(e)}
              variant='contained'
              disableRipple
              type='submit'
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
                  onClick={handleOpen}
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

      {/* Cart drawer */}
      <CartDrawer cartDrawer={cartDrawer} toggleCartDrawer={toggleCartDrawer} />

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
    </>
  );
};

export default Header;
