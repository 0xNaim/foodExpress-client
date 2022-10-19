import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "@mui/material";

const SocialMedia = () => {
  return (
    <div style={{}}>
      <Link href="#" sx={{ color: "green", marginRight: "1rem" }}>
        <FacebookIcon />
      </Link>
      <Link href="#" sx={{ color: "green", marginRight: "1rem" }}>
        <TwitterIcon />
      </Link>
      <Link href="#" sx={{ color: "green" }}>
        <InstagramIcon />
      </Link>
    </div>
  );
};

export default SocialMedia;
