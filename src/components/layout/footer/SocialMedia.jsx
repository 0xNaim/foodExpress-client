import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "@mui/material";

const SocialMedia = () => {
  return (
    <div style={{}}>
      <Link href="#" sx={{ color: "green" }}>
        <FacebookIcon />
      </Link>
      <Link href="#" sx={{ color: "green" }}>
        <TwitterIcon />
      </Link>
      <Link href="#" sx={{ color: "green" }}>
        <InstagramIcon />
      </Link>
    </div>
  );
};

export default SocialMedia;
