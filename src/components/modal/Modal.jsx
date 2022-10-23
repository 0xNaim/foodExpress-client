import {useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';

const style = {
  position: 'absolute',
  left:"50%",
  top: "50%",
  width:"521px",
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius:"27px",
  boxShadow: 24,
};
export default function Modals({openModel,handleClose,children}) {


  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
          <Button onClick={handleClose} variant="contained"   style={{position: 'absolute',top: "10px", right: "20px",borderRadius:"50%",height:"38px",minWidth:"38px",padding:"0px"}}><RemoveIcon/></Button>
           {children}
           <div style={{backgroundColor:"#000",position:"relative",width:"100%",borderBottomLeftRadius:"27px",borderBottomRightRadius:"27px"}}>
            <p style={{color:"#fff",textAlign:"center",padding:"20px"}}>This site protected by reCapTCHA and Google <span style={{color:"rgba(63, 191, 4, 1)"}}>Privacy Policy  </span> and  <span style={{color:"rgba(63, 191, 4, 1)"}}>
            Terms od Service apply
            </span>  </p>
           </div>
          </Box>
        </Fade>
      </Modal>
  );
}