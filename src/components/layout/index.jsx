import { Container, Grid } from '@mui/material';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.scss';
import Sidebar from './sidebar/Sidebar';
import SubHeader from './sub-header/SubHeader';

const Layout = ({ children }) => {
  return (
    <>
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
    </>
  );
};

export default Layout;
