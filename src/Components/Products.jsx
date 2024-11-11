import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import imageOne from "../images/01.jpg";
// import imageTwo from "../images/02.jpg";
// import imageThree from "../images/03.jpg";
// import imageFour from "../images/04.jpg";
import { Alert, Box, CircularProgress, Grid, IconButton, Snackbar, TextField, Tooltip } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const dummyProducts = [
//   {
//     id: 1,
//     img: imageOne,
//     name: "Elegance Living 1",
//     desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
//   },
//   {
//     id: 2,
//     img: imageTwo,
//     name: "Elegance Living 2",
//     desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
//   },
//   {
//     id: 3,
//     img: imageThree,
//     name: "Elegance Living 3",
//     desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
//   },
//   {
//     id: 4,
//     img: imageFour,
//     name: "Elegance Living 4",
//     desc: "Discover Elegance Living, where modern furniture meets timeless comfort. Our curated pieces combine style and functionality.",
//   },
// ];

const Products = () => {
  // const [cartList, setCartList] = useState([]);
  // const [openAlert, setOpenAlert] = useState(false);
  // const [openSuccess, setOpenSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(isLoading, "isLoading");
  
  // const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [products]);

  // const cartHandler = (product) => {
  //   const isExist = cartList.find((cart) => cart.id === product.id);

  //   if (!isExist) {
  //     setCartList((prev) => {
  //       const newCartList = [...prev, product];
  //       localStorage.setItem("cartList", JSON.stringify(newCartList));
  //       return newCartList;
  //     });
  //     setOpenSuccess(true);
  //   } else {
  //     setOpenAlert(true);
  //   }
  // };

  // const searchHandler = (e) => {
  //   const searchQuery = e.target.value.toLowerCase();
  //   const filtered = products.filter((product) =>
  //     product.name.toLowerCase().includes(searchQuery)
  //   );
  //   setFilteredProducts(filtered);
  //   console.log(filtered, "Filtered Products");
  // };

  // const closeHandler = (reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenAlert(false);
  // };

  // const closeSuccessHandler = (reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenSuccess(false);
  // };

  // const action = (
  //   <React.Fragment>
  //     <IconButton size="small" aria-label="close" color="inherit" onClick={closeHandler}>
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  useEffect (() =>{
    const fetchProducts = async () =>{
      try {
        setIsLoading(true);
        const products = await axios.get("https://fakestoreapi.com/products");
       
        if(products.status === 200){
          setIsLoading(false);
          setProducts(products?.data);
        }else{
          setIsLoading(true);
        }

      } catch (err) {
        console.log(err);
        
      }
    }

    fetchProducts();
  },[]);

  return (
    <>
      {/* <Box className="container mt-5">
        <TextField onChange={searchHandler} size="small" placeholder="Search" />
      </Box> */}

      {/* <Snackbar
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
      /> */}
      {/* <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={closeSuccessHandler}
      >
        <Alert onClose={closeSuccessHandler} severity="success" variant="filled" sx={{ width: "100%" }}>
          Item Successfully Added!
        </Alert>
      </Snackbar> */}

      {/* <Box className="d-flex gap-5 p-5 ps-5 ms-5">
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
      </Box> */}

     { isLoading ? (
      <Box className="text-center mt-5 justify-content-center d-flex"><CircularProgress color="inherit" /></Box>
     ) : (<Grid container className="d-flex p-5  justify-content-center align-items-center">
        {products?.map((product, index) => {
          return (
            <Grid item sx={12} sm={5} md={3} className="mt-4 container" key={index}>
            <Card className="text-center" sx={{ maxWidth: 260, cursor: "pointer" }} key={index}>
              <img
              style={{maxHeight: "120px", minHeight: "140px"}}
                src={product.image}
                className="img-fluid pt-4"
                alt={"${product.name}"}
              />
              <Tooltip title={product?.title} placement="top">
              <Typography
                gutterBottom
                variant="body1"
                className="pt-3 ps-2"
                component="div"
              >
                {product.title?.length >= 22 ? 
                `${product?.title.slice(0, 26)}...` : product?.title}
              </Typography>
              </Tooltip>
              <Typography
                variant="body2"
                className="ps-2"
                sx={{ color: "text.secondary" }}
              >
                {product.desc}
              </Typography>
              <Box className="d-flex my-3 justify-content-between px-2 align-content-center">
              <Button
                  size="small"
                  className="px-4 fw-bold text-white bg-black"
                >
                 <Tooltip title="favorite" placement="top">
                 <FavoriteBorderIcon />
                 </Tooltip>
                </Button>
                <Tooltip title="Details" placement="top">
                <Button
                  size="small"
                  sx={{ backgroundColor: "#ffde21" }}
                  className="py-0 px-3 fw-bold text-black"
                >
                 <VisibilityIcon onClick={()=>
                   {navigate(`/product-details/${product?.id}`);
                    console.log(product);
                   }} />
                </Button>
                </Tooltip>
                <Button
                  size="small"
                  className="px-4 fw-bold text-white bg-black"
                >
                  <Tooltip title="Add to cart" placement="top">
                  <ShoppingCartIcon />
                  </Tooltip>
                </Button>
              </Box>
            </Card>
            </Grid>
          );
        })}
      </Grid>)}
    </>
  );
};

export default Products;
