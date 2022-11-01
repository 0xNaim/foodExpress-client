import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useState } from "react";

import styles from "./productDetails.module.css";

const data = [
  "Origin: Bangladesh",

  "Gentle, alcohol-free formula.",

  "Kills 99.9% of bacteria",

  "Pre-moistured with water",

  "Light-scented",

  "Ingredients: Leaf juice, water, Disodium EDTA, glycerin, citric acid, benzalkonium chloride, sodium benzoate, polysorbate 20, aloe barbadensis, Vitamin E, Fragrance.",

  "Quantity: 80 Pcs.",
];

const ProductDetails = () => {
  const [productCount, setProductCount] = useState(1);

  const handleIncrement = (e) => {
    setProductCount(productCount + 1);
  };

  const handleDecrement = (e) => {
    if (productCount === 0) {
      return;
    }
    setProductCount(productCount - 1);
  };
  return (
    <>
      <Container maxWidth="xl" className={styles.wrapper}>
        <Grid container>
          <Grid items sm={12} md={12} lg={12}>
            <Box component={"div"} className={styles.img_div}>
              <Image src={"/assets/burger/7.jpg"} width={300} height={200} />
            </Box>

            <hr />
          </Grid>

          <Grid items sm={12} md={12} lg={12}>
            <Box component="div" className={styles.lower_div}>
              <Grid container>
                <Grid items sm={12} md={7} lg={7}>
                  <Box component={"div"} className={styles.lower_left}>
                    <Box component="div" sx={{ marginBottom: "1.5rem" }}>
                      <Typography variant="h4" fontWeight={500}>
                        Soyabin Whole
                      </Typography>
                    </Box>

                    {data.map((d) => (
                      <Box component="div">
                        <Typography variant="subtitle2" gutterBottom>
                          {d}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid items sm={12} md={5} lg={5}>
                  <Box component="div" className={styles.lower_right}>
                    <Box component="div" sx={{ marginBottom: "1rem" }}>
                      <Typography variant="h4" color="primary">
                        ৳ {200 * productCount}
                      </Typography>
                    </Box>

                    <Box component="div" className={styles.counter}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDecrement}
                      >
                        -
                      </Button>
                      <Typography variant="h6" color="HighlightText">
                        {productCount}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleIncrement}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductDetails;
