import { Typography, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DrawerApp = (props) => {
  const { open, toggleDrawer } = props;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemArr = localStorage.getItem("cartList");
    const parseCartItemsArr = JSON.parse(cartItemArr) || [];
    
    // Group items and count the quantity
    const itemCounts = parseCartItemsArr.reduce((acc, item) => {
      if (acc[item.id]) {
        acc[item.id].quantity += 1;
      } else {
        acc[item.id] = { ...item, quantity: 1 };
      }
      return acc;
    }, {});

    setCartItems(Object.values(itemCounts));
  }, []);

  // Handle quantity increase
  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrease
  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle delete item
  const handleDelete = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 270 }} role="presentation" onClick={toggleDrawer(false)}>
          <Typography variant="h5">Cart Items</Typography>
          {cartItems.map((item) => (
            <Box key={item.id} className="border border-black mt-2 mx-2 p-1">
              <img className="pt-2" width="80px" src={item.img} alt={item.name} />
              <Typography variant="body1">{item.name}</Typography>
              
              <Box display="d-flex" alignItems="center" mt={1}>
                {/* Decrease Button */}
                <IconButton onClick={() => handleDecrease(item.id)}>
                  <RemoveIcon />
                </IconButton>

                {/* Quantity Input Field */}
                <TextField
                  variant="outlined"
                  size="small"
                  value={item.quantity}
                  inputProps={{ readOnly: true, style: { textAlign: "center" } }}
                  sx={{ width: "50px", mx: 1 }}
                />

                {/* Increase Button */}
                <IconButton onClick={() => handleIncrease(item.id)}>
                  <AddIcon />
                </IconButton>

                {/* Delete Button */}
              <IconButton color="black" className='ms-5' onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Drawer>
    </div>
  );
};

export default DrawerApp;
