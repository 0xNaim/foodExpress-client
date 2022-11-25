import { Grid } from '@mui/material';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
      }}
    >
      <HashLoader color="#19a968" size={50} />
    </Grid>
  );
};

export default Loading;
