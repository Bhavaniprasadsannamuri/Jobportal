import { FormControl, MenuItem,InputBase, InputLabel, Box,Select } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
// import {Box} from '@mui/material/Box';


const SelectComponenet = ({handleChangeCategory,category }) => {
  
  const {jobTypesAll} = useSelector(state => state.jobTypes);
          console.log("SelectComponenet",jobTypesAll);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"  value={category}label="Age" onChange={handleChangeCategory}>
              <MenuItem value="">All</MenuItem>
          {jobTypesAll && jobTypesAll.map(jobType =>
           
            <MenuItem key={jobType.id} value={jobType._id}>{jobType.jobTypeName}</MenuItem>
              )}
        </Select>
      </FormControl>
      
   </Box>
  )
}

export default SelectComponenet