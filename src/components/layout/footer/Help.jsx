import { Link, Typography } from "@mui/material";
import React from "react";
import { hoverStyle } from "./Services";

const Help = () => {
  const helpMsg = ["Help", "FAQs", "Contact Us"];
  return (
    <div>
      {helpMsg.map((msg) => (
        <ul>
          <li>
            <Link href="#" key={msg} underline={"none"}>
              <Typography variant="body1" sx={hoverStyle}>
                {msg}
              </Typography>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Help;
