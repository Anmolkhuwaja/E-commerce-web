import { Typography, IconButton, TextField, ButtonGroup, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import { useState, useEffect } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import cart from "./auth/assets/cart.jpg"
import { decreaseQuantity, increaseQuantity, removeProduct } from "../Slices/product/ProductSlice";

const DrawerApp = (props) => {
  const { open, toggleDrawer } = props;

  const { items } = useSelector((state) => state.products);

  const dispatch = useDispatch()

  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  // const cartItemArr = localStorage.getItem("cartList");
  // const parseCartItemsArr = JSON.parse(cartItemArr) || [];

  // Group items and count the quantity
  //   const itemCounts = parseCartItemsArr.reduce((acc, item) => {
  //     if (acc[item.id]) {
  //       acc[item.id].quantity += 1;
  //     } else {
  //       acc[item.id] = { ...item, quantity: 1 };
  //     }
  //     return acc;
  //   }, {});

  //   setCartItems(Object.values(itemCounts));
  // }, []);

  // Handle quantity increase
  // const handleIncrease = (id) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // Handle quantity decrease
  // const handleDecrease = (id) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // Handle delete item
  // const handleDelete = (id) => {
  //   const updatedItems = cartItems.filter((item) => item.id !== id);
  //   setCartItems(updatedItems);
  // };

  const totalPrice = items?.length && items?.reduce((sum, product) => sum + product?.price * product?.quantity, 0)  

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 400 }}
          role="presentation"
        >
          <Typography variant="h4" className="ps-2 mt-3">Shopping cart</Typography>
          {items.length === 0 ? 
          <Box height={'80vh'} className="text-center justify-content-center d-flex align-items-center flex-column">
              <img src={cart} alt="cart" className="w-25" />
              <Typography className="fs-3">YOUR CART IS EMPTY.</Typography>
              <Typography variant="body1" className="px-2">Before proceed to checkout you must add some products to your shopping cart. You will find a lot of interesting products on our "Shop" page.</Typography> <br/>
              <Button className="bg-black text-white fw-medium px-3 rounded-pill" onClick={toggleDrawer(false)}>RETURN TO SHOP</Button>
          </Box> : items.map((item) => (
            <Box
              key={item.id}
              className="border d-flex align-items-center justify-content-center border-black mt-2 mx-2 p-1"
            >
              <img
                className="pt-2"
                width="50px"
                src={item?.image}
                alt={item.image}
              />

              <Box>
                <Typography variant="body1" className="ms-2">
                  {item.title?.length >= 22
                    ? `${item?.title.slice(0, 15)}...`
                    : item?.title}
                </Typography>
                <Typography className="ms-2">{item.price}</Typography>
              </Box>

              <Box className="d-flex align-items-center" alignItems="center" mt={1}>
                <ButtonGroup
                  variant="contained"
                  className="ms-4"
                  aria-label="Basic button group"
                  size="small"
                 sx={{ backgroundColor: "#ffde21" }}
                >
                  <Button className="bg-warnin text-black"
                 sx={{ backgroundColor: "#ffde21" }}
                  size="small"><RemoveIcon onClick={()=> dispatch(decreaseQuantity(item))} /></Button>
 
                  <Button className="bg-warnin text-black"
                 sx={{ backgroundColor: "#ffde21" }}
                  size="small">{item?.quantity}</Button>

                  <Button className="bg-warnin text-black"
                 sx={{ backgroundColor: "#ffde21" }}
                  size="small"><AddIcon onClick={()=> dispatch(increaseQuantity(item))} /></Button>
                </ButtonGroup>

                {/* Delete Button */}
                <IconButton color="" className="ms-2 text-black"  onClick={()=> dispatch(removeProduct(item))}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Box className="d-flex justify-content-between align-items-center px-3 mt-3">
          <Typography className="fs-5 fw-bold">Subtotal:</Typography>
          <Typography className="fs-5 fw-bold">$ {totalPrice}</Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerApp;
