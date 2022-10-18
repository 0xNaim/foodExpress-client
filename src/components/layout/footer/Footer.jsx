import About from "./About";
import styles from "./Footer.module.scss";
import Help from "./Help";
import FooterButton from "./FooterButton";
import Services from "./Services";
import SocialMedia from "./SocialMedia";
import TermsCondition from "./Terms&cond";

const Footer = () => {
  return (
    <div className={styles.footer__wrapper}>
      <div className={styles.upper_footer}>
        <FooterButton />
        <Services />
        <About />
        <Help />
      </div>
      <div className={styles.lower_footer}>
        <TermsCondition />
        <SocialMedia />
      </div>
    </div>
  );
};

export default Footer;
