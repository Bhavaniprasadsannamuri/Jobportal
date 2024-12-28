import { Box } from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBox = () => {
  return (
    <>
      
      <Box sx={{ minHeight: "500PX", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress></CircularProgress>
      </Box>
    </>
  )
}

export default LoadingBox