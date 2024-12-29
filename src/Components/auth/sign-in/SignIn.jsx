import React, { useState } from 'react'
import SignInImg from "../assets/signin.jpg";
import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

import useSignIn from './useSignIn';

const SignIn = () => {
 
  const {showPassword, setShowPassword, control, handleSubmit, errors, signInHandler} = useSignIn();

  return (
    <div>
        <Grid container className='text-center align-items-center'>
          <Grid item xs={12} md={6} className='text-center'>
            <img className="img-fluid w-75 ms-lg-5 mt-lg-5" src={SignInImg} alt="" />
          </Grid>


          <Grid item xs={12} md={6} className='text-center'>

          <Box>
            <Typography variant="h4">Log In</Typography>
            <Typography variant="h6">Welcome back</Typography>
            <form onSubmit={handleSubmit(signInHandler)}>
            <Grid container>
                {/* Container mn spacing={2} hum space deny kay liye dety hen.*/}
                <Grid item xs={12}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField
                    size="small"
                    {...field}
                    className="mt-2 w-50"
                    placeholder="Email"
                  />}
                  />

                <Typography variant="body2" className="text-danger">{errors?.email?.message}</Typography>
                </Grid>
                <Grid item xs={12}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) =>  <OutlinedInput
                    className="w-50 mt-2"
                    id="outlined-adornment-weight"
                    placeholder="Password"
                    size="small"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          edge="end"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />}
                  />
                   <Typography variant="body2" className="text-danger">{errors?.password?.message}</Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained" type="submit"
                className="mt-2 text-black fw-bold bg-warning w-50">
                Sign In
              </Button>
            </form>
            </Box>
          </Grid>
        </Grid>
    </div>
  )
}

export default SignIn