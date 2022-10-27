import RemoveIcon from '@mui/icons-material/Remove';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: { xs: '300px', md: '521px' },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '27px',
  boxShadow: 24,
};

export default function Modals({ openModel, handleClose, children }) {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={openModel}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModel}>
        <Box sx={style}>
          <Button
            onClick={handleClose}
            variant='contained'
            style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              borderRadius: '50%',
              height: '38px',
              minWidth: '38px',
              padding: '0px',
            }}
          >
            <RemoveIcon />
          </Button>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
