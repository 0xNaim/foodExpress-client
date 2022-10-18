import { Link, Typography } from "@mui/material";
import React from "react";

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
        <Link key={service} sx={{ cursor: "pointer" }}>
          <ul>
            <li>
              <Typography
                variant="body1"
                sx={{ color: "white", lineHeight: "2.3" }}
              >
                {service}
              </Typography>
            </li>
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default Services;
