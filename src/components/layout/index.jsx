<<<<<<< HEAD

import React, { useState } from 'react'
import Footer from './footer/Footer';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import styles from './style.module.css';
import Backdrop from '../ui/Backdrop/Backdrop';
=======
import { Container, Grid } from '@mui/material';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.scss';
import Sidebar from './sidebar/Sidebar';
import SubHeader from './sub-header/SubHeader';
>>>>>>> main

const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const changeSidebar = () => {
    setSidebar(!sidebar)
    // alert("im called")
  }
  return (
    <>
<<<<<<< HEAD
      <Header sidebar={sidebar} changeSidebar={changeSidebar} />


      <div className={styles.layout}>
        {/* <div className={styles.menu_icon} onClick={()=>setSidebar(!sidebar)}>
          <i className={`fa fa-bars ${styles.fa_bars}`}></i>
        </div> */}
        <Sidebar sidebar={sidebar} changeSidebar={changeSidebar} />
        <div className={styles.children}>
          {children}
        </div>
        <Backdrop show={sidebar} click={changeSidebar} />
      </div>
      <Footer/>
=======
      <Header />
      <SubHeader />

      <Container maxWidth='xl'>
        <Grid container>
          <Grid item xs={0} md={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={10} className={styles.children__wrapper}>
            {children}
          </Grid>
        </Grid>
      </Container>

      <Footer />
>>>>>>> main
    </>
  );
};

export default Layout;
