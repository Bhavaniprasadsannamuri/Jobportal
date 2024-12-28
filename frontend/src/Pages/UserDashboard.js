import React, { useState } from 'react'
import NavBar from '../Compnents/Navbar'
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';
import "./userdashboard.css"
import { items } from './NavItems';
import Dropdown from './Dropdown';
const UserDashboard = () => {
  const [showdropdown, setshowdropdown] = useState(false);
  return (
    <>
      {/* <NavBar></NavBar>
      <div>UserDashboard</div> */}
      <nav className='navbar'>

        <Link className='navbar-logo' to={"/"}> jobportal  <WorkIcon></WorkIcon>  </Link>
        <ul className='nav-items'>
          {
            items.map((item, index) => {
              if (item.title === "services") {
                return (

                  <li key={item.id} className={item.cn}
                    onMouseLeave={() => setshowdropdown(!showdropdown)}
                    onMouseEnter={() => setshowdropdown(!showdropdown)}
                    onClick={() => setshowdropdown(!showdropdown)}
                  ><Link to="/user/dashboard" > {item.title}</Link>
                      {showdropdown && <Dropdown></Dropdown>}
                  </li>
              
                )
              }
              return (

                  <li key={item.id} className={item.cn}><Link to={item.path} > {item.title}</Link></li>
              
                )
          })
          }
          
        </ul>
        <button className="btn">Sign up</button>
        
        
        
      </nav>
     
    </>
    
  )
}

export default UserDashboard