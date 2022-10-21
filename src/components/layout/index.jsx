import { Container, Grid } from '@mui/material';
import Footer from './footer/Footer';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import SubHeader from './sub-header/SubHeader';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <SubHeader />

      <Container maxWidth='xl'>
        <Grid container>
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5}>
            {children}
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Layout;
