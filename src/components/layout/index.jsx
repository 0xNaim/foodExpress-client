import Footer from './footer/Footer';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{display:"flex"}}>
        <Sidebar/>
      {children}
      
      </div>

      <Footer />
    </>
  );
};

export default Layout;
