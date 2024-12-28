import React, { useEffect, useState } from 'react'
import NavBar from '../Compnents/Navbar'
import Header from '../Compnents/Header'
import { Box, Card, Container, ListItem, ListItemIcon, MenuItem, MenuList, Pagination, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { jobLoad } from '../redux/actions/jobaction'
import { jobTypeAction } from '../redux/actions/JobTypeAction';
import {useParams } from "react-router-dom";
import axios from 'axios';
import store from '../redux/store';
import JobComponenet from '../Compnents/JobComponenet';
import LoadingBox from '../Compnents/LoadingBox';
import SelectComponenet from '../Compnents/SelectComponenet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
// import axios from 
const Home = () => {
  const {jobs,loading, pages,locations } = useSelector(state => state.loadJobs);
  console.log( "locations" ,locations);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const [page, setpage] = useState(1);
  const [cat, setcat] = React.useState("");

  const handleChangeCategory = (e) => {
    setcat(e.target.value);

    console.log("category changed", e.target.value);
    setpage(1);
    
    
  }
   const handleLocationClick = (newLocation) => {
    setpage(1);  // Reset the page number to 1 when a new location is selected
  }
  useEffect(() => {
    console.log( "cat" ,cat);
    dispatch(jobLoad(page, keyword, cat, location));
    console.log( "location changed" ,locations);
    
  }, [page, keyword, cat, location]);
  useEffect(() => {
    dispatch(jobTypeAction());
    
  },[cat]);
  return (
    <div>
      <Box sx={{bgcolor: "#fafafa",minHeight:"100vh",display:"column"}}>
      <NavBar></NavBar>
        <Header sx={{margin:"auto"}}></Header>
        <Container>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Box sx={{ flex: 2, p: 2  }}>
                <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                  
                  <Box sx={{ pb: 2 }}>
                  <Typography component="h4" sx={{ color: "palette.secondary.main", fontWeight: 600 }}>filter by category</Typography>
                  <SelectComponenet  handleChangeCategory={handleChangeCategory} category={cat}></SelectComponenet>
                  

                </Box>
                <Box sx={{ pb: 2 }}>
                  <Typography component="h4" sx={{ color: "palette.secondary.main", fontWeight: 600 }}>filter by location</Typography>
                  
                  <MenuList>
                    {
                      locations && locations.map((selectlocation, i) =>  
                        <MenuItem key={i} onClick={() => handleLocationClick(selectlocation)}>
                        
                            <ListItemIcon>
                              <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 16 }}></LocationOnIcon>
                            </ListItemIcon>           
                            <Link to={`/search/location/${selectlocation}`} >{selectlocation}</Link>
                        </MenuItem>
                      )
                    }
                  </MenuList>

                  </Box>
                </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>

              {loading ? <LoadingBox></LoadingBox> :     
              jobs && jobs.map((job, index) => 
                 <JobComponenet title={job.jobTitle}
                  id={job._id} jobtitle={job.jobTitle} location={job.location}
                  salary={job.salary} jobType={job.jobType} description={job.description}></JobComponenet>
              )
            }
              <Stack spacing={2}>
                
                <Pagination page={page}  count={pages === 0 ? 1 : pages}  onChange={(event, value)=>setpage(value)}></Pagination>
              </Stack>

            </Box>
          </Stack>
        </Container>
        </Box>
    </div>
  )
}

export default Home