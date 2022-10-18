import { Link, Typography } from "@mui/material";
import React from "react";

const About = () => {
  const aboutStr = ["About", " Our Story", "Benefits", " Team", "Careers"];
  return (
    <div>
      {aboutStr.map((str) => (
        <Link key={str} sx={{ cursor: "pointer" }}>
          <ul>
            <li>
              <Typography
                variant="body1"
                sx={{ color: "white", lineHeight: "2.3" }}
              >
                {str}
              </Typography>
            </li>
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default About;
