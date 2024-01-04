import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Transaction from "../Transaction/Transaction";
import { useState } from "react";
import Foods_Data from "../Foods/Foods";

const Home = () => {
  const [showFoods, setShowFoods] = useState(false);
  const [showTransaction, setShowTransaction] = useState(true);

  const handleFood = () => {
    setShowFoods(true);
    setShowTransaction(false);
  };

  const handleTransaction = () => {
    setShowFoods(false);
    setShowTransaction(true);
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Navbar />

      <Box
        sx={{ height: "80%", p: 3, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            height: 40,
            width: "100%",
            display: "flex",
            justifyContent: "start",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: showFoods ? "1px solid blue" : "none",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={handleFood}
          >
            Food
          </Box>
          <Box
            sx={{
              width: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { cursor: "pointer" },
              borderBottom: showTransaction ? "1px solid blue" : "none",
            }}
            onClick={handleTransaction}
          >
            Transaction
          </Box>
        </Box>
        {showFoods && <Foods_Data />}
        {showTransaction && <Transaction />}
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
