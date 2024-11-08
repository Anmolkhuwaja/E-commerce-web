import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import imageOne from "../images/01.jpg";
import imageTwo from "../images/02.jpg";
import imageThree from "../images/03.jpg";
import imageFour from "../images/04.jpg";
import { Alert, Box, IconButton, Snackbar, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const dummyProducts = [
  {
    id: 1,
    img: imageOne,
    name: "Elegance Living 1",
    desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
  },
  {
    id: 2,
    img: imageTwo,
    name: "Elegance Living 2",
    desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
  },
  {
    id: 3,
    img: imageThree,
    name: "Elegance Living 3",
    desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
  },
  {
    id: 4,
    img: imageFour,
    name: "Elegance Living 4",
    desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
  },
];

const Products = () => {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [products] = useState(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);

    if (!isExist) {
      setCartList((prev) => {
        const newCartList = [...prev, product];
        localStorage.setItem("cartList", JSON.stringify(newCartList));
        return newCartList;
      });
      setOpenSuccess(true);
    } else {
      setOpenAlert(true);
    }
  };

  const searchHandler = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
    console.log(filtered, "Filtered Products");
  };

  const closeHandler = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const closeSuccessHandler = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={closeHandler}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Box className="container mt-5">
        <TextField onChange={searchHandler} size="small" placeholder="Search" />
      </Box>

      <Snackbar
        open={openAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={closeHandler}
        message="Item Is Already Added!"
        action={action}
        ContentProps={{
          sx: {
            background: "red",
          },
        }}
      />

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={closeSuccessHandler}
      >
        <Alert onClose={closeSuccessHandler} severity="success" variant="filled" sx={{ width: "100%" }}>
          Item Successfully Added!
        </Alert>
      </Snackbar>

      <Box className="d-flex gap-5 p-5 ps-5 ms-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Card sx={{ maxWidth: 250, cursor: "pointer" }} key={index}>
              <img src={product.img} className="img-fluid" alt={`${product.name}`} />
              <Typography gutterBottom variant="h5" className="pt-3 ps-2" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" className="ps-2" sx={{ color: "text.secondary" }}>
                {product.desc}
              </Typography>
              <Box className="d-flex my-3 justify-content-between px-2 align-content-center">
                <Button size="small" sx={{ backgroundColor: "#ffde21" }} className="py-0 px-3 fw-bold text-black">
                  BUY NOW
                </Button>
                <Button
                  onClick={() => cartHandler(product)}
                  size="small"
                  className="px-3 fw-bold text-white bg-black"
                >
                  Add to cart
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          <Typography variant="h6" className="p-5">
            No products found.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Products;
