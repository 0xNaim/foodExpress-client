import { Link, Typography } from "@mui/material";
import React from "react";

const Help = () => {
  const helpMsg = ["Help", "FAQs", "Contact Us"];
  return (
    <div>
      {helpMsg.map((msg) => (
        <Link key={msg} sx={{ cursor: "pointer" }}>
          <ul>
            <li>
              <Typography
                variant="body1"
                sx={{ color: "white", lineHeight: "2.3" }}
              >
                {msg}
              </Typography>
            </li>
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default Help;
