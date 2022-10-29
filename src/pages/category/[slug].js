import { Typography, Grid, Button, Modal, Box, Pagination } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Product from '../../components/product/Product';
import { useGetProductsQuery } from '../../services/categoriesApi';
import MuiPagination from './pagination/MuiPagination';
// import Pagination from './pagination/Pagination';

const Category = () => {
  const { query } = useRouter();
  const { slug } = query;
  const [open, setOpen] = useState(false);
  const { data, isLoading, isSuccess } = useGetProductsQuery(slug);
  let products = [];

  products = data && data.data.length > 0 && data.data[0].attributes.products.data;

  const pageNumbers = [];



  // let products = [];
  // if (data) {
  //   console.log(data)
  //   products = data && data.data[0].attributes.products.data;
  // }

  const [postsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products && products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e,p)=>{
    console.log(e);
    console.log(p);
    setCurrentPage(p)
  }

  return (
    <>
      <Head>
        <title>Product || FoodExpress</title>
      </Head>

      <Layout>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          {currentPosts && currentPosts.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* <Item>1</Item> */}

              <Product product={item} handleOpen={handleOpen} />
            </Grid>
          ))}

        </Grid>
        <Box sx={{
          width: "100%",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={products && products.length}
            paginate={paginate}
          /> */}

          <MuiPagination products={products} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} handleChange={handleChange}/>
         
        </Box>

      </Layout>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {/* <Box onClick={handleClose} component="div" sx={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}> */}
        <Box sx={{ alignSelf: "center", width: "50%", height: "50%", background: "white" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
        {/* </Box> */}

      </Modal>
    </>
  );
};

export default Category;
