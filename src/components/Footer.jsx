import { Box } from "@mui/material";

const Footer = () => {
  const year = new Date();
  return (
    <Box
      sx={{
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "gray",
      }}
    >
      &copy; {year.getFullYear()} Almagribi
    </Box>
  );
};

export default Footer;
