import ExpandLess from '@mui/icons-material/ExpandLess';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './ListItems.module.scss';

const ListItems = ({ open, handleClick, toggleCategoryDrawer, categories }) => {
  const router = useRouter()
  const { slug } = router.query;


  return (
    <List>
      {categories?.map((category) => {
        const { attributes } = category || {};
        const { sub_categories } = attributes || {};
        const { data } = sub_categories || {};

        return (
          <Box component='div' key={category.id}>
            <ListItemButton
              disableRipple
              onClick={() => handleClick(category.id)}
            >
              <ListItemText primary={attributes.categoryName} />
              {open[category.id] ? <ExpandLess /> : <KeyboardArrowRightIcon />}
            </ListItemButton>

            <Collapse in={open[category.id]} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {data?.map((subCategory) => (
                  <Link
                    href={`/category/${subCategory?.attributes?.slug}`}
                    key={subCategory?.attributes?.slug}
                  >
                    <a className={styles.link}>
                      <ListItemButton
                        className={slug === subCategory?.attributes?.slug && `${styles.active}`}
                        onClick={toggleCategoryDrawer}
                        disableRipple
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          primary={subCategory?.attributes?.subCategoryName}
                        />
                      </ListItemButton>
                    </a>
                  </Link>
                ))}
              </List>
            </Collapse>
          </Box>
        );
      })}
    </List>
  );
};

export default ListItems;
