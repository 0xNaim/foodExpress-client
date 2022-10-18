import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { hoverStyle } from "./Services";
import styles from "./Footer.module.scss";

const TermsCondition = () => {
  const str = ["Terms & Conditions", "Privacy Policy"];
  return (
    <div className={styles.privacyDiv}>
      {str.map((s) => (
        <p>
          <Link href="#" key={s} sx={{ cursor: "pointer" }} underline={"none"}>
            <Typography variant="body1" sx={hoverStyle}>
              {s}
            </Typography>
          </Link>
        </p>
      ))}
    </div>
  );
};

export default TermsCondition;
