import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  IconButton,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getFoods } from "../Redux/food_action";

const Transaction = () => {
  // GET FOODS DATA
  const dispatch = useDispatch();

  const { Foods } = useSelector((state) => state.Foods);

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  // SEARCH FUNCTION
  const [term, setTerm] = useState("");

  const search = (e) => {
    setTerm(e.target.value);
  };

  const filter = (food_name) => {
    return food_name.food.toLowerCase().includes(term.toLowerCase());
  };

  const filtered = Foods?.filter(filter);

  // ORDER FUNCTION
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.food === item.food);

    if (itemInCart) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.food === item.food
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.food === item.food) {
        if (cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
          return null;
        }
      } else {
        return cartItem;
      }
    });

    const filteredCart = updatedCart.filter((cartItem) => cartItem !== null);
    setCart(filteredCart);

    if (selectedItem && selectedItem.food === item.food) {
      setSelectedItem(null);
    }
  };

  const clearBill = () => {
    setCart([]);
  };

  //   Save Function
  const saveHandler = () => {
    if (cart.length === 0) {
      toast.error("Transaksi tidak dapat disimpan");
    } else {
      const savedBills = JSON.parse(localStorage.getItem("Bill")) || [];

      const updatedBills = [...savedBills, ...cart];

      localStorage.setItem("Bill", JSON.stringify(updatedBills));

      // Mengosongkan cart
      setCart([]);
      toast.success("Bill Berhasil disimpan di local storage");
    }
  };

  //   Print Function
  const printBill = () => {
    if (cart.length === 0) {
      toast.error("tidak ada pesanan");
    } else {
      const billContent = cart
        .map((cartItem) => {
          return `${cartItem.food} (${cartItem.quantity}) - Rp ${
            cartItem.price * cartItem.quantity
          }`;
        })
        .join("\n");

      const printWindow = window.open("", "", "width=600,height=600");

      printWindow.document.open();
      printWindow.document.write(`<pre>${billContent}</pre>`);
      printWindow.document.close();

      printWindow.print();
    }

    setCart([]);
  };

  // CHARGE FUNCTION
  const [show, setShow] = useState(false);

  const [recieve, setRecieve] = useState(0);
  const [change, setChange] = useState(0);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });
    return total;
  };

  const calculateChange = () => {
    const calculatedChange = recieve - calculateTotal();

    setChange(calculatedChange);

    return calculatedChange;
  };

  useEffect(() => {
    calculateChange();
  }, [recieve, cart]);

  const charge_process = () => {
    if (cart.length === 0) {
      toast.error("Tidak ada pesanan");
    } else {
      setShow(true);
    }
  };

  const process = () => {
    if (recieve === 0) {
      toast.error("Pembayaran tidak dapat dilakukan");
    } else {
      const data = {
        item: cart,
        total: calculateTotal(),
      };

      localStorage.setItem("transactions", JSON.stringify(data));

      toast.success("Pembayaran berhasil disimpan di local storage");

      setShow(false);

      setRecieve(0);
      setCart([]);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", p: 1 }}>
      {/* Foods */}
      <Box
        sx={{
          flex: 2,
          m: 1,
          height: 530,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Input
          type='text'
          value={term}
          onChange={search}
          placeholder='Cari makanan'
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "auto",
            height: "92%",
            mt: 2,
          }}
        >
          {filtered?.map((item) => (
            <Card
              key={item._id}
              sx={{ width: 160, m: 1, height: 220 }}
              onClick={() => addToCart(item)}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height={130}
                  image={item.img}
                  alt={item.food}
                />
                <CardContent>
                  <Typography variant='body2'>{item.food}</Typography>
                  <Typography sx={{ mt: 1 }} variant='body2'>{`Rp ${parseFloat(
                    item.price
                  ).toLocaleString("id-ID")}`}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Order */}
      <Box sx={{ flex: 1, m: 1, p: 1, borderRadius: 2, boxShadow: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountCircleIcon color='primary' sx={{ fontSize: 50 }} />
          <Typography variant='h6'>PESANAN</Typography>
        </Box>

        <Box sx={{ mt: 2, height: 300, overflow: "auto" }}>
          {cart?.map((item) => (
            <Box
              key={item.food}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ height: 80, width: 80, p: 1 }}>
                <img
                  src={item.img}
                  alt={item.food}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {item.food}
              </Box>
              <Box
                sx={{
                  width: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                x {item.quantity}
              </Box>
              <Box
                sx={{
                  width: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {`Rp ${parseFloat(item.quantity * item.price).toLocaleString(
                  "id-ID"
                )}`}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton color='error' onClick={() => removeFromCart(item)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant='outlined'
            color='error'
            onClick={clearBill}
          >
            Clear Bill
          </Button>
        </Box>

        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-evenly" }}>
          <Button
            fullWidth
            variant='contained'
            color='success'
            sx={{ m: 1 }}
            onClick={() => saveHandler()}
          >
            Save Bill
          </Button>
          <Button
            fullWidth
            variant='contained'
            color='success'
            sx={{ m: 1 }}
            onClick={printBill}
          >
            Print Bill
          </Button>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={charge_process}
          >
            charge{" "}
            {`Rp ${parseFloat(calculateTotal()).toLocaleString("id-ID")}`}
          </Button>
        </Box>
      </Box>
      <ToastContainer autoClose={1000} />

      <Modal
        open={show}
        onClose={() => setShow(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: { timeout: 500 },
        }}
      >
        <Fade in={show}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 800 },
              overflow: "auto",
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              height: 420,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* detail */}
            <Box sx={{ flex: 2, height: 400, overflow: "auto", m: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant='h6'>Detail Pesanan</Typography>
              </Box>
              {cart?.map((item) => (
                <Box
                  key={item.food}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ height: 80, width: 80, p: 1 }}>
                    <img
                      src={item.img}
                      alt={item.food}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {item.food}
                  </Box>
                  <Box
                    sx={{
                      width: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    x {item.quantity}
                  </Box>
                  <Box
                    sx={{
                      width: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {`Rp ${parseFloat(
                      item.quantity * item.price
                    ).toLocaleString("id-ID")}`}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* payment */}
            <Box
              sx={{
                flex: 1,
                height: 400,
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                boxShadow: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant='h6' sx={{ mt: 2 }}>
                Pembayaran
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  height: 200,
                  p: 2,
                }}
              >
                <Typography sx={{ color: "green", fontWeight: "bold" }}>
                  Total:
                  {`Rp ${parseFloat(calculateTotal()).toLocaleString("id-ID")}`}
                </Typography>

                <Input
                  type='number'
                  name='total_price'
                  placeholder='Diterima'
                  value={recieve}
                  onChange={(e) => setRecieve(e.target.value)}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => setShow(false)}
                  >
                    Close
                  </Button>
                  <Button variant='contained' color='success' onClick={process}>
                    Pay
                  </Button>
                </Box>

                <Typography
                  sx={{ color: "red", fontWeight: "bold" }}
                >{`Rp ${parseFloat(change >= 0 ? change : 0).toLocaleString(
                  "id-ID"
                )}`}</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Transaction;
