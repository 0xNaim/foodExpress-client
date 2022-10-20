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
} from '@mui/material';
import Link from 'next/link';


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

const Sidebar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawerHandler = () => setOpenDrawer(!openDrawer);

  return (
    <>
    <h1 style={{fontSize:"5rem"}}>This is sidebar</h1>
    </>
  );
};

export default Sidebar;
