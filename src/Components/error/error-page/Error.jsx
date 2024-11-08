import React from 'react'
import ErrorImg from "../../auth/assets/error.webp"
import { Grid } from '@mui/material';

const Error = () => {
  return (
    <>
    <Grid sx={12} className='text-center'>
        <img className='w-50 text-center align-items-center img-fluid' src={ErrorImg} alt="Error" />
    </Grid>
    </>
  )
}

export default Error;