import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import styles from './CartBtn.module.scss';

const CartBtn = ({ handleClick, showCartIcon }) => {
  return (
    <Button
      handleClick={handleClick}
      variant='contained'
      disableRipple
      fullWidth
      className={styles.button}
    >
      {showCartIcon && <ShoppingCartIcon className={styles.button__icon} />} Add
      To Cart
    </Button>
  );
};

export default CartBtn;
