import { Box, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../../services/categories/categoriesApi';
import ListItems from '../../layout/sidebar/list-items/ListItems';
import MyDrawer from '../Drawer';
import styles from './CategoryDrawer.module.scss';

const CategoryDrawer = ({ categoryDrawer, toggleCategoryDrawer }) => {
  const { data, isSuccess } = useGetCategoriesQuery();

  const [open, setOpen] = useState({});

  // single category
  const handleClick = (id) => setOpen({ [id]: !open[id] });

  const categories = data?.data?.map((category) => category);

  return (
    <MyDrawer
      open={categoryDrawer}
      onClose={toggleCategoryDrawer}
      anchor='left'
    >
      <Box component='div'>
        <Typography className={styles['sicebar-brand__name']} variant='h5'>
          Food
          <Box
            className={styles['sicebar-brand__name--color']}
            component='span'
          >
            Express
          </Box>
        </Typography>
        <Divider />
      </Box>

      {categories?.length === 0 && (
        <Typography variant='body1'>There is no categories</Typography>
      )}

      {isSuccess && categories?.length > 0 && (
        <ListItems
          categories={categories}
          handleClick={handleClick}
          toggleCategoryDrawer={toggleCategoryDrawer}
          open={open}
        />
      )}
    </MyDrawer>
  );
};

export default CategoryDrawer;
