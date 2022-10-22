import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../../services/categoriesApi';
import ListItems from './list/List';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [open, setOpen] = useState({});

  const handleClick = (id) => setOpen({ [id]: !open[id] });

  const {
    data: { data },
    isLoading,
    isSuccess,
  } = useGetCategoriesQuery();

  const categories = data?.map((category) => category);

  return (
    <Paper className={styles.sidebar}>
      {data?.length === 0 && (
        <Typography variant='body1'>There is no categories</Typography>
      )}

      {isSuccess && data?.length > 0 && (
        <ListItems
          categories={categories}
          handleClick={handleClick}
          open={open}
        />
      )}
    </Paper>
  );
};

export default Sidebar;
