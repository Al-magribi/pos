import { Box } from "@mui/material";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <Box>
      <ClipLoader color='#36d7b7' />
    </Box>
  );
};

export default Loader;
