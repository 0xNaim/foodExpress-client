import { Drawer } from "@mui/material";

const MyDrawer = ({open, onClose, anchor, children}) => {
  return (
    <Drawer
      variant='temporary'
      open={open}
      onClose={onClose}
      anchor={anchor}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '300px' },
      }}
    >
     {children}
    </Drawer>
  );
};

export default MyDrawer;