import { Box, Button, InputBase } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { useFormik } from "formik";

// import CardActions from '@mui/material';

const validationSchema = yup.object({
  search: yup.string("enter your search query")
             .required("this field cant be empty")
})


const InputSearch = () => {

  const navigate = useNavigate();
  const onSubmit = (value, action) => {
    const { search } = value;
    if (search.trim()) {
      navigate(`/search/${search}`);
    }
    else {
      navigate("/");
    }
    action.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      search:"",
    },
    validationSchema: validationSchema,
    onSubmit
  });
  return (
    <form onSubmit={handleSubmit} style={{width:"50%"}}>
      <Box sx={{width: "100%", display:"flex", justifyContent:"center"}}>
        <InputBase sx={{ bgcolor: 'white', padding: "10px" }}
          label="search"
          id='search'
          name="search"
          fullWidth={true}
          placeholder='ex: developer/react/'
          value =  {values.search}
          onChange={handleChange}
          error={touched.search && Boolean(errors.search)}
        
        
        ></InputBase>
        <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>search</Button>
        
      </Box>
      <Box component='span' sx={{ color: "orange" }}>{ touched.search && errors.search}</Box>
    </form>
  )
}

export default InputSearch