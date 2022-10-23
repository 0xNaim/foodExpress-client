import { Drawer } from '@mui/material';

const MyDrawer = ({ open, onClose, anchor, children }) => {
  return (
    <Drawer
      className={'MuiDrawer-paper'}
      variant='temporary'
      open={open}
      onClose={onClose}
      anchor={anchor}
      ModalProps={{ keepMounted: true }}
    >
      {children}
    </Drawer>
  );
};

export default MyDrawer;
