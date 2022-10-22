import ExpandLess from '@mui/icons-material/ExpandLess';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { useGetCategoriesQuery } from '../../../services/categoriesApi';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const {
    data: { data },
    isLoading,
  } = useGetCategoriesQuery();

  const categories = data.map((category) => category.attributes);

  return (
    <Paper component='div' className={styles.sidebar}>
      <List>
        {categories?.map((category) => {
          const { sub_categories } = category;
          const { data } = sub_categories;

          return (
            <Box component='div' key={category.slug}>
              <ListItemButton disableRipple onClick={handleClick}>
                <ListItemText primary={category.categoryName} />
                {open ? <ExpandLess /> : <KeyboardArrowRightIcon />}
              </ListItemButton>

              <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {data?.map((subCategory) => (
                    <ListItemButton
                      key={subCategory.slug}
                      disableRipple
                      sx={{ pl: 4 }}
                    >
                      <ListItemText
                        primary={subCategory.attributes.subCategoryName}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
    </Paper>
  );
};

export default Sidebar;
