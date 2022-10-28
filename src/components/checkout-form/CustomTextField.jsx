import { Grid, TextField } from '@mui/material';
import { forwardRef } from 'react';

const CustomTextField = ({ label }, ref) => (
  <Grid item xs={12} sm={6}>
    <TextField inputRef={ref} label={label} variant='standard' fullWidth />
  </Grid>
);

export default forwardRef(CustomTextField);
