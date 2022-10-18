import About from "./About";
import styles from "./Footer.module.scss";
import Help from "./Help";
import FooterButton from "./FooterButton";
import Services from "./Services";
import SocialMedia from "./SocialMedia";
import TermsCondition from "./Terms&cond";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <div className={styles.footer__wrapper}>
      <div className={styles.upper_footer}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={6} lg={3}>
            <FooterButton />
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Services />
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <About />
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Help />
          </Grid>
        </Grid>
      </div>
      <div className={styles.lower_footer}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <TermsCondition />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <SocialMedia />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
