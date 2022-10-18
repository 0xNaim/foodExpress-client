import { Link, Typography } from "@mui/material";
import React from "react";
import { hoverStyle } from "./Services";

const About = () => {
  const aboutStr = ["About", " Our Story", "Benefits", " Team", "Careers"];
  return (
    <div>
      {aboutStr.map((str) => (
        <ul>
          <li>
            <Link href="#" key={str} underline={"none"}>
              <Typography variant="body1" sx={hoverStyle}>
                {str}
              </Typography>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default About;
