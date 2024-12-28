import React, { useEffect } from 'react'
// import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Button from '@material-ui/core/Button';
import { Avatar, Box, Button ,TextField} from '@mui/material';
// import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import LockClockIcon from '@mui/icons-material/LockClock';
import { useDispatch, useSelector } from 'react-redux';
import { userSignin } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.userSignin);
  console.log(isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
    navigate("/user/dashboard");
  }
  },[isAuthenticated])
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values,actions) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(userSignin(values));
      actions.resetForm();
      console.log("triggered function");
    },
  });
  return (
    <>
      <Box sx={{ height:"100vh",display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box onSubmit={formik.handleSubmit} component="form" className='form_style border_style'>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockClockIcon></LockClockIcon>
            </Avatar>
          
        
        <TextField sx={{mb:3}}

          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField sx={{mb:3}}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
          
          </Box>
      </Box></Box></>
  )
}

export default Login