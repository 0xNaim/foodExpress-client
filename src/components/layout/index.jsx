
import React, { useState } from 'react'
import Footer from './footer/Footer';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import styles from './style.module.css';
import Backdrop from '../ui/Backdrop/Backdrop';

const Layout = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const changeSidebar = () => {
    setSidebar(!sidebar)
    // alert("im called")
  }
  return (
    <>
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
    </>
  );
};

export default Layout;
