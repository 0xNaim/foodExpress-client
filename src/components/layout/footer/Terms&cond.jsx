import { Link, Typography } from "@mui/material";
import React from "react";
import { hoverStyle } from "./Services";

const TermsCondition = () => {
  const str = ["Terms & Conditions", "Privacy Policy"];
  return (
    <div>
      {str.map((s) => (
        <p>
          <Link href="#" key={s} underline={"none"}>
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
