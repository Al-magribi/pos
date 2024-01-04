import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FastfoodIcon />
          </IconButton>

          <Typography variant="h6">Alma Resto</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
