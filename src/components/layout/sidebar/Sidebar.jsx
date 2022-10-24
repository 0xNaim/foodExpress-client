<<<<<<< HEAD
import { useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import Backdrop from '../../ui/Backdrop/Backdrop';
import styles from './Sidebar.module.css';


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

const Sidebar = (props) => {
  const { sidebar, changeSidebar = { changeSidebar } } = props
  return (
    <>
        <div className={`${styles.sidebar_container} ${sidebar && styles.sidebar_container_true}`}>
          <h1 style={{ fontSize: "5rem" }}>This is sidebar</h1>
        </div>
        {/* <CircularProgress color="inherit" /> */}
        {/* <Backdrop show={sidebar} click={changeSidebar}/> */}
    </>

=======
import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../../services/categoriesApi';
import CategorySkeleton from '../../ui/loading/CategorySkeleton';
import ListItems from './list/List';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [open, setOpen] = useState({});

  const handleClick = (id) => setOpen({ [id]: !open[id] });

  const { data, isLoading, isSuccess } = useGetCategoriesQuery();

  const categories = data?.data?.map((category) => category);

  return (
    <Paper className={styles.sidebar}>
      {categories?.length === 0 && (
        <Typography variant='body1'>There is no categories</Typography>
      )}

      {isLoading && (
        <>
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </>
      )}

      {isSuccess && categories?.length > 0 && (
        <ListItems
          categories={categories}
          handleClick={handleClick}
          open={open}
        />
      )}
    </Paper>
>>>>>>> main
  );
};

export default Sidebar;
