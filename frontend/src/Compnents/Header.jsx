import { Box, styled } from '@mui/material'
import React from 'react'
import { theme } from '../theme'
import headerImage from "../Images/headerbg.jpeg"
import InputSearch from './InputSearch'
const Header = () => {

  const HeaderStyled = styled(Box)(({ theme }) => ({
    display: 'flex',                    // Use flexbox layout
    justifyContent: 'center',           // Horizontally center the child element
    // alignItems: 'center', 
  backgroundColor: theme.palette.secondary.main, // Access the primary color from the theme
    padding: '16px', // Add padding for better appearance
    color: 'white',
    background: `url(${headerImage})`,
    minHeight: 400,
    backgroundPosition: "center",
    backgroundSize: "cover",
    justifyContent:"center"
  }// Set text color
  ));
  return (
    
    <HeaderStyled>
      <Box sx={{margin:'auto',width:"100%",display:"flex",justifyContent:"center"}}>      <InputSearch  ></InputSearch>
</Box>
    </HeaderStyled>
  )
}

export default Header
