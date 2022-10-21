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

  );
};

export default Sidebar;
