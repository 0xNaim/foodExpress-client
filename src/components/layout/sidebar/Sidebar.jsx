import { Box, Typography } from '@mui/material';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <Box component='div' className={styles.sidebar}>
      {['fsfds', 'fsdfds', 'sdfd'].map((item) => (
        <Typography key={item}>{item}</Typography>
      ))}
    </Box>
  );
};

export default Sidebar;
