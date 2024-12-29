import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form';

const useSignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object({
      email: yup.string().required("Your email is required"),
      password: yup.string().required("Your password is required")
    });
  
    const signInValues = {
        email: "",
        password: "",
    }
  
    const {control, handleSubmit, reset, formState: { errors }} = useForm({
      defaultValues: signInValues,
      resolver: yupResolver(schema)
    });
  
    const signInHandler = (e,dummy) =>{
      console.log(dummy);
      reset();
    };

  return (
    {showPassword, setShowPassword, control, handleSubmit, errors, signInHandler}
  )
}

export default useSignIn;