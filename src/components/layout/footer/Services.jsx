import { Link, Typography } from "@mui/material";
import React from "react";

export const hoverStyle = {
  "&:hover": {
    color: "green",
  },
  lineHeight: "2.3",
  color: "#f1f1f1",
};

const Services = () => {
  const services = [
    "Services",
    "Email Marketing",
    "Campaigns",
    "Branding",
    "Offline",
  ];
  return (
    <div>
      {services.map((service) => (
        <ul>
          <li>
            <Link href="#" key={service} underline={"none"}>
              <Typography variant="body1" sx={hoverStyle}>
                {service}
              </Typography>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Services;
