import { Delete } from "@mui/icons-material";
import {
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";

import styles from "./cart.module.css";

const cartData = [
  {
    img: "assets/burger/1.jpg",
    product: "Soyabin Oil",
    price: "180 tk",
    quantity: "12",
  },
  {
    img: "assets/burger/1.jpg",
    product: "Chal",
    price: "300 tk",
    quantity: "5 kg",
  },
  {
    img: "assets/burger/1.jpg",
    product: "Wheat",
    price: "250 tk",
    quantity: "5 kg",
  },
];

const cartDetailsData = [
  {
    title: "Total Items",
    amount: 5,
  },
  {
    title: "Total Price",
    amount: "5 tk",
  },
  {
    title: "Shipping Price",
    amount: "50 tk",
  },
];

const CartView = () => {
  return (
    <Container maxWidth={"xl"} className={styles.cart_wrapper}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
          <Box component="div" className={styles.left_part}>
            <Typography variant={"h5"} fontWeight={"700"} marginBottom={"1rem"}>
              Your Cart
            </Typography>

            {cartData.map((data) => (
              <Box component="div" className={styles.product_div}>
                <Box component="div" className={styles.product_img}>
                  <img
                    src={data.img}
                    alt="favicon.svg"
                    width="60"
                    height="60"
                  />
                </Box>

                <Box component="div" className={styles.product_details}>
                  <Box component="div">
                    <Typography variant="body1">{data.product}</Typography>
                    <Typography variant="subtitle2">{data.price}</Typography>
                    <Typography variant="caption">{data.quantity}</Typography>
                  </Box>

                  <Box component="div">
                    <Delete color="primary" sx={{ cursor: "pointer" }} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
          <Box component="div" className={styles.right_part}>
            <Typography variant={"h5"} fontWeight={"700"} marginBottom={"1rem"}>
              {" "}
              Cart Details
            </Typography>

            <Table>
              <TableBody>
                {cartDetailsData.map((d) => (
                  <TableRow key={d.title} className={styles.table_row}>
                    <Typography variant="body1" fontWeight={"500"}>
                      {d.title}
                    </Typography>

                    <Typography variant="body1" fontWeight={"500"}>
                      {d.amount}
                    </Typography>
                  </TableRow>
                ))}

                <hr />
                <TableRow className={styles.table_row}>
                  <Typography variant="body1" fontWeight={"500"}>
                    Total
                  </Typography>

                  <Typography variant="body1" fontWeight={"500"}>
                    5000 tk
                  </Typography>
                </TableRow>

                <TableRow className={""}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ borderRadius: "10px" }}
                  >
                    Submit
                  </Button>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartView;
