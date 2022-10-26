import { Grid, TextField } from '@mui/material';

const CustomTextField = ({ref, label, error}) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField ref={ref} label={label} variant='standard' fullWidth />
    </Grid>
  );
};

export default CustomTextField;
