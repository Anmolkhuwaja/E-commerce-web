import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"


const useSignUp = () => {
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
   {showPassword, setShowPassword, control, handleSubmit, errors , signUpHandler}
  )
}

export default useSignUp;