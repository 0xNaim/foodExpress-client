import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import styles from './CustomButton.module.scss';

const CustomButton = ({
  label,
  handleClick,
  showCartIcon,
  fullWidth,
  disabled,
  variant = 'contained',
}) => {
  return (
    <Button
      className={styles.button}
      onClick={handleClick}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      disableRipple
    >
      {showCartIcon && <ShoppingCartIcon className={styles.button__icon} />}{' '}
      {label}
    </Button>
  );
};

export default CustomButton;
