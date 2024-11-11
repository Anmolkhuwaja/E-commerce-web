import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SignUpImg from "../assets/signup.jpg";
import Visibility from "@mui/icons-material/Visibility";
// import OutlinedInput from '@mui/material/OutlinedInput';
import { yupResolver } from "@hookform/resolvers/yup"
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    name: yup.string().min(5).max(10).required("Your name is required"),
    email: yup.string().required("Your email is required"),
    password: yup.string().required("Your password is required").min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  });

  const signUpValues = {
      name: "",
      email: "",
      password: "",
  }

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: signUpValues,
    resolver: yupResolver(schema)
  });  

  const signUpHandler = (dummy) =>{
    console.log(dummy);
    reset();
  };

  return (
    <>
      <Grid container className="text-center align-items-center">
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          className=""
        >
          <img className="img-fluid w-75 mt-lg-5" src={SignUpImg} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          className=""
        >
          <Box>
            <Typography variant="h4">Sign Up</Typography>
            <Typography variant="h6">Create your account!</Typography>

            <form
              onSubmit={handleSubmit(signUpHandler)}
            >
              <Grid container>
                {/* Container mn spacing={2} hum space deny kay liye dety hen.*/}
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField
                    size="small"
                    {...field}
                    className="mt-2 w-50"
                    placeholder="Name"
                  />}
                  />

                  <Typography variant="body2" className="text-danger">{errors?.name?.message}</Typography>
                </Grid>
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
                Sign Up
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;
