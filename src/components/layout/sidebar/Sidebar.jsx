import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../../redux/features/categories/categoriesApi';
import CategorySkeleton from '../../ui/loading/CategorySkeleton';
import ListItems from './list-items/ListItems';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [open, setOpen] = useState({});

  const handleClick = (id) => setOpen({ [id]: !open[id] });

  const { data, isLoading, isSuccess } = useGetCategoriesQuery();

  const categories = data?.data?.map((category) => category);

  return (
    <Paper className={styles.sidebar}>
      {categories?.length === 0 && (
        <Typography variant='body1'>There is no categories</Typography>
      )}

      {isLoading && (
        <>
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </>
      )}

      {isSuccess && categories?.length > 0 && (
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
