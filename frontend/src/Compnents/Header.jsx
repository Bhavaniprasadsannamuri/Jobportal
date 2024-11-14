import { Box, styled } from '@mui/material'
import React from 'react'
import { theme } from '../theme'
import headerImage from "../Images/headerbg.jpeg"
const Header = () => {

  const HeaderStyled = styled(Box)(({ theme })=> ({
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
     
    </HeaderStyled>
  )
}

export default Header
