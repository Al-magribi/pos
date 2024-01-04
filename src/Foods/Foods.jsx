import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import app from "../Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addFood, deleteFood, getFoods } from "../Redux/food_action";
import { ADD_FOOD_RESET, DELETE_FOOD_RESET } from "../Redux/food_constant";
import Loader from "../components/Loader";

const Foods_Data = () => {
  // GET FOODS DATA
  const { Foods } = useSelector((state) => state.Foods);

  // ADD FOOD
  const dispatch = useDispatch();

  const [add, setAdd] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      if (file.size > 1024 * 1024) {
        toast.error("Gambar lebih dari 1mb");
        return;
      }

      setImage(file);
    }
  };

  const handleInputChange = (e) => {
    const preview = e.target.files[0];

    if (preview.size > 1024 * 1024) {
      toast.error("Gambar lebih dari 1mb");

      return;
    }

    setImage(preview);
  };

  const addMenu = (e) => {
    e.preventDefault();

    const storage = getStorage(app);
    const imgFile = image;
    const imgFileName = v4() + "." + imgFile.name.split(".").pop();
    const imgStorageRef = ref(storage, `kasir/${imgFileName}`);
    const imgUploadTask = uploadBytesResumable(imgStorageRef, imgFile);

    imgUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        toast.success(`Upload prosess ${progress}%`);
      },
      (error) => {
        toast.error(`Error ${error.message}`);
      },

      async () => {
        const imageData = await getDownloadURL(imgUploadTask.snapshot.ref);

        const data = {
          food: name,
          price: price,
          img: imageData,
        };

        dispatch(addFood(data));
      }
    );
  };

  const deleteHandler = (id) => dispatch(deleteFood(id));

  // CONFIRMATIONS
  const { loading, success, message } = useSelector((state) => state.addFood);
  const {
    loading: updel_loading,
    isDeleted,
    deleted,
  } = useSelector((state) => state.editFood);

  useEffect(() => {
    // ADD
    if (success) {
      toast.success(message);

      setName("");
      setPrice("");
      setImage("");

      setAdd(false);

      dispatch({ type: ADD_FOOD_RESET });
      dispatch(getFoods());
    } else {
      toast.error(message);

      dispatch({ type: ADD_FOOD_RESET });
    }

    // DELETE
    if (isDeleted) {
      toast.success(deleted);

      dispatch(getFoods());

      dispatch({ type: DELETE_FOOD_RESET });
    } else {
      toast.error(deleted);
    }
  }, [dispatch, success, message, isDeleted, deleted]);

  return (
    <Box sx={{ height: "100%" }}>
      <Box>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => setAdd(true)}
        >
          Tambahkan
        </Button>
      </Box>
      <Modal
        open={add}
        onClose={() => setAdd(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={add}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 350, md: 600 },
              height: 600,
              overflow: "auto",
              bgcolor: "#ffff",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant='h6'>Tambahkan Menu</Typography>

            {loading ? (
              <Box>
                <Loader />{" "}
              </Box>
            ) : (
              <form
                onSubmit={addMenu}
                style={{ marginTop: "1rem", padding: "10px" }}
              >
                {/* Name */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Nama Menu</label>
                  <input
                    type='text'
                    name='name'
                    style={{
                      padding: "15px",
                      outline: "1px solid gray",
                      border: "none",
                      marginTop: "10px",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* IMAGE */}

                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current.click()}
                  style={{
                    border: "2px solid #ccc",
                    backgroundColor: "#ccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: "1rem",
                  }}
                >
                  <input
                    type='file'
                    accept='image/*'
                    name='file_image'
                    ref={inputRef}
                    onChange={handleInputChange}
                    aria-required='true'
                    style={{ position: "absolute", top: "-9999px" }}
                  />
                  <CloudUploadOutlinedIcon
                    sx={{ fontSize: 120, color: "whitesmoke" }}
                  />
                  {image ? (
                    <p>{image.name}</p>
                  ) : (
                    <p>Drag & drop an image here or click</p>
                  )}
                </div>

                {/* PRICE */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "1rem",
                    width: "100%",
                  }}
                >
                  <label>Harga</label>

                  <input
                    type='number'
                    name='price'
                    style={{
                      padding: "15px",
                      outline: "1px solid gray",
                      border: "none",
                      marginTop: "10px",
                    }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
                  <Button variant='contained' color='success' type='submit'>
                    Simpan
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Fade>
      </Modal>

      <Box sx={{ height: 540, overflow: "auto", mt: 2 }}>
        <table className='minimalistBlack'>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            {Foods?.map((item) => (
              <tr key={item._id}>
                <td style={{ width: 350, height: 100 }}>
                  <img
                    src={item.img}
                    alt={item.food}
                    style={{
                      width: "40%",
                      height: "90%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{item.food}</td>
                <td>{`Rp ${parseFloat(item.price).toLocaleString(
                  "id-ID"
                )}`}</td>
                <td style={{ width: "250px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <IconButton
                      color='error'
                      onClick={() => deleteHandler(item._id)}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <ToastContainer autoClose={1000} />
    </Box>
  );
};

export default Foods_Data;
