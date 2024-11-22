import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { addToCart } from "../Slices/addCart/addCartSlice";
import { addProduct, addProducts } from "../Slices/product/ProductSlice";
import { ToastContainer, toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({});

const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const products = await axios.get("https://fakestoreapi.com/products");

        if (products.status === 200) {
          setIsLoading(false);
          setProducts(products?.data);
          setAllProducts(products?.data);

          const filterCategories = products?.data?.map((product) => {
            return {
              label: product?.category?.charAt(0).toUpperCase() + product.category.slice(1),
              value: product?.category,
            };
          });

          const uniqueCategories = filterCategories.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.value === item.value)
          );

          setCategoryOptions(uniqueCategories);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {});

  useEffect(() =>{
    let filterProducts = allProducts?.filter((product)=> product?.category === categoryFilter?.value);

    setProducts(filterProducts);
    console.log(filterProducts, 'filterProducts');
    
  }, [categoryFilter]);

  return (
    <>

<ToastContainer />

      <Box className="container mt-5 d-flex justify-content-between">
        <TextField onChange={''} size="small" placeholder="Search" />
        <Autocomplete
          disablePortal
          size="small"
          options={categoryOptions}
          onChange={(e, newValue)=>{setCategoryFilter(newValue);
          }}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </Box>

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

      {isLoading ? (
        <Box className="text-center mt-5 justify-content-center d-flex">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid
          container
          className="d-flex p-5  justify-content-center align-items-center"
        >
          {products?.map((product, index) => {
            
            return (
              <Grid
                item
                sx={12}
                sm={5}
                md={3}
                className="mt-4 container"
                key={index}
              >
                <Card
                  className="text-center"
                  sx={{ maxWidth: 260, cursor: "pointer" }}
                  key={index}
                >
                  <img
                    style={{ maxHeight: "120px", minHeight: "140px" }}
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
                      {product.title?.length >= 22
                        ? `${product?.title.slice(0, 26)}...`
                        : product?.title}
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
                        <VisibilityIcon
                          onClick={() => {
                            navigate(`/product-details/${product?.id}`);
                            console.log(product);
                          }}
                        />
                      </Button>
                    </Tooltip>
                    <Button
                      size="small"
                      className="px-4 fw-bold text-white bg-black"
                    >
                      <Tooltip title="Add to cart" placement="top">
                        <ShoppingCartIcon onClick={()=>dispatch(addProduct({product, toast}))} />
                      </Tooltip>
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Products;
