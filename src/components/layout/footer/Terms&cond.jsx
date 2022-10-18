import { Link, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const TermsCondition = () => {
  const str = ["Terms & Conditions", "Privacy Policy"];
  return (
    <div>
      {str.map((s) => (
        <Link key={s} sx={{ cursor: "pointer" }}>
          <Typography variant="body1" color="white">
            {s}
          </Typography>
        </Link>
      ))}
    </div>
  );
};

export default TermsCondition;

// const linkStyle = styled.p`
//   background-color: red;
//   width: 50vw;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;
