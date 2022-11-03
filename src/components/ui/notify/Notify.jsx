import { Alert, Snackbar } from '@mui/material';

const Notify = ({ openSnackbar, closeSnackbar, message, severity }) => (
  <Snackbar
    open={openSnackbar}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    onClose={closeSnackbar}
  >
    <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default Notify;
