import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const ProductDetails = () => {

  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = React.useState('');
  const param = useParams();

  console.log(productDetail, 'productDetail');

  useEffect (() =>{
    const fetchProducts = async () =>{
      try {
        setIsLoading(true);
        const products = await axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);
       
        if(products.status === 200){
          setIsLoading(false);
          setProductDetail(products?.data);
        }else{
          setIsLoading(true);
        }

      } catch (err) {
        console.log(err);
        
      }
    }

    fetchProducts();
  },[]);

  // Dropdown function
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  
  return (
    
    <Box className='mt-4'>
 { isLoading ?  <Box className="text-center mt-5 justify-content-center d-flex"><CircularProgress color="inherit" /></Box> : <Grid container spacing={3} className='d-flex text-center align-items-center'>
    <Grid item sx={12} sm={12} md={6} className=''>
      <img src={productDetail?.image} className='img-fluid w-50 mt-5' alt="T-shirt Image" />
    </Grid>
    <Grid item sx={12} sm={12} md={6} className='mt-md-5 px-5'>
      <Typography variant='h5' className='text-md-start fw-bold'>{productDetail?.title}</Typography>
      <Typography variant='h6' className='fw-bold text-md-start mt-4'>${productDetail?.price}</Typography>

      {/* Dropdown for Age */}
      <Box sx={{ minWidth: 150 }} className="text-md-start mt-2">
    <FormControl className='w-25 text-start'>
      <InputLabel id="demo-simple-select-label" size="small">Select Size</InputLabel>
      <Select size='small'
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Small</MenuItem>
        <MenuItem value={20}>Medium</MenuItem>
        <MenuItem value={30}>Large</MenuItem>
      </Select>
        </FormControl>
        <br />
        <Button variant='outlined' className='text-md-start mt-2 text-black fw-bold border-warning bg-warning'>Add to cart</Button>
        </Box>

        <Typography variant='h6' className='fw-bol text-md-start mt-4'>{productDetail?.category}</Typography>
        <Typography variant='body1' className='fw-bol text-md-start mt-3 px-1'>{productDetail?.description}</Typography>
      
    </Grid>
  </Grid>}
    </Box>
  )
}

export default ProductDetails;